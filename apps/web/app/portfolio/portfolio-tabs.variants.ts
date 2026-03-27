import { cva } from "class-variance-authority"
import type { AppThemeKind } from "@/hooks/use-app-theme"
import { isBlueDarkTheme } from "@/lib/theme-styles"

type Tone = "blueDark" | "light"

const tabTriggerVariants = cva(
  "px-4 md:px-6 py-3 text-sm md:text-lg font-medium transition-colors relative whitespace-nowrap cursor-pointer border border-transparent",
  {
    variants: {
      tone: {
        blueDark: "",
        light: "",
      },
      state: {
        active: "",
        inactive: "",
      },
    },
    compoundVariants: [
      {
        tone: "blueDark",
        state: "active",
        className:
          "text-sky-100 rounded-t-xl rounded-b-none border border-cyan-400/35 bg-slate-950/70 backdrop-blur-md shadow-[0_8px_24px_rgba(34,211,238,0.16)]",
      },
      {
        tone: "light",
        state: "active",
        className:
          "text-sky-800 rounded-t-xl rounded-b-none border border-sky-300 bg-white/85 shadow-sm",
      },
      {
        tone: "blueDark",
        state: "inactive",
        className: "text-sky-400 hover:text-sky-200",
      },
      {
        tone: "light",
        state: "inactive",
        className: "text-sky-500 hover:text-sky-700",
      },
    ],
  },
)

const tabCountVariants = cva("ml-2 text-xs md:text-sm px-1.5 py-0.5 rounded-full", {
  variants: {
    tone: {
      blueDark: "bg-sky-800/60",
      light: "bg-sky-100 text-sky-700",
    },
  },
})

const tabIndicatorVariants = cva("absolute bottom-0 left-0 right-0 h-0.5", {
  variants: {
    tone: {
      blueDark: "bg-sky-500",
      light: "bg-sky-600",
    },
  },
})

function getTabTone(themeKind: AppThemeKind): Tone {
  return isBlueDarkTheme(themeKind) ? "blueDark" : "light"
}

export function getClasses(themeKind: AppThemeKind) {
  return {
    tab: (isActive: boolean) => tabTriggerVariants({ tone: getTabTone(themeKind), state: isActive ? "active" : "inactive" }),
    tabCount: tabCountVariants({ tone: getTabTone(themeKind) }),
    tabIndicator: tabIndicatorVariants({ tone: getTabTone(themeKind) }),
  }
}
