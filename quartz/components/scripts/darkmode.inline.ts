// light is the default: the OS colour scheme is deliberately ignored, so the
// only thing that changes the theme is an explicit choice made with the toggle
const currentTheme = localStorage.getItem("theme") ?? "light"
document.documentElement.setAttribute("saved-theme", currentTheme)

const syncToggleState = () => {
  const isDark = document.documentElement.getAttribute("saved-theme") === "dark"
  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.setAttribute("aria-checked", isDark.toString())
  }
}

const emitThemeChangeEvent = (theme: "light" | "dark") => {
  const event: CustomEventMap["themechange"] = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}

document.addEventListener("nav", () => {
  const switchTheme = () => {
    const newTheme =
      document.documentElement.getAttribute("saved-theme") === "dark" ? "light" : "dark"
    document.documentElement.setAttribute("saved-theme", newTheme)
    localStorage.setItem("theme", newTheme)
    syncToggleState()
    emitThemeChangeEvent(newTheme)
  }

  syncToggleState()

  for (const darkmodeButton of document.getElementsByClassName("darkmode")) {
    darkmodeButton.addEventListener("click", switchTheme)
    window.addCleanup(() => darkmodeButton.removeEventListener("click", switchTheme))
  }
})