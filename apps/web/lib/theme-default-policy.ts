export const THEME_STORAGE_KEY = "theme"

function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false

  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean; effectiveType?: string }
  }

  const deviceMemory = nav.deviceMemory ?? Number.POSITIVE_INFINITY
  const cores = nav.hardwareConcurrency ?? 8
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const saveData = Boolean(nav.connection?.saveData)
  const effectiveType = nav.connection?.effectiveType ?? ""
  const slowConnection = ["slow-2g", "2g", "3g"].includes(effectiveType)

  return deviceMemory <= 4 || cores <= 4 || reducedMotion || saveData || slowConnection
}

export function getInitialThemePreference(): "system" | "outrun" {
  return isLowEndDevice() ? "system" : "outrun"
}
