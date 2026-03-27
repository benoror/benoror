import type { AppThemeKind } from "@/hooks/use-app-theme"
import { isOutrunTheme, pickBlueThemeValue, pickThemeValue } from "@/lib/theme-styles"
import { getGlassPanelClass } from "@/lib/theme/tokens"

export function getClasses(themeKind: AppThemeKind) {
  return {
    showOutrunGrid: isOutrunTheme(themeKind),
    page: pickThemeValue(themeKind, {
      outrun: "",
      dark: "bg-gradient-to-b from-slate-950 via-sky-950/20 to-slate-950",
      light: "bg-gradient-to-b from-white via-sky-50 to-blue-50",
    }),
    panel: getGlassPanelClass(themeKind, "regular"),
    heading: pickBlueThemeValue(themeKind, "text-sky-200", "text-sky-900"),
    headingAccent: pickThemeValue(themeKind, {
      outrun: "drop-shadow-[0_0_22px_rgba(34,211,238,0.35)]",
      dark: "",
      light: "",
    }),
    body: pickBlueThemeValue(themeKind, "text-sky-200/90", "text-sky-700"),
    link: pickBlueThemeValue(themeKind, "text-sky-200 hover:text-sky-100", "text-sky-700 hover:text-sky-900"),
    linkFocus: pickThemeValue(themeKind, {
      outrun: "focus-visible:ring-cyan-300/60",
      dark: "focus-visible:ring-sky-300/60",
      light: "focus-visible:ring-sky-500/50",
    }),
    card: pickThemeValue(themeKind, {
      outrun: "rounded-xl border border-cyan-400/25 bg-cyan-950/20 backdrop-blur-md",
      dark: "rounded-xl border border-sky-600/25 bg-sky-950/20 backdrop-blur-md",
      light: "rounded-xl border border-sky-200/80 bg-white/80 backdrop-blur-md",
    }),
    itemTitle: pickBlueThemeValue(themeKind, "text-sky-100", "text-sky-900"),
    meta: pickBlueThemeValue(themeKind, "text-sky-300/80", "text-sky-700"),
    badge: pickThemeValue(themeKind, {
      outrun: "border-cyan-400/30 text-cyan-200",
      dark: "border-sky-500/30 text-sky-200",
      light: "border-sky-300 text-sky-700",
    }),
    warningBadge: pickThemeValue(themeKind, {
      outrun: "border-amber-300/40 text-amber-300",
      dark: "border-amber-400/40 text-amber-300",
      light: "border-amber-500/40 text-amber-700",
    }),
    warningText: pickThemeValue(themeKind, {
      outrun: "text-amber-300",
      dark: "text-amber-300",
      light: "text-amber-700",
    }),
  }
}
