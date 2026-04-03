"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Placeholder prompts for the carousel
const examplePrompts = [
  "Summarize Ben's trajectory",
  "What's Ben's profile?",
  "What are Ben's skills & interests?",
  "Tell me about Ben's AI projects",
  "What companies has Ben worked for?",
  "What is Ben's education?",
  "Does Ben have a blog?",
  "What technologies does Ben use?",
  "Where can I find Ben's open-source projects?",
  "What's Ben's view on agentic workflows?",
]

// Define message types for chat history
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotUI() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false) // To indicate AI is typing
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Carousel effect for example prompts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % examplePrompts.length)
    }, 5000) // Change prompt every 5 seconds
    return () => clearInterval(interval)
  }, [])

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const toggleChat = () => setIsOpen(!isOpen)

  const handlePromptClick = (prompt: string) => {
    setInput(prompt)
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    if (!input.trim()) return

    const userMessage: ChatMessage = { role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // If the API is streaming, we would process the stream here.
      // For now, it returns a JSON with a debug_prompt.
      const data = await response.json();
      const assistantMessage: ChatMessage = { 
        role: 'assistant', 
        content: data.message || "I'm still being integrated with the LLM. Your prompt was: " + data.debug_prompt 
      }
      setMessages((prev) => [...prev, assistantMessage])

    } catch (error) {
      console.error("Failed to send message:", error)
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Oops! Something went wrong. Please try again.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* Floating Chat Bubble */}
      {!isOpen && (
        <motion.div
          className="fixed bottom-4 right-4 bg-sky-600 text-white p-4 rounded-full shadow-lg cursor-pointer z-[100]"
          onClick={toggleChat}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </motion.div>
      )}

      {/* Expanded Chat UI */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-4 right-4 w-80 md:w-96 h-[70vh] bg-white rounded-lg shadow-xl flex flex-col z-[100] border border-gray-200"
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat Header */}
            <div className="flex justify-between items-center p-4 bg-sky-700 text-white rounded-t-lg">
              <h3 className="font-semibold">Ask Ben AI</h3>
              <button onClick={toggleChat} className="text-white hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus">
                  <path d="M5 12h14"></path>
                </svg>
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto border-b border-gray-200 flex flex-col space-y-4">
              {messages.length === 0 && (
                <p className="text-gray-600 text-center italic text-sm">
                  Start by asking a question about Ben!
                </p>
              )}
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
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
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-lg p-2 text-sm bg-gray-200 text-gray-800 animate-pulse">
                    Typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} /> {/* Scroll anchor */}
            </div>

            {/* Prompt Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-2 h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPromptIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="absolute"
                    onClick={() => handlePromptClick(examplePrompts[currentPromptIndex])}
                    style={{ cursor: 'pointer' }}
                  >
                    Try: "{examplePrompts[currentPromptIndex]}"
                  </motion.div>
                </AnimatePresence>
              </div>
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="text"
                  placeholder="Ask a question about Ben..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="bg-sky-600 text-white p-2 rounded-r-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  disabled={isLoading}
                >
                  Send
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
