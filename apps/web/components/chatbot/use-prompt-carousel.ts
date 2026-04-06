"use client"

import { useEffect, useState } from "react"

export function usePromptCarousel(prompts: string[], enabled: boolean) {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [typedCharCount, setTypedCharCount] = useState(0)

  const promptCount = Math.max(1, prompts.length)
  const currentPrompt = prompts[currentPromptIndex % promptCount] ?? ""

  useEffect(() => {
    if (!enabled) {
      setTypedCharCount(0)
      return
    }
    if (!currentPrompt) return

    const isTyping = typedCharCount < currentPrompt.length
    const delayMs = isTyping ? 42 : 1600

    const timeout = setTimeout(() => {
      if (isTyping) {
        setTypedCharCount((count) => count + 1)
        return
      }

      setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % promptCount)
      setTypedCharCount(0)
    }, delayMs)

    return () => clearTimeout(timeout)
  }, [enabled, currentPrompt, typedCharCount, promptCount])

  const typedPrompt = enabled ? currentPrompt.slice(0, typedCharCount) : ""

  return {
    typedPrompt,
  }
}
