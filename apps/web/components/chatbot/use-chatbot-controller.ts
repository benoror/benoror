"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type { ChatMessage, ChatRequestBody } from "@/lib/chatbot/types"

const createMessageId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`

export function useChatbotController(examplePrompts: string[]) {
  const [isOpen, setIsOpen] = useState(true)
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef<ChatMessage[]>([])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    if (examplePrompts.length === 0) return

    const interval = setInterval(() => {
      setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % examplePrompts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [examplePrompts])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const currentPrompt =
    examplePrompts[currentPromptIndex % Math.max(examplePrompts.length, 1)] ?? ""

  const submitMessage = async (rawInput: string) => {
    const trimmedInput = rawInput.trim()
    if (!trimmedInput || isLoading) return

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedInput,
    }
    const assistantMessageId = createMessageId()

    const nextConversation = [...messagesRef.current, userMessage]
    const requestBody: ChatRequestBody = {
      messages: nextConversation.map((message) => ({
        role: message.role,
        content: message.content,
      })),
    }

    setMessages((prev) => [...prev, userMessage, { id: assistantMessageId, role: "assistant", content: "" }])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
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
          prev.map((message) =>
            message.id === assistantMessageId
              ? { ...message, content: assistantContent }
              : message,
          ),
        )
      }

      assistantContent += decoder.decode()
      if (!assistantContent.trim()) {
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  content:
                    "I could not generate a response. Please try again with a different question.",
                }
              : message,
          ),
        )
      }
    } catch (error) {
      console.error("Failed to send message:", error)
      setMessages((prev) =>
        prev.map((message) =>
          message.id === assistantMessageId
            ? {
                ...message,
                content: "Oops! Something went wrong. Please try again.",
              }
            : message,
        ),
      )
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    await submitMessage(input)
  }

  const actions = useMemo(
    () => ({
      toggleChat: () => setIsOpen((value) => !value),
      setInput,
      setInputFromPrompt: (prompt: string) => setInput(prompt),
      onSubmit,
    }),
    [input],
  )

  return {
    isOpen,
    currentPrompt,
    messages,
    input,
    isLoading,
    messagesEndRef,
    actions,
  }
}
