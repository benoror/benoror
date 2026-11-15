"use client"

import { motion } from "framer-motion"
import {
  InputGroup,
  InputGroupButton,
  InputGroupTextarea,
} from "@workspace/ui/components/input-group"
import { CornerDownLeftIcon, SquareIcon } from "lucide-react"
import { BlinkingCursor } from "@/components/chatbot/blinking-cursor"
import type { getClasses } from "@/components/chatbot/chatbot-ui.theme"
import { usePromptCarousel } from "@/components/chatbot/use-prompt-carousel"

type ChatbotClasses = ReturnType<typeof getClasses>

type ThemedPromptInputProps = {
  classes: ChatbotClasses
  hasMessages: boolean
  showCarousel: boolean
  isPromptCarouselEnabled: boolean
  isPromptActive: boolean
  prompts: string[]
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
  isPromptCarouselEnabled,
  isPromptActive,
  prompts,
  input,
  isLoading,
  textareaRef,
  onPromptInteract,
  onSubmitText,
  onInputChange,
  onInputFocus,
  onInputBlur,
}: ThemedPromptInputProps) {
  const { typedPrompt } = usePromptCarousel(prompts, isPromptCarouselEnabled)

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
      <form
        className="[&_[data-slot=input-group]]:!bg-transparent [&_[data-slot=input-group]]:dark:!bg-transparent [&_[data-slot=input-group]]:!shadow-none [&_[data-slot=input-group]]:border-transparent [&_[data-slot=input-group]]:backdrop-blur-none [&_[data-slot=input-group]]:has-[[data-slot=input-group-control]:focus-visible]:border-transparent [&_[data-slot=input-group]]:has-[[data-slot=input-group-control]:focus-visible]:ring-0 [&_[data-slot=input-group-control]]:!bg-transparent [&_[data-slot=input-group-control]]:dark:!bg-transparent [&_[data-slot=input-group-control]]:!font-mono [&_[data-slot=input-group-control]]:focus-visible:border-transparent [&_[data-slot=input-group-control]]:focus-visible:ring-0 [&_[data-slot=input-group-control]]:focus:outline-none [&_[data-slot=button]]:!font-mono [&_textarea]:!bg-transparent [&_textarea]:dark:!bg-transparent [&_textarea]:!font-mono [&_button]:!font-mono"
        onClick={onPromptInteract}
        onSubmit={async (event) => {
          event.preventDefault()
          await onSubmitText(input)
        }}
      >
        <InputGroup className="overflow-hidden">
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
            <InputGroupTextarea
              className={`field-sizing-content max-h-48 min-h-16 ${
                hasMessages ? classes.textarea : classes.initialTextarea
              }`}
              name="message"
              onBlur={onInputBlur}
              onChange={(event) => onInputChange(event.currentTarget.value)}
              onFocus={onInputFocus}
              onKeyDown={(event) => {
                if (
                  event.key !== "Enter" ||
                  event.shiftKey ||
                  event.nativeEvent.isComposing ||
                  event.keyCode === 229
                ) {
                  return
                }

                event.preventDefault()
                if (input.trim() && !isLoading) {
                  event.currentTarget.form?.requestSubmit()
                }
              }}
              placeholder=""
              ref={textareaRef}
              value={input}
            />
          </div>
          <InputGroupButton
            aria-label={isLoading ? "Stop" : "Submit"}
            className={hasMessages ? classes.submit : classes.initialSubmit}
            disabled={!input.trim()}
            size="icon-sm"
            type={isLoading ? "button" : "submit"}
            variant="default"
          >
            {isLoading ? (
              <SquareIcon className="size-4" />
            ) : (
              <CornerDownLeftIcon className="size-4" />
            )}
          </InputGroupButton>
        </InputGroup>
      </form>
    </motion.div>
  )
}

export default ThemedPromptInput
