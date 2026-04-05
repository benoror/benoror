import type { AppThemeKind } from "@/hooks/use-app-theme"
import { pickThemeValue } from "@/lib/theme-styles"

export function getClasses(themeKind: AppThemeKind) {
  return {
    minimizeButton: pickThemeValue(themeKind, {
      outrun:
        "h-8 w-8 rounded-full border border-[oklch(0.7_0.16_353.75)] bg-slate-950/82 text-[oklch(0.92_0.04_353.75)] shadow-[0_10px_28px_rgba(213,53,103,0.35)] hover:bg-slate-900/92",
      dark:
        "h-8 w-8 rounded-full border border-[oklch(0.7_0.16_353.75)] bg-slate-950/85 text-[oklch(0.92_0.04_353.75)] shadow-[0_10px_28px_rgba(159,18,57,0.45)] hover:bg-slate-900/92",
      light:
        "h-8 w-8 rounded-full border border-[oklch(0.7_0.16_353.75)] bg-slate-950/82 text-[oklch(0.92_0.04_353.75)] shadow-[0_10px_28px_rgba(159,18,57,0.35)] hover:bg-slate-900/92",
    }),
    conversationPanel: pickThemeValue(themeKind, {
      outrun:
        "mb-3 h-[55vh] overflow-hidden rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-slate-950/50 backdrop-blur-xl shadow-[0_24px_80px_rgba(213,53,103,0.22)]",
      dark:
        "mb-3 h-[55vh] overflow-hidden rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-slate-950/55 backdrop-blur-xl shadow-[0_24px_80px_rgba(76,5,25,0.55)]",
      light:
        "mb-3 h-[55vh] overflow-hidden rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-slate-950/50 backdrop-blur-xl shadow-[0_24px_80px_rgba(127,29,29,0.35)]",
    }),
    promptShellActive: pickThemeValue(themeKind, {
      outrun:
        "rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-transparent p-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(213,53,103,0.20)]",
      dark:
        "rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-transparent p-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(76,5,25,0.50)]",
      light:
        "rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-transparent p-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(127,29,29,0.30)]",
    }),
    promptShellInitial: pickThemeValue(themeKind, {
      outrun:
        "rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-transparent p-2 backdrop-blur-lg shadow-none",
      dark:
        "rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-transparent p-2 backdrop-blur-lg shadow-none",
      light:
        "rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-transparent p-2 backdrop-blur-lg shadow-none",
    }),
    placeholderText: pickThemeValue(themeKind, {
      outrun: "text-[oklch(0.92_0.04_353.75)]/85",
      dark: "text-[oklch(0.92_0.04_353.75)]/82",
      light: "text-[oklch(0.92_0.04_353.75)]/82",
    }),
    placeholderCaret: pickThemeValue(themeKind, {
      outrun: "bg-[oklch(0.88_0.05_353.75)]/80",
      dark: "bg-[oklch(0.88_0.05_353.75)]/75",
      light: "bg-[oklch(0.88_0.05_353.75)]/75",
    }),
    textarea: pickThemeValue(themeKind, {
      outrun:
        "min-h-12 border-transparent bg-transparent py-3 text-[oklch(0.95_0.03_353.75)] leading-6 placeholder:text-[oklch(0.84_0.06_353.75)]/55 focus:border-transparent focus-visible:border-transparent focus-visible:ring-0",
      dark:
        "min-h-12 border-transparent bg-transparent py-3 text-[oklch(0.95_0.03_353.75)] leading-6 placeholder:text-[oklch(0.84_0.06_353.75)]/55 focus:border-transparent focus-visible:border-transparent focus-visible:ring-0",
      light:
        "min-h-12 border-transparent bg-transparent py-3 text-[oklch(0.95_0.03_353.75)] leading-6 placeholder:text-[oklch(0.84_0.06_353.75)]/55 focus:border-transparent focus-visible:border-transparent focus-visible:ring-0",
    }),
    submit: pickThemeValue(themeKind, {
      outrun:
        "border-[oklch(0.7_0.16_353.75)] bg-[oklch(0.62_0.20_353.75)] text-white hover:bg-[oklch(0.66_0.22_353.75)]",
      dark:
        "border-[oklch(0.7_0.16_353.75)] bg-[oklch(0.62_0.20_353.75)] text-white hover:bg-[oklch(0.66_0.22_353.75)]",
      light:
        "border-[oklch(0.7_0.16_353.75)] bg-[oklch(0.62_0.20_353.75)] text-white hover:bg-[oklch(0.66_0.22_353.75)]",
    }),
    initialTextarea:
      "min-h-12 border-transparent bg-transparent py-3 text-[oklch(0.95_0.03_353.75)] leading-6 placeholder:text-[oklch(0.84_0.06_353.75)]/55 focus:border-transparent focus-visible:border-transparent focus-visible:ring-0",
    initialSubmit:
      "border-[oklch(0.7_0.16_353.75)] bg-slate-900/80 text-[oklch(0.92_0.04_353.75)] hover:bg-slate-900",
  }
}
