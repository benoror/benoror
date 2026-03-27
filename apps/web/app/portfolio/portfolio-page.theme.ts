import type { AppThemeKind } from "@/hooks/use-app-theme"
import { pickBlueValue, pickThemeValue } from "@/lib/theme-styles"
import { getGlassPanelClass } from "@/lib/theme/tokens"

export function getPortfolioPageClasses(themeKind: AppThemeKind, isBlueDark: boolean) {
  return {
    page: pickThemeValue(themeKind, {
      outrun: "",
      dark: "bg-gradient-to-b from-slate-950 via-sky-950/20 to-slate-950",
      light: "bg-gradient-to-b from-white via-sky-50 to-blue-50",
    }),
    heading: pickBlueValue(isBlueDark, "text-sky-300", "text-sky-800"),
    tabBorder: pickBlueValue(isBlueDark, "border-cyan-400/25", "border-sky-200"),
    panel: getGlassPanelClass(themeKind, "compact"),
    headingAccent: pickThemeValue(themeKind, {
      outrun: "drop-shadow-[0_0_22px_rgba(34,211,238,0.35)]",
      dark: "",
      light: "",
    }),
  }
}
