"use client"

import { motion } from "framer-motion"
import { cn } from "@workspace/ui/lib/utils"

type BlinkingCursorProps = {
  className?: string
}

export function BlinkingCursor({ className }: BlinkingCursorProps) {
  return (
    <motion.span
      className={cn("inline-block h-4 w-2 bg-current text-current align-middle", className)}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
    />
  )
}

export default BlinkingCursor
