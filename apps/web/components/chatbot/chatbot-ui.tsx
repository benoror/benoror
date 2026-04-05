"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChatMessageList } from "@/components/chatbot/chat-message-list"
import { PromptCarousel } from "@/components/chatbot/prompt-carousel"
import { useChatbotController } from "@/components/chatbot/use-chatbot-controller"

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

export function ChatbotUI() {
  const { isOpen, currentPrompt, messages, input, isLoading, messagesEndRef, actions } =
    useChatbotController(examplePrompts)

  return (
    <>
      {/* Floating Chat Bubble */}
      {!isOpen && (
        <motion.div
          className="fixed bottom-4 right-4 bg-sky-600 text-white p-4 rounded-full shadow-lg cursor-pointer z-[100]"
            onClick={actions.toggleChat}
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
              <button
                onClick={actions.toggleChat}
                className="text-white hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-minus">
                  <path d="M5 12h14"></path>
                </svg>
              </button>
            </div>

            {/* Chat Messages Area */}
            <ChatMessageList
              messages={messages}
              isLoading={isLoading}
              messagesEndRef={messagesEndRef}
            />

            {/* Prompt Input */}
            <div className="p-4 border-t border-gray-200">
              <PromptCarousel
                prompt={currentPrompt}
                onClick={actions.setInputFromPrompt}
              />
              <form onSubmit={actions.onSubmit} className="flex">
                <input
                  type="text"
                  placeholder="Ask a question about Ben..."
                  className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-sky-500"
                  value={input}
                  onChange={(e) => actions.setInput(e.target.value)}
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

export default ChatbotUI
