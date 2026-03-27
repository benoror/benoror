import type { AppThemeKind } from "@/hooks/use-app-theme"
import { pickBlueValue, pickThemeValue } from "@/lib/theme-styles"

export function getFooterClasses(themeKind: AppThemeKind, isBlueDark: boolean) {
  return {
    root: pickThemeValue(themeKind, {
      outrun: "border-sky-900/20 bg-black/80",
      dark: "border-sky-900/30 bg-slate-950/85",
      light: "border-sky-200 bg-white/90",
    }),
    text: pickBlueValue(isBlueDark, "text-sky-300", "text-sky-700"),
    icon: pickBlueValue(isBlueDark, "text-sky-300 hover:text-white", "text-sky-700 hover:text-sky-900"),
    code: pickBlueValue(isBlueDark, "text-sky-900", "text-sky-500"),
  }
}
