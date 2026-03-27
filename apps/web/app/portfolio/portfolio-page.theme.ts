import type { AppThemeKind } from "@/hooks/use-app-theme"
import { isOutrunTheme, pickBlueThemeValue, pickThemeValue } from "@/lib/theme-styles"
import { getGlassPanelClass } from "@/lib/theme/tokens"
import { getClasses as getTabClasses } from "./portfolio-tabs.variants"

export function getClasses(themeKind: AppThemeKind) {
  const tabClasses = getTabClasses(themeKind)

  return {
    showOutrunGrid: isOutrunTheme(themeKind),
    page: pickThemeValue(themeKind, {
      outrun: "",
      dark: "bg-gradient-to-b from-slate-950 via-sky-950/20 to-slate-950",
      light: "bg-gradient-to-b from-white via-sky-50 to-blue-50",
    }),
    heading: pickBlueThemeValue(themeKind, "text-sky-300", "text-sky-800"),
    tabBorder: pickBlueThemeValue(themeKind, "border-cyan-400/25", "border-sky-200"),
    panel: getGlassPanelClass(themeKind, "compact"),
    headingAccent: pickThemeValue(themeKind, {
      outrun: "drop-shadow-[0_0_22px_rgba(34,211,238,0.35)]",
      dark: "",
      light: "",
    }),
    tab: tabClasses.tab,
    tabCount: tabClasses.tabCount,
    tabIndicator: tabClasses.tabIndicator,
  }
}
