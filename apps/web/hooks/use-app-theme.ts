"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export type AppThemeKind = "light" | "dark" | "outrun"

export function useAppTheme() {
  const [mounted, setMounted] = useState(false)
  const [rootClassName, setRootClassName] = useState("")
  const { theme, resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || typeof document === "undefined") return

    const root = document.documentElement
    const syncRootClass = () => {
      setRootClassName(root.className)
    }

    syncRootClass()
    const observer = new MutationObserver(syncRootClass)
    observer.observe(root, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect()
  }, [mounted])

  const activeTheme = mounted ? theme : undefined
  const activeResolvedTheme = mounted ? resolvedTheme : undefined
  const rootHasOutrunClass = mounted && rootClassName.includes("outrun")
  const rootHasDarkClass = mounted && rootClassName.includes("dark")

  // Prefer DOM class as source of truth, fallback to provider state.
  const isOutrun = rootHasOutrunClass || activeTheme === "outrun"
  const isDark = !isOutrun && (rootHasDarkClass || activeResolvedTheme === "dark")
  const isBlueDark = isOutrun || isDark

  const themeKind: AppThemeKind = isOutrun ? "outrun" : isDark ? "dark" : "light"

  return {
    mounted,
    theme,
    resolvedTheme,
    activeTheme,
    activeResolvedTheme,
    isOutrun,
    isDark,
    isBlueDark,
    themeKind,
    setTheme,
  }
}
