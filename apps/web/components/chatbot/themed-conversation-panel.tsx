"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
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
import { BlinkingCursor } from "@/components/chatbot/blinking-cursor"
import type { ChatMessage } from "@/components/chatbot/use-chat-transport"
import type { getClasses } from "@/components/chatbot/chatbot-ui.theme"
import { memo, useEffect, useState } from "react"

type ChatbotClasses = ReturnType<typeof getClasses>

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
      <MessageResponse
        className={`font-mono text-left text-sm leading-5 ${textClassName} [&_*]:!text-inherit`}
      >
        {shownText}
      </MessageResponse>
      {active && <BlinkingCursor className={`ml-1 ${cursorClassName}`} />}
    </>
  )
}

export type ThemedConversationPanelProps = {
  classes: ChatbotClasses
  isExpanded: boolean
  messages: ChatMessage[]
  isLoading: boolean
  onMinimize: () => void
}

export const ThemedConversationPanel = memo(function ThemedConversationPanel({
  classes,
  isExpanded,
  messages,
  isLoading,
  onMinimize,
}: ThemedConversationPanelProps) {
  return (
    <>
      {isExpanded && (
        <div className="-mb-px flex justify-center">
          <Button
            aria-label="Minimize conversation"
            className={classes.minimizeButton}
            onClick={onMinimize}
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
            <div aria-hidden="true" className={classes.scanlineOverlay} />
            <div aria-hidden="true" className={classes.noiseOverlay} />
            <Conversation className="relative z-10 h-full">
              <ConversationContent
                className={`gap-2 p-2.5 font-mono text-sm leading-5 ${classes.conversationText}`}
              >
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
                      <MessageContent
                        className={`w-full bg-transparent px-0 py-0 text-left text-sm leading-5 ${classes.conversationText} ${classes.userMessage}`}
                      >
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
    </>
  )
})

export default ThemedConversationPanel
