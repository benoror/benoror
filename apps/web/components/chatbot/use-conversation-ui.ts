"use client"

import { useEffect, useState } from "react"

type UseConversationUIOptions = {
  hasMessages: boolean
  input: string
  rootElement: HTMLDivElement | null
  focusTextarea: () => void
}

export function useConversationUI({
  hasMessages,
  input,
  rootElement,
  focusTextarea,
}: UseConversationUIOptions) {
  const [isInputFocused, setIsInputFocused] = useState(false)
  const [isConversationOpen, setIsConversationOpen] = useState(false)

  const isExpanded = hasMessages && isConversationOpen
  const isPromptActive = isInputFocused || input.trim().length > 0
  const showCarousel = !hasMessages && !input

  useEffect(() => {
    if (!isExpanded) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (rootElement?.contains(target)) return
      setIsConversationOpen(false)
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("touchstart", handlePointerDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("touchstart", handlePointerDown)
    }
  }, [isExpanded, rootElement])

  const handlePromptInteract = () => {
    if (hasMessages) setIsConversationOpen(true)
    focusTextarea()
  }

  const handleInputFocus = () => {
    setIsInputFocused(true)
    if (hasMessages) setIsConversationOpen(true)
  }

  const handleInputBlur = () => {
    setIsInputFocused(false)
  }

  return {
    isConversationOpen,
    isExpanded,
    isPromptActive,
    showCarousel,
    setIsConversationOpen,
    handlePromptInteract,
    handleInputFocus,
    handleInputBlur,
  }
}
