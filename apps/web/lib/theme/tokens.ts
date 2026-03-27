import type { AppThemeKind } from "@/hooks/use-app-theme"

const glassPanelByTheme: Record<AppThemeKind, string> = {
  outrun: "rounded-3xl border border-cyan-400/25 bg-slate-950/45 backdrop-blur-xl shadow-[0_24px_80px_rgba(2,8,23,0.65)]",
  dark: "rounded-3xl border border-sky-700/35 bg-slate-950/55 backdrop-blur-xl shadow-[0_24px_80px_rgba(2,8,23,0.55)]",
  light: "rounded-3xl border border-sky-200/80 bg-white/80 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.10)]",
}

export type PanelDensity = "compact" | "regular"

const panelPaddingByDensity: Record<PanelDensity, string> = {
  compact: "p-5 md:p-8",
  regular: "p-6 md:p-8",
}

export function getGlassPanelClass(themeKind: AppThemeKind, density: PanelDensity = "regular"): string {
  return `${glassPanelByTheme[themeKind]} ${panelPaddingByDensity[density]}`
}
