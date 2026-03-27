import type { AppThemeKind } from "@/hooks/use-app-theme"
import { pickBlueThemeValue, pickThemeValue } from "@/lib/theme-styles"
import { getGlassPanelClass } from "@/lib/theme/tokens"

export function getClasses(themeKind: AppThemeKind) {
  return {
    panel: getGlassPanelClass(themeKind, "regular"),
    heading: pickBlueThemeValue(themeKind, "text-sky-100", "text-sky-900"),
    body: pickBlueThemeValue(themeKind, "text-sky-200", "text-sky-700"),
    linkHover: pickBlueThemeValue(themeKind, "hover:text-sky-300", "hover:text-sky-600"),
    linkFocus: pickThemeValue(themeKind, {
      outrun: "focus-visible:ring-cyan-300/60",
      dark: "focus-visible:ring-sky-300/60",
      light: "focus-visible:ring-sky-500/50",
    }),
  }
}
