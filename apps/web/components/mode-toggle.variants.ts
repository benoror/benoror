import { cva } from "class-variance-authority"

const modeToggleTriggerVariants = cva("rounded-full cursor-pointer", {
  variants: {
    tone: {
      blueDark: "text-sky-100",
      light: "text-sky-700",
    },
  },
})

export function getModeToggleTriggerClass(isBlueDark: boolean): string {
  return modeToggleTriggerVariants({ tone: isBlueDark ? "blueDark" : "light" })
}
