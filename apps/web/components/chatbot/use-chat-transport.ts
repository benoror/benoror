"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

const CHAT_HISTORY_STORAGE_KEY = "chatbot:messages:v1"

function isChatMessage(value: unknown): value is ChatMessage {
  if (!value || typeof value !== "object") return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === "string" &&
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string"
  )
}

export function useChatTransport() {
  const [messages, setMessagesState] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesRef = useRef<ChatMessage[]>(messages)

  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const raw = window.localStorage.getItem(CHAT_HISTORY_STORAGE_KEY)
      if (!raw) return
      const parsed: unknown = JSON.parse(raw)
      if (!Array.isArray(parsed)) return
      const restored = parsed.filter(isChatMessage)
      if (restored.length === 0) return
      setMessagesState(restored)
      messagesRef.current = restored
    } catch {
      // Ignore corrupted storage and continue with empty history.
    }
  }, [])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      window.localStorage.setItem(CHAT_HISTORY_STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // Ignore storage quota / private mode errors.
    }
  }, [messages])

  const setMessages = useCallback(
    (updater: ChatMessage[] | ((prev: ChatMessage[]) => ChatMessage[])) => {
      setMessagesState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater
        messagesRef.current = next
        return next
      })
    },
    [],
  )

  const submitPromptText = useCallback(async (textInput: string) => {
    const text = textInput.trim()
    if (!text) return false

    const userMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      role: "user",
      content: text,
    }
    const assistantMessageId = `${Date.now()}-${Math.random().toString(16).slice(2)}`
    const baseMessages = messagesRef.current
    const requestMessages = [...baseMessages, userMessage]

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantMessageId, role: "assistant", content: "" },
    ])
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: requestMessages.map((item) => ({
            role: item.role,
            content: item.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      if (!response.body) {
        throw new Error("No response body from chat API")
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let assistantContent = ""
      let sseMode: boolean | null = null
      let sseBuffer = ""

      const flushSSEBuffer = (flushAll: boolean) => {
        const separator = /\r?\n\r?\n/
        const events = sseBuffer.split(separator)
        if (!flushAll) {
          sseBuffer = events.pop() ?? ""
        } else {
          sseBuffer = ""
        }

        for (const eventChunk of events) {
          const event = eventChunk.trim()
          if (!event) continue

          for (const line of event.split(/\r?\n/)) {
            const trimmedLine = line.trim()
            if (!trimmedLine.startsWith("data:")) continue

            const payload = trimmedLine.slice("data:".length).trim()
            if (!payload || payload === "[DONE]") continue

            try {
              const parsed = JSON.parse(payload) as {
                choices?: Array<{ delta?: { content?: string } }>
              }
              const contentDelta = parsed.choices?.[0]?.delta?.content
              if (contentDelta) {
                assistantContent += contentDelta
              }
            } catch {
              // Ignore malformed SSE lines and keep processing.
            }
          }
        }
      }

      const syncAssistantMessage = () => {
        setMessages((prev) =>
          prev.map((item) =>
            item.id === assistantMessageId
              ? { ...item, content: assistantContent }
              : item,
          ),
        )
      }

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })

        if (sseMode === null) {
          sseMode = chunk.trimStart().startsWith("data:")
        }

        if (sseMode) {
          sseBuffer += chunk
          flushSSEBuffer(false)
        } else {
          assistantContent += chunk
        }

        syncAssistantMessage()
      }

      const tail = decoder.decode()
      if (sseMode) {
        sseBuffer += tail
        flushSSEBuffer(true)
      } else {
        assistantContent += tail
      }

      syncAssistantMessage()
      if (!assistantContent.trim()) {
        setMessages((prev) =>
          prev.map((item) =>
            item.id === assistantMessageId
              ? {
                  ...item,
                  content:
                    "I could not generate a response. Please try again with a different question.",
                }
              : item,
          ),
        )
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      setMessages((prev) =>
        prev.map((item) =>
          item.id === assistantMessageId
            ? {
                ...item,
                content: "Oops! Something went wrong. Please try again.",
              }
            : item,
        ),
      )
    } finally {
      setIsLoading(false)
    }

    return true
  }, [setMessages])

  return {
    messages,
    isLoading,
    submitPromptText,
  }
}
