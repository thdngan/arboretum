let isReaderMode = false

const emitReaderModeChangeEvent = (mode: "on" | "off") => {
  const event: CustomEventMap["readermodechange"] = new CustomEvent("readermodechange", {
    detail: { mode },
  })
  document.dispatchEvent(event)
}

// on mobile the sidebars are faded out while reading and there is no hover to
// bring them back, so a tap anywhere peeks at them. purely presentational:
// the stylesheet only acts on this attribute below the mobile breakpoint.
const setPeek = (peek: boolean) => {
  document.documentElement.setAttribute("reader-peek", peek ? "on" : "off")
}

const isPeeking = () => document.documentElement.getAttribute("reader-peek") === "on"

// reader mode hides the bar the toggle lives in, so on the way out there is no
// visible change near the cursor to confirm the press. the toast says what
// happened. it hangs off <body> rather than the toggle: the toggle sits inside
// .sidebar.left, which is mid-fade at exactly this moment.
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
  // polite, so it is announced after whatever the toggle itself says
  toast.setAttribute("role", "status")
  toast.setAttribute("aria-live", "polite")
  toast.textContent = `Reader mode: ${mode.toUpperCase()}`
  document.body.appendChild(toast)

  // one frame in its start state first, or there is nothing to transition from
  requestAnimationFrame(() => toast.classList.add("visible"))

  toastTimers.push(
    setTimeout(() => {
      toast.classList.remove("visible")
      // on a timer rather than transitionend: under prefers-reduced-motion the
      // transition is off and the event would never arrive to remove the node
      toastTimers.push(setTimeout(() => toast.remove(), TOAST_FADE_MS))
    }, TOAST_VISIBLE_MS),
  )
}

document.addEventListener("nav", () => {
  const switchReaderMode = () => {
    isReaderMode = !isReaderMode
    const newMode = isReaderMode ? "on" : "off"
    document.documentElement.setAttribute("reader-mode", newMode)
    // entering reader mode should hide the sidebars, and leaving it makes the
    // peek moot — either way the next tap starts from a hidden state
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
    // the toggle owns the reader-mode state and already reset the peek above;
    // letting this handler run too would re-reveal what it just hid
    if (target?.closest(".readermode")) return

    // the table of contents is chrome of its own, reachable in reader mode
    // without peeking at the bar. Taps on its tab, panel or scrim are aimed at
    // it, so they should not drag the bar in or out on the way past.
    if (target?.closest(".toc-drawer")) return

    if (!isPeeking()) {
      setPeek(true)
    } else if (!target?.closest(".sidebar.left")) {
      // taps inside the revealed bar are aimed at its controls, so only a tap
      // back in the page hides it again. the right sidebar is page content on
      // mobile, so it counts as the page here.
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

  // a nav replaces <body>, so a toast still on screen would be orphaned mid-fade
  window.addCleanup(clearToast)

  // Set initial state
  document.documentElement.setAttribute("reader-mode", isReaderMode ? "on" : "off")
  setPeek(false)
})
