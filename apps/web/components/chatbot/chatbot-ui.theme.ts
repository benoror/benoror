import type { AppThemeKind } from "@/hooks/use-app-theme"
import { pickThemeValue } from "@/lib/theme-styles"

export function getClasses(themeKind: AppThemeKind) {
  const darkText = "!text-[#e7ffff]"
  const darkTextSoft = "!text-[#e7ffff]/80"
  const darkTextPlaceholder = "!text-[#e7ffff]/55"
  const darkCursor = "text-[#e7ffff]"
  const tabBase = "h-7 min-w-14 rounded-b-none rounded-t-md !border !border-b-0 px-3"
  const panelBase = "mb-3 h-[55vh] overflow-hidden rounded-2xl border backdrop-blur-xl"
  const promptShellActiveBase = "rounded-2xl border p-3 backdrop-blur-xl"
  const promptShellInitialBase = "rounded-2xl border p-2 backdrop-blur-lg shadow-none"

  const minimizeButtonByTheme = {
    outrun:
      `${tabBase} !border-[oklch(0.7_0.16_353.75)] !bg-slate-950/88 !text-[oklch(0.95_0.03_353.75)] shadow-[0_8px_22px_rgba(213,53,103,0.30)] backdrop-blur-md hover:!bg-slate-900/94`,
    dark:
      `${tabBase} !border-cyan-300/40 !bg-[#020617] !text-[#e7ffff] shadow-[0_8px_22px_rgba(8,145,178,0.24)] hover:!bg-[#01040f]`,
    light:
      `${tabBase} !border-sky-300/80 !bg-white/94 !text-sky-700 shadow-[0_8px_22px_rgba(15,23,42,0.10)] backdrop-blur-md hover:!bg-white`,
  } satisfies Record<AppThemeKind, string>

  const conversationPanelByTheme = {
    outrun:
      `${panelBase} border-[oklch(0.7_0.16_353.75)] bg-slate-950/76 shadow-[0_24px_80px_rgba(213,53,103,0.26)]`,
    dark:
      `${panelBase} border-cyan-300/35 bg-transparent shadow-[0_24px_80px_rgba(8,145,178,0.22)]`,
    light:
      `${panelBase} border-sky-300/70 bg-transparent shadow-[0_24px_80px_rgba(15,23,42,0.08)]`,
  } satisfies Record<AppThemeKind, string>

  const promptShellActiveByTheme = {
    outrun:
      `${promptShellActiveBase} border-[oklch(0.7_0.16_353.75)] bg-slate-950/72 shadow-[0_18px_50px_rgba(213,53,103,0.24)]`,
    dark:
      `${promptShellActiveBase} border-cyan-300/35 bg-transparent shadow-[0_18px_50px_rgba(8,145,178,0.20)]`,
    light:
      `${promptShellActiveBase} border-sky-300/70 bg-transparent shadow-[0_18px_50px_rgba(15,23,42,0.08)]`,
  } satisfies Record<AppThemeKind, string>

  const promptShellInitialByTheme = {
    outrun: `${promptShellInitialBase} border-[oklch(0.7_0.16_353.75)] bg-slate-950/68`,
    dark: `${promptShellInitialBase} border-cyan-300/35 bg-transparent`,
    light: `${promptShellInitialBase} border-sky-300/70 bg-transparent`,
  } satisfies Record<AppThemeKind, string>

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
  const streamCaretByTheme = {
    outrun: "text-[#ffe3ef]",
    dark: darkCursor,
    light: "text-sky-700",
  } satisfies Record<AppThemeKind, string>
  const placeholderTextByTheme = {
    outrun: "!text-[oklch(0.95_0.03_353.75)]",
    dark: "!text-[#e7ffff]/90",
    light: "!text-sky-700/75",
  } satisfies Record<AppThemeKind, string>
  const promptGlyphByTheme = {
    outrun: "text-[oklch(0.78_0.12_222)]",
    dark: darkCursor,
    light: "text-sky-700",
  } satisfies Record<AppThemeKind, string>
  const scanlineOverlayByTheme = {
    outrun:
      "pointer-events-none absolute inset-0 z-0 opacity-[0.08] [background-image:repeating-linear-gradient(to_bottom,rgba(236,72,153,0.28)_0px,rgba(236,72,153,0.28)_1px,transparent_2px,transparent_4px)] [background-size:100%_4px]",
    dark:
      "pointer-events-none absolute inset-0 z-0 opacity-[0.08] [background-image:repeating-linear-gradient(to_bottom,rgba(34,211,238,0.30)_0px,rgba(34,211,238,0.30)_1px,transparent_2px,transparent_4px)] [background-size:100%_4px]",
    light:
      "pointer-events-none absolute inset-0 z-0 opacity-[0.05] [background-image:repeating-linear-gradient(to_bottom,rgba(14,116,144,0.18)_0px,rgba(14,116,144,0.18)_1px,transparent_2px,transparent_4px)] [background-size:100%_4px]",
  } satisfies Record<AppThemeKind, string>
  const noiseOverlayByTheme = {
    outrun:
      "pointer-events-none absolute inset-0 z-0 opacity-[0.035] [background-image:radial-gradient(rgba(244,114,182,0.75)_0.5px,transparent_0.5px)] [background-size:3px_3px]",
    dark:
      "pointer-events-none absolute inset-0 z-0 opacity-[0.035] [background-image:radial-gradient(rgba(34,211,238,0.75)_0.5px,transparent_0.5px)] [background-size:3px_3px]",
    light:
      "pointer-events-none absolute inset-0 z-0 opacity-[0.03] [background-image:radial-gradient(rgba(2,132,199,0.5)_0.5px,transparent_0.5px)] [background-size:3px_3px]",
  } satisfies Record<AppThemeKind, string>

  return {
    minimizeButton: pickThemeValue(themeKind, minimizeButtonByTheme),
    conversationPanel: pickThemeValue(themeKind, conversationPanelByTheme),
    promptShellActive: pickThemeValue(themeKind, promptShellActiveByTheme),
    promptShellInitial: pickThemeValue(themeKind, promptShellInitialByTheme),
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
    streamCaret: pickThemeValue(themeKind, streamCaretByTheme),
    placeholderText: pickThemeValue(themeKind, placeholderTextByTheme),
    placeholderCaret: pickThemeValue(themeKind, streamCaretByTheme),
    promptGlyph: pickThemeValue(themeKind, promptGlyphByTheme),
    textarea: pickThemeValue(themeKind, textareaByTheme),
    submit: pickThemeValue(themeKind, submitByTheme),
    initialTextarea: pickThemeValue(themeKind, initialTextareaByTheme),
    initialSubmit: pickThemeValue(themeKind, submitByTheme),
    scanlineOverlay: pickThemeValue(themeKind, scanlineOverlayByTheme),
    noiseOverlay: pickThemeValue(themeKind, noiseOverlayByTheme),
  }
}
