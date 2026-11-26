import type { AppThemeKind } from "@/hooks/use-app-theme";
import {
  isOutrunTheme,
  pickBlueThemeValue,
  pickThemeValue,
} from "@/lib/theme-styles";
import { getGlassPanelClass } from "@/lib/theme/tokens";

export function getClasses(themeKind: AppThemeKind) {
  return {
    showOutrunGrid: isOutrunTheme(themeKind),
    page: pickThemeValue(themeKind, {
      outrun: "",
      dark: "bg-gradient-to-b from-slate-950 via-sky-950/20 to-slate-950",
      light: "bg-gradient-to-b from-white via-sky-50 to-blue-50",
    }),
    panel: getGlassPanelClass(themeKind, "regular"),
    heading: pickBlueThemeValue(themeKind, "text-sky-100", "text-sky-950"),
    headingAccent: pickThemeValue(themeKind, {
      outrun: "drop-shadow-[0_0_22px_rgba(34,211,238,0.35)]",
      dark: "",
      light: "",
    }),
    body: pickBlueThemeValue(themeKind, "text-sky-200/90", "text-sky-800"),
    meta: pickBlueThemeValue(themeKind, "text-sky-300/80", "text-sky-700"),
    link: pickBlueThemeValue(
      themeKind,
      "text-sky-100 hover:text-white",
      "text-sky-800 hover:text-sky-950",
    ),
    linkFocus: pickThemeValue(themeKind, {
      outrun: "focus-visible:ring-cyan-300/60",
      dark: "focus-visible:ring-sky-300/60",
      light: "focus-visible:ring-sky-500/50",
    }),
    card: pickThemeValue(themeKind, {
      outrun: "border-cyan-400/25 bg-cyan-950/20",
      dark: "border-sky-600/25 bg-sky-950/20",
      light: "border-sky-200/80 bg-white/80",
    }),
    chip: pickThemeValue(themeKind, {
      outrun:
        "border-cyan-400/30 bg-cyan-950/30 text-cyan-100 hover:border-cyan-300/60 hover:bg-cyan-900/40",
      dark: "border-sky-500/30 bg-sky-950/30 text-sky-100 hover:border-sky-300/60 hover:bg-sky-900/40",
      light:
        "border-sky-200 bg-white/90 text-sky-800 hover:border-sky-400 hover:bg-sky-50",
    }),
    coverRing: pickThemeValue(themeKind, {
      outrun: "ring-cyan-300/30 shadow-[0_24px_70px_rgba(8,145,178,0.28)]",
      dark: "ring-sky-500/30 shadow-[0_24px_70px_rgba(2,132,199,0.18)]",
      light: "ring-sky-200 shadow-[0_24px_70px_rgba(15,23,42,0.18)]",
    }),
  };
}
