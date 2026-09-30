const BLUR_CLASS = "content-blurred"

type Seat = { node: HTMLElement; placeholder: Comment }

interface OverlayLock {
  open: Seat[]
  held: boolean
  wheel: (e: Event) => void
  keys: (e: Event) => void
}

const LOCK_KEY = "__quartzOverlayLock" as const

const SCROLL_KEYS = new Set([
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  " ",
  "Spacebar",
])

function lock(): OverlayLock {
  const w = window as unknown as Record<string, OverlayLock | undefined>
  const existing = w[LOCK_KEY]
  if (existing) return existing

  const state = { open: [], held: false } as unknown as OverlayLock

  const aimedAtOverlay = (target: EventTarget | null): boolean =>
    target instanceof Node && state.open.some((seat) => seat.node.contains(target))

  state.wheel = (e: Event) => {
    if (state.open.length === 0) return
    if (aimedAtOverlay(e.target)) return
    e.preventDefault()
  }

  state.keys = (e: Event) => {
    if (state.open.length === 0) return
    if (!SCROLL_KEYS.has((e as KeyboardEvent).key)) return
    if (aimedAtOverlay(e.target)) return
    e.preventDefault()
  }

  w[LOCK_KEY] = state
  return state
}

function root(): HTMLElement | null {
  return document.getElementById("quartz-root")
}

function holdPage(on: boolean) {
  const state = lock()
  if (state.held === on) return
  state.held = on
  if (on) {
    window.addEventListener("wheel", state.wheel, { passive: false })
    window.addEventListener("touchmove", state.wheel, { passive: false })
    window.addEventListener("keydown", state.keys)
  } else {
    window.removeEventListener("wheel", state.wheel)
    window.removeEventListener("touchmove", state.wheel)
    window.removeEventListener("keydown", state.keys)
  }
}

export function openOverlay(node: HTMLElement | null | undefined) {
  if (!node) return
  const state = lock()
  if (state.open.some((s) => s.node === node)) return

  const placeholder = document.createComment("overlay-seat")
  const r = root()
  if (r && r.contains(node)) {
    node.parentNode?.insertBefore(placeholder, node)
    document.body.appendChild(node)
  }
  state.open.push({ node, placeholder })
  document.documentElement.classList.add(BLUR_CLASS)
  holdPage(true)
}

export function closeOverlay(node: HTMLElement | null | undefined) {
  if (!node) return
  const state = lock()
  const i = state.open.findIndex((s) => s.node === node)
  if (i === -1) return
  const seat = state.open[i]
  state.open.splice(i, 1)

  if (state.open.length === 0) {
    document.documentElement.classList.remove(BLUR_CLASS)
    holdPage(false)
  }

  if (seat.placeholder.parentNode) {
    seat.placeholder.parentNode.insertBefore(seat.node, seat.placeholder)
    seat.placeholder.remove()
  } else if (seat.node.parentNode === document.body) {
    seat.node.remove()
  }
}

export function releaseAllOverlays() {
  const state = lock()
  for (const seat of [...state.open]) closeOverlay(seat.node)
  state.open.length = 0
  document.documentElement.classList.remove(BLUR_CLASS)
  holdPage(false)
}
