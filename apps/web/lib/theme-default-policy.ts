const THEME_STORAGE_KEY = "theme"

// Marks storage written by the current policy. The previous one persisted the low-end
// downgrade, so a single constrained visit disabled the enhanced theme permanently.
const POLICY_VERSION_KEY = "theme-policy"
const POLICY_VERSION = "2"

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

/**
 * Returns the theme to apply and persist on first visit, or null to leave storage
 * untouched and let the provider default ("system") stand for this visit only.
 */
export function resolveBootstrapTheme(): "outrun" | null {
  if (typeof window === "undefined") return null

  const storage = window.localStorage

  if (storage.getItem(POLICY_VERSION_KEY) !== POLICY_VERSION) {
    storage.setItem(POLICY_VERSION_KEY, POLICY_VERSION)
    // Discard values the old policy may have auto-written so they get re-evaluated.
    if (storage.getItem(THEME_STORAGE_KEY) === "system") {
      storage.removeItem(THEME_STORAGE_KEY)
    }
  }

  if (storage.getItem(THEME_STORAGE_KEY)) return null

  // Never persist the downgrade: a device that was only briefly constrained
  // (Data Saver, a flaky connection) should get the full theme on its next visit.
  return isLowEndDevice() ? null : "outrun"
}
