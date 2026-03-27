import type { AppThemeKind } from "@/hooks/use-app-theme"
import { pickBlueThemeValue, pickThemeValue } from "@/lib/theme-styles"
import { getGlassPanelClass } from "@/lib/theme/tokens"

export function getClasses(themeKind: AppThemeKind) {
  return {
    panel: getGlassPanelClass(themeKind, "regular"),
    heading: pickBlueThemeValue(themeKind, "text-sky-100", "text-sky-900"),
    body: pickBlueThemeValue(themeKind, "text-sky-200", "text-sky-700"),
    source: pickBlueThemeValue(themeKind, "text-sky-300/80", "text-sky-600"),
    linkHover: pickBlueThemeValue(themeKind, "hover:text-sky-300", "hover:text-sky-900"),
    linkFocus: pickThemeValue(themeKind, {
      outrun: "focus-visible:ring-cyan-300/60",
      dark: "focus-visible:ring-sky-300/60",
      light: "focus-visible:ring-sky-500/50",
    }),
    separator: pickThemeValue(themeKind, {
      outrun: "border-cyan-400/20",
      dark: "border-sky-700/35",
      light: "border-sky-200/70",
    }),
  }
}
