"use client"

import type { RefObject } from "react"
import type { ChatMessage } from "@/lib/chatbot/types"

interface ChatMessageListProps {
  messages: ChatMessage[]
  isLoading: boolean
  messagesEndRef: RefObject<HTMLDivElement | null>
}

export function ChatMessageList({
  messages,
  isLoading,
  messagesEndRef,
}: ChatMessageListProps) {
  return (
    <div className="flex-1 p-4 overflow-y-auto border-b border-gray-200 flex flex-col space-y-4">
      {messages.length === 0 && (
        <p className="text-gray-600 text-center italic text-sm">
          Start by asking a question about Ben!
        </p>
      )}

      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[70%] rounded-lg p-2 text-sm ${
              msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {isLoading && messages.at(-1)?.role === "assistant" && !messages.at(-1)?.content && (
        <div className="flex justify-start">
          <div className="max-w-[70%] rounded-lg p-2 text-sm bg-gray-200 text-gray-800 animate-pulse">
            Typing...
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
