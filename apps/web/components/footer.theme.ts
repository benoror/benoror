import type { AppThemeKind } from "@/hooks/use-app-theme"
import { pickBlueThemeValue, pickThemeValue } from "@/lib/theme-styles"

export function getClasses(themeKind: AppThemeKind) {
  return {
    root: pickThemeValue(themeKind, {
      outrun: "border-sky-900/20 bg-black/80",
      dark: "border-sky-900/30 bg-slate-950/85",
      light: "border-sky-200 bg-white/90",
    }),
    text: pickBlueThemeValue(themeKind, "text-sky-300", "text-sky-700"),
    icon: pickBlueThemeValue(themeKind, "text-sky-300 hover:text-white", "text-sky-700 hover:text-sky-900"),
    code: pickBlueThemeValue(themeKind, "text-sky-900", "text-sky-500"),
  }
}
