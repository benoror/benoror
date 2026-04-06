import type { AppThemeKind } from "@/hooks/use-app-theme"
import { pickThemeValue } from "@/lib/theme-styles"

export function getClasses(themeKind: AppThemeKind) {
  const darkText = "!text-[#e7ffff]"
  const darkTextSoft = "!text-[#e7ffff]/80"
  const darkTextPlaceholder = "!text-[#e7ffff]/55"
  const darkCursor = "text-[#e7ffff]"
  const textareaByTheme = {
    outrun:
      "!min-h-11 border-transparent !bg-transparent dark:!bg-transparent !pb-2 !pt-3 pl-10 !text-[oklch(0.95_0.03_353.75)] caret-[oklch(0.95_0.03_353.75)] [caret-shape:block] !font-mono text-sm !leading-5 placeholder:!text-[oklch(0.95_0.03_353.75)]/65 focus:border-transparent focus-visible:border-transparent focus-visible:ring-0",
    dark:
      `!min-h-11 border-transparent !bg-transparent dark:!bg-transparent !pb-2 !pt-3 pl-10 ${darkText} caret-[#e7ffff] [caret-shape:block] !font-mono text-sm !leading-5 placeholder:${darkTextPlaceholder} focus:border-transparent focus-visible:border-transparent focus-visible:ring-0`,
    light:
      "!min-h-11 border-transparent !bg-transparent dark:!bg-transparent !pb-2 !pt-3 pl-10 !text-sky-700 caret-sky-700 [caret-shape:block] !font-mono text-sm !leading-5 placeholder:!text-sky-700/45 focus:border-transparent focus-visible:border-transparent focus-visible:ring-0",
  } satisfies Record<AppThemeKind, string>
  const initialTextareaByTheme = {
    ...textareaByTheme,
    // Keep current initial outrun tone unchanged.
    outrun:
      "!min-h-11 border-transparent !bg-transparent dark:!bg-transparent !pb-2 !pt-3 pl-10 !text-[#ffe3ef] caret-[#ffe3ef] [caret-shape:block] !font-mono text-sm !leading-5 placeholder:!text-[#ffe3ef]/65 focus:border-transparent focus-visible:border-transparent focus-visible:ring-0",
  } satisfies Record<AppThemeKind, string>
  const submitByTheme = {
    outrun:
      "border-[oklch(0.78_0.12_222)] bg-[oklch(0.78_0.12_222)] font-mono text-slate-950 hover:bg-[oklch(0.78_0.12_222)]/90",
    dark:
      "border-cyan-300 bg-cyan-300 font-mono text-slate-950 hover:bg-cyan-200",
    light:
      "border-sky-500 bg-sky-500 font-mono text-white hover:bg-sky-600",
  } satisfies Record<AppThemeKind, string>

  return {
    minimizeButton: pickThemeValue(themeKind, {
      outrun:
        "h-7 min-w-14 rounded-b-none rounded-t-md !border !border-b-0 !border-[oklch(0.7_0.16_353.75)] !bg-slate-950/88 px-3 !text-[oklch(0.95_0.03_353.75)] shadow-[0_8px_22px_rgba(213,53,103,0.30)] backdrop-blur-md hover:!bg-slate-900/94",
      dark:
        "h-7 min-w-14 rounded-b-none rounded-t-md !border !border-b-0 !border-cyan-300/40 !bg-[#020617] px-3 !text-[#e7ffff] shadow-[0_8px_22px_rgba(8,145,178,0.24)] hover:!bg-[#01040f]",
      light:
        "h-7 min-w-14 rounded-b-none rounded-t-md !border !border-b-0 !border-sky-300/80 !bg-white/94 px-3 !text-sky-700 shadow-[0_8px_22px_rgba(15,23,42,0.10)] backdrop-blur-md hover:!bg-white",
    }),
    conversationPanel: pickThemeValue(themeKind, {
      outrun:
        "mb-3 h-[55vh] overflow-hidden rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-slate-950/76 backdrop-blur-xl shadow-[0_24px_80px_rgba(213,53,103,0.26)]",
      dark:
        "mb-3 h-[55vh] overflow-hidden rounded-2xl border border-cyan-300/35 bg-transparent backdrop-blur-xl shadow-[0_24px_80px_rgba(8,145,178,0.22)]",
      light:
        "mb-3 h-[55vh] overflow-hidden rounded-2xl border border-sky-300/70 bg-transparent backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.08)]",
    }),
    promptShellActive: pickThemeValue(themeKind, {
      outrun:
        "rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-slate-950/72 p-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(213,53,103,0.24)]",
      dark:
        "rounded-2xl border border-cyan-300/35 bg-transparent p-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(8,145,178,0.20)]",
      light:
        "rounded-2xl border border-sky-300/70 bg-transparent p-3 backdrop-blur-xl shadow-[0_18px_50px_rgba(15,23,42,0.08)]",
    }),
    promptShellInitial: pickThemeValue(themeKind, {
      outrun:
        "rounded-2xl border border-[oklch(0.7_0.16_353.75)] bg-slate-950/68 p-2 backdrop-blur-lg shadow-none",
      dark:
        "rounded-2xl border border-cyan-300/35 bg-transparent p-2 backdrop-blur-lg shadow-none",
      light:
        "rounded-2xl border border-sky-300/70 bg-transparent p-2 backdrop-blur-lg shadow-none",
    }),
    conversationText: pickThemeValue(themeKind, {
      outrun: "!text-[oklch(0.95_0.03_353.75)]",
      dark: darkText,
      light: "!text-sky-700",
    }),
    emptyStateText: pickThemeValue(themeKind, {
      outrun:
        "[&_h3]:!text-[oklch(0.95_0.03_353.75)] [&_p]:!text-[oklch(0.95_0.03_353.75)]/82",
      dark: `[&_h3]:${darkText} [&_p]:${darkTextSoft}`,
      light: "[&_h3]:!text-sky-800 [&_p]:!text-sky-700/80",
    }),
    userMessage: pickThemeValue(themeKind, {
      outrun:
        "group-[.is-user]:ml-0 group-[.is-user]:w-full group-[.is-user]:rounded-none group-[.is-user]:border group-[.is-user]:border-[#ffe3ef] group-[.is-user]:bg-transparent group-[.is-user]:px-3 group-[.is-user]:py-2.5 group-[.is-user]:!text-[#ffe3ef]",
      dark:
        `group-[.is-user]:ml-0 group-[.is-user]:w-full group-[.is-user]:rounded-none group-[.is-user]:border group-[.is-user]:border-[#e7ffff] group-[.is-user]:bg-transparent group-[.is-user]:px-3 group-[.is-user]:py-2.5 group-[.is-user]:${darkText}`,
      light:
        "group-[.is-user]:ml-0 group-[.is-user]:w-full group-[.is-user]:rounded-none group-[.is-user]:border group-[.is-user]:border-sky-300/90 group-[.is-user]:bg-transparent group-[.is-user]:px-3 group-[.is-user]:py-2.5 group-[.is-user]:!text-sky-700",
    }),
    streamCaret: pickThemeValue(themeKind, {
      outrun: "text-[#ffe3ef]",
      dark: darkCursor,
      light: "text-sky-700",
    }),
    placeholderText: pickThemeValue(themeKind, {
      outrun: "!text-[oklch(0.95_0.03_353.75)]",
      dark: "!text-[#e7ffff]/90",
      light: "!text-sky-700/75",
    }),
    placeholderCaret: pickThemeValue(themeKind, {
      outrun: "text-[#ffe3ef]",
      dark: darkCursor,
      light: "text-sky-700",
    }),
    promptGlyph: pickThemeValue(themeKind, {
      outrun: "text-[oklch(0.78_0.12_222)]",
      dark: darkCursor,
      light: "text-sky-700",
    }),
    textarea: pickThemeValue(themeKind, textareaByTheme),
    submit: pickThemeValue(themeKind, submitByTheme),
    initialTextarea: pickThemeValue(themeKind, initialTextareaByTheme),
    initialSubmit: pickThemeValue(themeKind, submitByTheme),
    scanlineOverlay: pickThemeValue(themeKind, {
      outrun:
        "pointer-events-none absolute inset-0 z-0 opacity-[0.08] [background-image:repeating-linear-gradient(to_bottom,rgba(236,72,153,0.28)_0px,rgba(236,72,153,0.28)_1px,transparent_2px,transparent_4px)] [background-size:100%_4px]",
      dark:
        "pointer-events-none absolute inset-0 z-0 opacity-[0.08] [background-image:repeating-linear-gradient(to_bottom,rgba(34,211,238,0.30)_0px,rgba(34,211,238,0.30)_1px,transparent_2px,transparent_4px)] [background-size:100%_4px]",
      light:
        "pointer-events-none absolute inset-0 z-0 opacity-[0.05] [background-image:repeating-linear-gradient(to_bottom,rgba(14,116,144,0.18)_0px,rgba(14,116,144,0.18)_1px,transparent_2px,transparent_4px)] [background-size:100%_4px]",
    }),
    noiseOverlay: pickThemeValue(themeKind, {
      outrun:
        "pointer-events-none absolute inset-0 z-0 opacity-[0.035] [background-image:radial-gradient(rgba(244,114,182,0.75)_0.5px,transparent_0.5px)] [background-size:3px_3px]",
      dark:
        "pointer-events-none absolute inset-0 z-0 opacity-[0.035] [background-image:radial-gradient(rgba(34,211,238,0.75)_0.5px,transparent_0.5px)] [background-size:3px_3px]",
      light:
        "pointer-events-none absolute inset-0 z-0 opacity-[0.03] [background-image:radial-gradient(rgba(2,132,199,0.5)_0.5px,transparent_0.5px)] [background-size:3px_3px]",
    }),
  }
}
