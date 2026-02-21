"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"

export type AppThemeKind = "light" | "dark" | "outrun"

export function useAppTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const activeTheme = mounted ? theme : undefined
  const activeResolvedTheme = mounted ? resolvedTheme : undefined

  const isOutrun = activeTheme === "outrun"
  const isDark = activeTheme !== "outrun" && activeResolvedTheme === "dark"
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
