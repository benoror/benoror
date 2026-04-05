"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useEffect, useState } from "react"
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message"
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input"
import { Button } from "@workspace/ui/components/button"
import { useAppTheme } from "@/hooks/use-app-theme"
import { getClasses } from "@/components/chatbot/chatbot-ui.theme"

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
}

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
  const { themeKind } = useAppTheme()
  const classes = getClasses(themeKind)
  const [input, setInput] = useState("")
  const [isConversationOpen, setIsConversationOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [typedCharCount, setTypedCharCount] = useState(0)

  const currentPrompt =
    examplePrompts[currentPromptIndex % Math.max(1, examplePrompts.length)] ?? ""
  const typedPrompt = currentPrompt.slice(0, typedCharCount)

  useEffect(() => {
    if (!currentPrompt) return

    const isTyping = typedCharCount < currentPrompt.length
    const delayMs = isTyping ? 42 : 1600
    const timeout = setTimeout(() => {
      if (isTyping) {
        setTypedCharCount((count) => count + 1)
        return
      }

      setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % examplePrompts.length)
      setTypedCharCount(0)
    }, delayMs)

    return () => clearTimeout(timeout)
  }, [typedCharCount, currentPrompt])

  const hasMessages = messages.length > 0
  const isExpanded = hasMessages && isConversationOpen

  const submitPrompt = async (message: PromptInputMessage) => {
    const text = message.text.trim()
    if (!text) return

    const userMessage: ChatMessage = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      role: "user",
      content: text,
    }
    const assistantMessageId = `${Date.now()}-${Math.random().toString(16).slice(2)}`

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantMessageId, role: "assistant", content: "" },
    ])
    setIsConversationOpen(true)
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((item) => ({
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
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4">
      <div className="pointer-events-auto w-full max-w-2xl">
        {hasMessages && (
          <div className="mb-2 flex justify-center">
            <Button
              aria-label={isExpanded ? "Minimize conversation" : "Show conversation"}
              className={classes.minimizeButton}
              onClick={() => setIsConversationOpen((value) => !value)}
              size="icon"
              type="button"
              variant="outline"
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          </div>
        )}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={classes.conversationPanel}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Conversation className="h-full">
                <ConversationContent>
                  {messages.length === 0 ? (
                    <ConversationEmptyState
                      title="Ask Ben AI"
                      description="Start a conversation below."
                    />
                  ) : (
                    messages.map((message) => (
                      <Message key={message.id} from={message.role}>
                        <MessageContent>
                          {message.role === "assistant" ? <MessageResponse>{message.content}</MessageResponse> : message.content}
                        </MessageContent>
                      </Message>
                    ))
                  )}
                </ConversationContent>
                <ConversationScrollButton />
              </Conversation>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={`${
            hasMessages
              ? classes.promptShellActive
              : classes.promptShellInitial
          }`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <PromptInput
            className="[&_[data-slot=input-group]]:bg-transparent [&_[data-slot=input-group]]:dark:bg-transparent [&_[data-slot=input-group]]:border-transparent [&_[data-slot=input-group]]:backdrop-blur-md [&_[data-slot=input-group]]:has-[[data-slot=input-group-control]:focus-visible]:border-transparent [&_[data-slot=input-group]]:has-[[data-slot=input-group-control]:focus-visible]:ring-0 [&_[data-slot=input-group-control]]:focus-visible:border-transparent [&_[data-slot=input-group-control]]:focus-visible:ring-0 [&_[data-slot=input-group-control]]:focus:outline-none"
            onSubmit={async (message, event) => {
              event.preventDefault()
              await submitPrompt(message)
            }}
          >
            <div className="relative flex-1">
              {!input && (
                <div
                  className={`pointer-events-none absolute inset-y-0 left-4 z-10 flex items-center text-sm ${classes.placeholderText}`}
                >
                  <span className="mr-1">Try:</span>
                  <span className="mr-1">"</span>
                  <em>{typedPrompt}</em>
                  <span>"</span>
                  <motion.span
                    className={`ml-0.5 inline-block h-4 w-px ${classes.placeholderCaret}`}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  />
                </div>
              )}
              <PromptInputTextarea
                className={hasMessages ? classes.textarea : classes.initialTextarea}
                onChange={(event) => setInput(event.currentTarget.value)}
                placeholder=""
                value={input}
              />
            </div>
            <PromptInputSubmit
              className={hasMessages ? classes.submit : classes.initialSubmit}
              disabled={!input.trim()}
              onStop={() => {}}
              status={isLoading ? "streaming" : "ready"}
            />
          </PromptInput>
        </motion.div>
      </div>
    </div>
  )
}

export default ChatbotUI
