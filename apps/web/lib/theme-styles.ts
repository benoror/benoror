import type { AppThemeKind } from "@/hooks/use-app-theme"

export function pickThemeValue<T>(themeKind: AppThemeKind, values: Record<AppThemeKind, T>): T {
  return values[themeKind]
}

export function pickBlueValue<T>(isBlueDark: boolean, blueDarkValue: T, lightValue: T): T {
  return isBlueDark ? blueDarkValue : lightValue
}
