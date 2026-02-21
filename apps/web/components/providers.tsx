"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { getInitialThemePreference, THEME_STORAGE_KEY } from "@/lib/theme-default-policy"

function ThemeBootstrap() {
  const { setTheme } = useTheme()

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const hasSavedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (hasSavedTheme) return

    setTheme(getInitialThemePreference())
  }, [setTheme])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      themes={["light", "dark", "outrun", "system"]}
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <ThemeBootstrap />
      {children}
    </NextThemesProvider>
  )
}
