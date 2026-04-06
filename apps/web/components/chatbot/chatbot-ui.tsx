"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useEffect, useRef, useState } from "react"
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
import { BlinkingCursor } from "@/components/chatbot/blinking-cursor"
import { usePromptCarousel } from "@/components/chatbot/use-prompt-carousel"
import { useConversationUI } from "@/components/chatbot/use-conversation-ui"
import { useChatTransport } from "@/components/chatbot/use-chat-transport"

function StreamReveal({
  content,
  active,
  textClassName,
  cursorClassName,
}: {
  content: string
  active: boolean
  textClassName: string
  cursorClassName: string
}) {
  const [visibleChars, setVisibleChars] = useState(content.length)

  useEffect(() => {
    if (!active) {
      setVisibleChars(content.length)
      return
    }

    if (visibleChars >= content.length) return

    const timeout = setTimeout(() => {
      const remaining = content.length - visibleChars
      // Fast, terminal-like reveal rate.
      const step = Math.max(1, Math.min(remaining, 3))
      setVisibleChars((count) => Math.min(content.length, count + step))
    }, 10)

    return () => clearTimeout(timeout)
  }, [active, content, visibleChars])

  useEffect(() => {
    if (!active) return
    if (content.length > visibleChars) return
    setVisibleChars(content.length)
  }, [active, content.length, visibleChars])

  const shownText = active ? content.slice(0, visibleChars) : content

  return (
    <>
      <MessageResponse className={`font-mono text-left text-sm leading-5 ${textClassName} [&_*]:!text-inherit`}>
        {shownText}
      </MessageResponse>
      {active && (
        <BlinkingCursor className={`ml-1 ${cursorClassName}`} />
      )}
    </>
  )
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
  const rootRef = useRef<HTMLDivElement | null>(null)
  const promptContainerRef = useRef<HTMLDivElement | null>(null)
  const [input, setInput] = useState("")
  const { messages, isLoading, submitPromptText } = useChatTransport()
  const hasMessages = messages.length > 0
  const focusPromptTextarea = () => {
    const textarea = promptContainerRef.current?.querySelector(
      'textarea[name="message"]',
    ) as HTMLTextAreaElement | null
    textarea?.focus()
  }
  const {
    isConversationOpen,
    isExpanded,
    isPromptActive,
    showCarousel,
    setIsConversationOpen,
    handlePromptInteract,
    handleInputFocus,
    handleInputBlur,
  } = useConversationUI({
    hasMessages,
    input,
    rootElement: rootRef.current,
    focusTextarea: focusPromptTextarea,
  })
  const { typedPrompt } = usePromptCarousel(examplePrompts, !hasMessages)

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4">
      <div ref={rootRef} className="pointer-events-auto w-full max-w-2xl">
        {isExpanded && (
          <div className="-mb-px flex justify-center">
            <Button
              aria-label="Minimize conversation"
              className={classes.minimizeButton}
              onClick={() => setIsConversationOpen(false)}
              size="sm"
              type="button"
              variant="ghost"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
        )}

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={`${classes.conversationPanel} relative`}
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <div
                aria-hidden="true"
                className={classes.scanlineOverlay}
              />
              <div
                aria-hidden="true"
                className={classes.noiseOverlay}
              />
              <Conversation className="relative z-10 h-full">
                <ConversationContent className={`gap-2 p-2.5 font-mono text-sm leading-5 ${classes.conversationText}`}>
                  {messages.length === 0 ? (
                    <ConversationEmptyState
                      className={classes.emptyStateText}
                      title="Ask Ben AI"
                      description="Start a conversation below."
                    />
                  ) : (
                    messages.map((message, index) => (
                      <Message
                        className="ml-0 max-w-full justify-start gap-0.5"
                        key={message.id}
                        from={message.role}
                      >
                        <MessageContent className={`w-full bg-transparent px-0 py-0 text-left text-sm leading-5 ${classes.conversationText} ${classes.userMessage}`}>
                          {message.role === "assistant" ? (
                            <StreamReveal
                              active={
                                isLoading &&
                                index === messages.length - 1 &&
                                message.role === "assistant"
                              }
                              content={message.content}
                              cursorClassName={classes.streamCaret}
                              textClassName={classes.conversationText}
                            />
                          ) : (
                            message.content
                          )}
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
          ref={promptContainerRef}
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
            className="[&_[data-slot=input-group]]:!bg-transparent [&_[data-slot=input-group]]:dark:!bg-transparent [&_[data-slot=input-group]]:!shadow-none [&_[data-slot=input-group]]:border-transparent [&_[data-slot=input-group]]:backdrop-blur-none [&_[data-slot=input-group]]:has-[[data-slot=input-group-control]:focus-visible]:border-transparent [&_[data-slot=input-group]]:has-[[data-slot=input-group-control]:focus-visible]:ring-0 [&_[data-slot=input-group-control]]:!bg-transparent [&_[data-slot=input-group-control]]:dark:!bg-transparent [&_[data-slot=input-group-control]]:!font-mono [&_[data-slot=input-group-control]]:focus-visible:border-transparent [&_[data-slot=input-group-control]]:focus-visible:ring-0 [&_[data-slot=input-group-control]]:focus:outline-none [&_[data-slot=button]]:!font-mono [&_textarea]:!bg-transparent [&_textarea]:dark:!bg-transparent [&_textarea]:!font-mono [&_button]:!font-mono"
            onClick={handlePromptInteract}
            onSubmit={async (message, event) => {
              event.preventDefault()
              const didSubmit = await submitPromptText(message.text)
              if (!didSubmit) return
              setIsConversationOpen(true)
              setInput("")
            }}
          >
            <div className="relative flex-1">
              <div
                className={`pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 font-mono text-sm ${classes.promptGlyph}`}
              >
                ❯
              </div>
              {showCarousel && (
                <div
                  className={`pointer-events-none absolute inset-y-0 left-10 z-10 flex items-center font-mono text-sm transition-opacity duration-200 ${isPromptActive ? "opacity-20" : "opacity-100"} ${classes.placeholderText}`}
                >
                  <span className="mr-1">Try:</span>
                  <span className="mr-1">"</span>
                  <em>{typedPrompt}</em>
                  <span>"</span>
                  {!isPromptActive && (
                    <BlinkingCursor className={`ml-1 ${classes.placeholderCaret}`} />
                  )}
                </div>
              )}
              <PromptInputTextarea
                className={hasMessages ? classes.textarea : classes.initialTextarea}
                onChange={(event) => setInput(event.currentTarget.value)}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
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
