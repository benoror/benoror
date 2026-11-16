"use client"

import { useSyncExternalStore } from "react"

let hasInteracted = false
let removeInteractionListeners: (() => void) | null = null
const subscribers = new Set<() => void>()

const markInteracted = () => {
  if (hasInteracted) return

  hasInteracted = true
  removeInteractionListeners?.()
  removeInteractionListeners = null
  subscribers.forEach((subscriber) => subscriber())
}

const addInteractionListeners = () => {
  window.addEventListener("pointerdown", markInteracted)
  window.addEventListener("keydown", markInteracted)
  window.addEventListener("scroll", markInteracted, { passive: true })

  return () => {
    window.removeEventListener("pointerdown", markInteracted)
    window.removeEventListener("keydown", markInteracted)
    window.removeEventListener("scroll", markInteracted)
  }
}

const subscribe = (subscriber: () => void) => {
  subscribers.add(subscriber)

  if (!hasInteracted && !removeInteractionListeners) {
    removeInteractionListeners = addInteractionListeners()
  }

  return () => {
    subscribers.delete(subscriber)
    if (subscribers.size === 0 && removeInteractionListeners) {
      removeInteractionListeners()
      removeInteractionListeners = null
    }
  }
}

export const useHasInteracted = () =>
  useSyncExternalStore(subscribe, () => hasInteracted, () => false)
