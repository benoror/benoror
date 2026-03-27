import type { AppThemeKind } from "@/hooks/use-app-theme"
import { isOutrunTheme, pickBlueThemeValue, pickThemeValue } from "@/lib/theme-styles"

export function getClasses(themeKind: AppThemeKind) {
  return {
    showOutrunGrid: isOutrunTheme(themeKind),
    section: pickThemeValue(themeKind, {
      outrun: "",
      dark: "bg-gradient-to-b from-black via-sky-950/20 to-black",
      light: "bg-gradient-to-b from-white via-sky-50 to-blue-50",
    }),
    subtitle: pickThemeValue(themeKind, {
      outrun: "text-cyan-200/80",
      dark: "text-sky-200/90",
      light: "text-sky-700",
    }),
    primaryButton: pickThemeValue(themeKind, {
      outrun: "bg-cyan-600/80 hover:bg-cyan-500/90 dark:shadow-[0_0_20px_rgba(34,211,238,0.35)] text-white",
      dark: "bg-sky-600 hover:bg-sky-500 text-white",
      light: "bg-sky-600 hover:bg-sky-700 text-white",
    }),
    secondaryButton: pickThemeValue(themeKind, {
      outrun: "border-cyan-400/30 bg-cyan-950/20 hover:bg-cyan-900/30 dark:shadow-[0_0_15px_rgba(34,211,238,0.2)] text-cyan-100",
      dark: "border-sky-400/30 bg-sky-950/30 hover:bg-sky-900/40 text-sky-100",
      light: "border-sky-300 bg-white/70 hover:bg-sky-100/80 text-sky-800",
    }),
    arrow: pickThemeValue(themeKind, {
      outrun: "text-cyan-300",
      dark: "text-sky-300",
      light: "text-sky-700",
    }),
    socialIcon: pickBlueThemeValue(themeKind, "text-sky-300 hover:text-white", "text-sky-700 hover:text-sky-900"),
  }
}
