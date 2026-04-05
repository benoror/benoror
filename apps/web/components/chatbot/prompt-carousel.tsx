"use client"

import { AnimatePresence, motion } from "framer-motion"

interface PromptCarouselProps {
  prompt: string
  onClick: (prompt: string) => void
}

export function PromptCarousel({ prompt, onClick }: PromptCarouselProps) {
  if (!prompt) return null

  return (
    <div className="text-sm text-gray-500 mb-2 h-5 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={prompt}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute cursor-pointer"
          onClick={() => onClick(prompt)}
        >
          Try: "{prompt}"
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
