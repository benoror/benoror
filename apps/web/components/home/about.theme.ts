import type { AppThemeKind } from "@/hooks/use-app-theme"
import { pickBlueValue, pickThemeValue } from "@/lib/theme-styles"
import { getGlassPanelClass } from "@/lib/theme/tokens"

export function getAboutClasses(themeKind: AppThemeKind, isBlueDark: boolean) {
  return {
    panel: getGlassPanelClass(themeKind, "regular"),
    heading: pickBlueValue(isBlueDark, "text-sky-100", "text-sky-900"),
    body: pickBlueValue(isBlueDark, "text-sky-200", "text-sky-700"),
    linkHover: pickBlueValue(isBlueDark, "hover:text-sky-300", "hover:text-sky-600"),
    linkFocus: pickThemeValue(themeKind, {
      outrun: "focus-visible:ring-cyan-300/60",
      dark: "focus-visible:ring-sky-300/60",
      light: "focus-visible:ring-sky-500/50",
    }),
  }
}
