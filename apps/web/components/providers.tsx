"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"
import { resolveBootstrapTheme } from "@/lib/theme-default-policy"
import { TooltipProvider } from "@workspace/ui/components/tooltip"

function ThemeBootstrap() {
  const { setTheme } = useTheme()

  React.useEffect(() => {
    const bootstrapTheme = resolveBootstrapTheme()
    if (bootstrapTheme) setTheme(bootstrapTheme)
  }, [setTheme])

  return null
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
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
    </TooltipProvider>
  )
}
