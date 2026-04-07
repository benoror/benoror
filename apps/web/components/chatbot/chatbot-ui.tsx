"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { useAppTheme } from "@/hooks/use-app-theme"
import { getClasses } from "@/components/chatbot/chatbot-ui.theme"
import { usePromptCarousel } from "@/components/chatbot/use-prompt-carousel"
import { useConversationUI } from "@/components/chatbot/use-conversation-ui"
import { useChatTransport } from "@/components/chatbot/use-chat-transport"
import { ThemedPromptInput } from "@/components/chatbot/themed-prompt-input"
import { ThemedConversationPanel } from "@/components/chatbot/themed-conversation-panel"

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
  const classes = useMemo(() => getClasses(themeKind), [themeKind])
  const rootRef = useRef<HTMLDivElement | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [input, setInput] = useState("")
  const { messages, isLoading, submitPromptText } = useChatTransport()
  const hasMessages = messages.length > 0
  const focusPromptTextarea = () => textareaRef.current?.focus()
  const {
    uiMode,
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
  const isExpanded = uiMode === "expanded"
  const isIdle = uiMode === "idle"
  const { typedPrompt } = usePromptCarousel(examplePrompts, isIdle)
  const handleMinimize = useCallback(() => setIsConversationOpen(false), [setIsConversationOpen])
  const handleSubmitText = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      // Clear immediately so the textarea resets as soon as user submits.
      setInput("")
      setIsConversationOpen(true)

      const didSubmit = await submitPromptText(trimmed)
      if (!didSubmit) return
    },
    [setIsConversationOpen, submitPromptText],
  )

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex justify-center px-4">
      <div ref={rootRef} className="pointer-events-auto w-full max-w-2xl">
        <ThemedConversationPanel
          classes={classes}
          isExpanded={isExpanded}
          messages={messages}
          isLoading={isLoading}
          onMinimize={handleMinimize}
        />

        <ThemedPromptInput
          classes={classes}
          hasMessages={hasMessages}
          input={input}
          isLoading={isLoading}
          isPromptActive={isPromptActive}
          onInputBlur={handleInputBlur}
          onInputChange={setInput}
          onInputFocus={handleInputFocus}
          onPromptInteract={handlePromptInteract}
          onSubmitText={handleSubmitText}
          textareaRef={textareaRef}
          showCarousel={showCarousel}
          typedPrompt={typedPrompt}
        />
      </div>
    </div>
  )
}

export default ChatbotUI
