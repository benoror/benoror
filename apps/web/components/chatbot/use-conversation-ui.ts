"use client"

import { useEffect, useReducer } from "react"

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
  type ConversationUIState = {
    isInputFocused: boolean
    isConversationOpen: boolean
  }

  type ConversationUIAction =
    | { type: "INPUT_FOCUS"; hasMessages: boolean }
    | { type: "INPUT_BLUR" }
    | { type: "PROMPT_INTERACT"; hasMessages: boolean }
    | { type: "MINIMIZE" }
    | { type: "SET_OPEN"; value: boolean }

  const reducer = (
    state: ConversationUIState,
    action: ConversationUIAction,
  ): ConversationUIState => {
    switch (action.type) {
      case "INPUT_FOCUS":
        return {
          ...state,
          isInputFocused: true,
          isConversationOpen: action.hasMessages ? true : state.isConversationOpen,
        }
      case "INPUT_BLUR":
        return { ...state, isInputFocused: false }
      case "PROMPT_INTERACT":
        return {
          ...state,
          isConversationOpen: action.hasMessages ? true : state.isConversationOpen,
        }
      case "MINIMIZE":
        return { ...state, isConversationOpen: false }
      case "SET_OPEN":
        return { ...state, isConversationOpen: action.value }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    isInputFocused: false,
    isConversationOpen: false,
  })

  const isExpanded = hasMessages && state.isConversationOpen
  const isPromptActive = state.isInputFocused || input.trim().length > 0
  const showCarousel = !hasMessages && !input
  const uiMode = !hasMessages ? "idle" : isExpanded ? "expanded" : "collapsed"

  useEffect(() => {
    if (!isExpanded) return

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null
      if (!target) return
      if (rootElement?.contains(target)) return
      dispatch({ type: "MINIMIZE" })
    }

    document.addEventListener("mousedown", handlePointerDown)
    document.addEventListener("touchstart", handlePointerDown)

    return () => {
      document.removeEventListener("mousedown", handlePointerDown)
      document.removeEventListener("touchstart", handlePointerDown)
    }
  }, [isExpanded, rootElement])

  const handlePromptInteract = () => {
    dispatch({ type: "PROMPT_INTERACT", hasMessages })
    focusTextarea()
  }

  const handleInputFocus = () => {
    dispatch({ type: "INPUT_FOCUS", hasMessages })
  }

  const handleInputBlur = () => {
    dispatch({ type: "INPUT_BLUR" })
  }

  const setIsConversationOpen = (value: boolean) => {
    dispatch({ type: "SET_OPEN", value })
  }

  return {
    isConversationOpen: state.isConversationOpen,
    isExpanded,
    isPromptActive,
    showCarousel,
    uiMode,
    setIsConversationOpen,
    handlePromptInteract,
    handleInputFocus,
    handleInputBlur,
  }
}
