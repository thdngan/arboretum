let isReaderMode = false

const emitReaderModeChangeEvent = (mode: "on" | "off") => {
  const event: CustomEventMap["readermodechange"] = new CustomEvent("readermodechange", {
    detail: { mode },
  })
  document.dispatchEvent(event)
}

const setPeek = (peek: boolean) => {
  document.documentElement.setAttribute("reader-peek", peek ? "on" : "off")
}

const isPeeking = () => document.documentElement.getAttribute("reader-peek") === "on"

const TOAST_ID = "readermode-toast"
const TOAST_VISIBLE_MS = 1400
const TOAST_FADE_MS = 300
let toastTimers: ReturnType<typeof setTimeout>[] = []

const clearToast = () => {
  toastTimers.forEach(clearTimeout)
  toastTimers = []
  document.getElementById(TOAST_ID)?.remove()
}

const showToast = (mode: "on" | "off") => {
  clearToast()

  const toast = document.createElement("div")
  toast.id = TOAST_ID
  toast.className = "readermode-toast"
  toast.setAttribute("role", "status")
  toast.setAttribute("aria-live", "polite")
  toast.textContent = `Reader mode: ${mode.toUpperCase()}`
  document.body.appendChild(toast)

  requestAnimationFrame(() => toast.classList.add("visible"))

  toastTimers.push(
    setTimeout(() => {
      toast.classList.remove("visible")
      toastTimers.push(setTimeout(() => toast.remove(), TOAST_FADE_MS))
    }, TOAST_VISIBLE_MS),
  )
}

document.addEventListener("nav", () => {
  const switchReaderMode = () => {
    isReaderMode = !isReaderMode
    const newMode = isReaderMode ? "on" : "off"
    document.documentElement.setAttribute("reader-mode", newMode)
    setPeek(false)
    for (const button of document.getElementsByClassName("readermode")) {
      button.setAttribute("aria-pressed", String(isReaderMode))
    }
    showToast(newMode)
    emitReaderModeChangeEvent(newMode)
  }

  const togglePeek = (e: Event) => {
    if (!isReaderMode) return

    const target = e.target instanceof Element ? e.target : null
    if (target?.closest(".readermode")) return

    if (target?.closest(".toc-drawer")) return

    if (!isPeeking()) {
      setPeek(true)
    } else if (!target?.closest(".sidebar.left")) {
      setPeek(false)
    }
  }

  for (const readerModeButton of document.getElementsByClassName("readermode")) {
    readerModeButton.setAttribute("aria-pressed", String(isReaderMode))
    readerModeButton.addEventListener("click", switchReaderMode)
    window.addCleanup(() => readerModeButton.removeEventListener("click", switchReaderMode))
  }

  document.addEventListener("click", togglePeek)
  window.addCleanup(() => document.removeEventListener("click", togglePeek))

  window.addCleanup(clearToast)

  // Set initial state
  document.documentElement.setAttribute("reader-mode", isReaderMode ? "on" : "off")
  setPeek(false)
})
