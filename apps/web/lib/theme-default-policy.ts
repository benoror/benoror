export const THEME_STORAGE_KEY = "theme"

function isLowEndDevice(): boolean {
  if (typeof window === "undefined") return false

  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean; effectiveType?: string }
  }

  const deviceMemory = nav.deviceMemory
  const cores = nav.hardwareConcurrency ?? 8
  const saveData = Boolean(nav.connection?.saveData)
  const effectiveType = nav.connection?.effectiveType ?? ""
  const verySlowConnection = ["slow-2g", "2g"].includes(effectiveType)
  const lowMemory = typeof deviceMemory === "number" && deviceMemory <= 2
  const lowCpuAndMemory = typeof deviceMemory === "number" && deviceMemory <= 4 && cores <= 2

  // Keep "system" fallback for truly constrained devices only.
  return saveData || verySlowConnection || lowMemory || lowCpuAndMemory
}

export function getInitialThemePreference(): "system" | "outrun" {
  return isLowEndDevice() ? "system" : "outrun"
}
