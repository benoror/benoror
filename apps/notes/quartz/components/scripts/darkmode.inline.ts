type Theme = "light" | "dark"
type ThemeVariant = "default" | "outrun"

type ThemeState = {
  theme: Theme
  variant: ThemeVariant
}

const THEME_STATES: ThemeState[] = [
  { theme: "light", variant: "default" },
  { theme: "dark", variant: "default" },
  { theme: "dark", variant: "outrun" },
]

const userPref: Theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"

const normalizeTheme = (value: string | null): Theme =>
  value === "light" || value === "dark" ? value : userPref

const normalizeThemeVariant = (value: string | null): ThemeVariant =>
  value === "outrun" ? "outrun" : "default"

const normalizeThemeState = (theme: string | null, variant: string | null): ThemeState => {
  // Backward compatibility with the old persisted value.
  if (theme === "outrun") {
    return { theme: "dark", variant: "outrun" }
  }

  const normalizedTheme = normalizeTheme(theme)
  const normalizedVariant = normalizedTheme === "dark" ? normalizeThemeVariant(variant) : "default"
  return { theme: normalizedTheme, variant: normalizedVariant }
}

const applyThemeState = (state: ThemeState) => {
  document.documentElement.setAttribute("saved-theme", state.theme)

  if (state.variant === "outrun") {
    document.documentElement.setAttribute("data-theme-variant", "outrun")
  } else {
    document.documentElement.removeAttribute("data-theme-variant")
  }

  localStorage.setItem("theme", state.theme)
  localStorage.setItem("theme-variant", state.variant)
}

const currentThemeState = normalizeThemeState(
  localStorage.getItem("theme"),
  localStorage.getItem("theme-variant"),
)
applyThemeState(currentThemeState)

const emitThemeChangeEvent = (theme: Theme) => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const switchTheme = () => {
    const activeState = normalizeThemeState(
      document.documentElement.getAttribute("saved-theme"),
      document.documentElement.getAttribute("data-theme-variant"),
    )
    const activeStateIndex = THEME_STATES.findIndex(
      (state) => state.theme === activeState.theme && state.variant === activeState.variant,
    )
    const nextState = THEME_STATES[(activeStateIndex + 1) % THEME_STATES.length]
    applyThemeState(nextState)
    emitThemeChangeEvent(nextState.theme)
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const activeState = normalizeThemeState(
      localStorage.getItem("theme"),
      localStorage.getItem("theme-variant"),
    )
    // Preserve explicit "outrun" user preference even if OS theme changes.
    if (activeState.variant === "outrun") {
      return
    }

    const nextState: ThemeState = { theme: e.matches ? "dark" : "light", variant: "default" }
    applyThemeState(nextState)
    emitThemeChangeEvent(nextState.theme)
  }

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", switchTheme)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme))
  }

  // Listen for changes in prefers-color-scheme
  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  window.addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})
