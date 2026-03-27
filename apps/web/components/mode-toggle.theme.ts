import { cva } from "class-variance-authority"
import type { AppThemeKind } from "@/hooks/use-app-theme"
import { isBlueDarkTheme } from "@/lib/theme-styles"

const modeToggleTriggerVariants = cva("rounded-full cursor-pointer", {
  variants: {
    tone: {
      blueDark: "text-sky-100",
      light: "text-sky-700",
    },
  },
})

export function getClasses(themeKind: AppThemeKind) {
  return {
    trigger: modeToggleTriggerVariants({ tone: isBlueDarkTheme(themeKind) ? "blueDark" : "light" }),
  }
}
