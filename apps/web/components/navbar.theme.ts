import type { AppThemeKind } from "@/hooks/use-app-theme"
import { pickBlueThemeValue, pickThemeValue } from "@/lib/theme-styles"

export function getClasses(themeKind: AppThemeKind) {
  return {
    header: (isScrolled: boolean) => isScrolled
      ? pickThemeValue(themeKind, {
        outrun: "bg-black/70 backdrop-blur-md shadow-sm py-2 border-b border-sky-500/20",
        dark: "bg-slate-950/80 backdrop-blur-md shadow-sm py-2 border-b border-sky-900/40",
        light: "bg-white/85 backdrop-blur-md shadow-sm py-2 border-b border-sky-200/80",
      })
      : "bg-transparent py-4",
    text: pickBlueThemeValue(themeKind, "text-sky-100 hover:text-white", "text-sky-800 hover:text-sky-900"),
    menuOverlay: pickBlueThemeValue(themeKind, "bg-slate-950/95 backdrop-blur-md", "bg-white/95 backdrop-blur-md"),
    menuIcon: pickBlueThemeValue(themeKind, "text-sky-100", "text-sky-800"),
  }
}
