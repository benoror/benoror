"use client"

import { useCallback, useEffect, useRef, useState } from "react"

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

export function useChatTransport() {
  const [messages, setMessagesState] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesRef = useRef<ChatMessage[]>(messages)

  useEffect(() => {
    messagesRef.current = messages
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

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        assistantContent += decoder.decode(value, { stream: true })

        setMessages((prev) =>
          prev.map((item) =>
            item.id === assistantMessageId
              ? { ...item, content: assistantContent }
              : item,
          ),
        )
      }

      assistantContent += decoder.decode()
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
