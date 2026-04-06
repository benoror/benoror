"use client"

import { motion } from "framer-motion"
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  type PromptInputMessage,
} from "@/components/ai-elements/prompt-input"
import { BlinkingCursor } from "@/components/chatbot/blinking-cursor"
import type { getClasses } from "@/components/chatbot/chatbot-ui.theme"

type ChatbotClasses = ReturnType<typeof getClasses>

type ThemedPromptInputProps = {
  classes: ChatbotClasses
  hasMessages: boolean
  showCarousel: boolean
  isPromptActive: boolean
  typedPrompt: string
  input: string
  isLoading: boolean
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  onPromptInteract: () => void
  onSubmitText: (text: string) => Promise<void>
  onInputChange: (value: string) => void
  onInputFocus: () => void
  onInputBlur: () => void
}

export function ThemedPromptInput({
  classes,
  hasMessages,
  showCarousel,
  isPromptActive,
  typedPrompt,
  input,
  isLoading,
  textareaRef,
  onPromptInteract,
  onSubmitText,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ThemedPromptInputProps) {
  return (
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
        className="[&_[data-slot=input-group]]:!bg-transparent [&_[data-slot=input-group]]:dark:!bg-transparent [&_[data-slot=input-group]]:!shadow-none [&_[data-slot=input-group]]:border-transparent [&_[data-slot=input-group]]:backdrop-blur-none [&_[data-slot=input-group]]:has-[[data-slot=input-group-control]:focus-visible]:border-transparent [&_[data-slot=input-group]]:has-[[data-slot=input-group-control]:focus-visible]:ring-0 [&_[data-slot=input-group-control]]:!bg-transparent [&_[data-slot=input-group-control]]:dark:!bg-transparent [&_[data-slot=input-group-control]]:!font-mono [&_[data-slot=input-group-control]]:focus-visible:border-transparent [&_[data-slot=input-group-control]]:focus-visible:ring-0 [&_[data-slot=input-group-control]]:focus:outline-none [&_[data-slot=button]]:!font-mono [&_textarea]:!bg-transparent [&_textarea]:dark:!bg-transparent [&_textarea]:!font-mono [&_button]:!font-mono"
        onClick={onPromptInteract}
        onSubmit={async (message: PromptInputMessage, event) => {
          event.preventDefault()
          await onSubmitText(message.text)
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
            onChange={(event) => onInputChange(event.currentTarget.value)}
            onFocus={onInputFocus}
            onBlur={onInputBlur}
            placeholder=""
            ref={textareaRef}
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
  )
}

export default ThemedPromptInput
