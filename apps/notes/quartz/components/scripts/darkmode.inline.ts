type Theme = "light" | "dark"

const userPref: Theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
const addCleanup = (cleanup: () => void) =>
  (window as unknown as Window & { addCleanup: (cleanup: () => void) => void }).addCleanup(cleanup)

const normalizeTheme = (value: string | null): Theme =>
  value === "light" || value === "dark" ? value : userPref

const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute("saved-theme", theme)
  localStorage.setItem("theme", theme)
}

applyTheme(normalizeTheme(localStorage.getItem("theme")))

const emitThemeChangeEvent = (theme: Theme) => {
  const event = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const switchTheme = () => {
    const activeTheme = normalizeTheme(document.documentElement.getAttribute("saved-theme"))
    const nextTheme = activeTheme === "light" ? "dark" : "light"
    applyTheme(nextTheme)
    emitThemeChangeEvent(nextTheme)
  }

  const themeChange = (e: MediaQueryListEvent) => {
    const nextTheme: Theme = e.matches ? "dark" : "light"
    applyTheme(nextTheme)
    emitThemeChangeEvent(nextTheme)
  }

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", switchTheme)
    addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme))
  }

  const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
  colorSchemeMediaQuery.addEventListener("change", themeChange)
  addCleanup(() => colorSchemeMediaQuery.removeEventListener("change", themeChange))
})
