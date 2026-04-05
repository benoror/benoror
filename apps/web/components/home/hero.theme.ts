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
      outrun: "bg-cyan-600/90 hover:bg-cyan-500/95 border border-cyan-300/45 backdrop-blur-md dark:shadow-[0_0_20px_rgba(34,211,238,0.35)] text-white",
      dark: "bg-sky-600/95 hover:bg-sky-500 border border-sky-300/35 backdrop-blur-md text-white",
      light: "bg-sky-700/95 hover:bg-sky-700 border border-sky-500/40 backdrop-blur-md text-white",
    }),
    secondaryButton: pickThemeValue(themeKind, {
      outrun: "border-cyan-300/45 bg-slate-950/70 hover:bg-slate-900/80 dark:shadow-[0_0_15px_rgba(34,211,238,0.2)] text-cyan-100",
      dark: "border-sky-300/45 bg-slate-950/70 hover:bg-slate-900/80 text-sky-100",
      light: "border-sky-500/35 bg-white/90 hover:bg-white text-sky-900",
    }),
    arrow: pickThemeValue(themeKind, {
      outrun: "text-cyan-300",
      dark: "text-sky-300",
      light: "text-sky-700",
    }),
    socialIcon: pickBlueThemeValue(themeKind, "text-sky-300 hover:text-white", "text-sky-700 hover:text-sky-900"),
    socialPanel: pickThemeValue(themeKind, {
      outrun: "rounded-2xl px-4 py-3 bg-slate-950/65 border border-cyan-300/25 backdrop-blur-md",
      dark: "rounded-2xl px-4 py-3 bg-slate-950/70 border border-sky-300/20 backdrop-blur-md",
      light: "rounded-2xl px-4 py-3 bg-white/90 border border-sky-200/80 backdrop-blur-md shadow-[0_10px_30px_rgba(15,23,42,0.10)]",
    }),
  }
}
