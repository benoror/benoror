import type { AppThemeKind } from "@/hooks/use-app-theme"
import { isOutrunTheme, pickBlueThemeValue, pickThemeValue } from "@/lib/theme-styles"

export function getClasses(themeKind: AppThemeKind) {
  const isOutrun = isOutrunTheme(themeKind)

  return {
    root: pickThemeValue(themeKind, {
      outrun: "bg-gradient-to-br from-slate-950/90 via-slate-900/85 to-sky-950/80 border-cyan-400/35 shadow-[0_16px_40px_rgba(2,12,27,0.65)]",
      dark: "bg-gradient-to-br from-slate-900 to-sky-950/70 border-sky-700/30 shadow-slate-900/30",
      light: "bg-gradient-to-br from-white to-sky-50/90 border-sky-200 shadow-sky-100/70",
    }),
    badge: pickThemeValue(themeKind, {
      outrun: "bg-cyan-950/80 text-cyan-100 border-cyan-400/45",
      dark: "bg-sky-700/70 text-sky-50 border-sky-400/50",
      light: "bg-sky-100 text-sky-800 border-sky-300",
    }),
    yearBadge: pickThemeValue(themeKind, {
      outrun: "bg-slate-950/80 text-cyan-100 border-cyan-500/35",
      dark: "bg-black/30 text-sky-50 border-none",
      light: "bg-white/80 text-sky-700 border-sky-200",
    }),
    title: pickThemeValue(themeKind, {
      outrun: "text-cyan-50 hover:text-cyan-200",
      dark: "text-sky-50 hover:text-sky-200",
      light: "text-sky-900 hover:text-sky-700",
    }),
    description: pickThemeValue(themeKind, {
      outrun: "text-sky-100/95",
      dark: "text-sky-100",
      light: "text-sky-700",
    }),
    tech: pickThemeValue(themeKind, {
      outrun: "bg-slate-900/90 text-cyan-100 border border-cyan-500/30",
      dark: "bg-sky-800/70 text-sky-100 border border-sky-500/20",
      light: "bg-sky-100 text-sky-700 border border-sky-300",
    }),
    divider: pickBlueThemeValue(themeKind, "border-sky-700/30", "border-sky-200"),
    link: pickThemeValue(themeKind, {
      outrun: "text-cyan-200 hover:text-cyan-50",
      dark: "text-sky-200 hover:text-sky-50",
      light: "text-sky-700 hover:text-sky-900",
    }),
    imageOverlay: pickThemeValue(themeKind, {
      outrun: "bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-950/10",
      dark: "bg-gradient-to-t from-sky-900/90 to-transparent",
      light: "bg-gradient-to-t from-sky-900/90 to-transparent",
    }),
    iconWrap: pickThemeValue(themeKind, {
      outrun: "bg-slate-950/90 border-cyan-400/50 ring-cyan-300/35",
      dark: "bg-white border-sky-700/30 ring-sky-200",
      light: "bg-white border-sky-700/30 ring-sky-200",
    }),
    body: pickThemeValue(themeKind, {
      outrun: "bg-slate-950/45 backdrop-blur-md",
      dark: "",
      light: "",
    }),
    hoverShadow: isOutrun ? "0 16px 40px rgba(34, 211, 238, 0.22)" : "0 15px 30px rgba(0, 120, 255, 0.3)",
  }
}
