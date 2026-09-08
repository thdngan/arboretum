// giscus bakes the theme into the widget URL and only accepts live theme
// changes over postMessage once the frame is actually running. The frame is
// created with loading="lazy", so a toggle can easily land while it is still
// unloaded, and a message sent then goes nowhere. Until the frame's load event
// we rewrite the theme it is going to load with; after it we message as usual.
let giscusFrameLoaded = false
let giscusScriptEl: HTMLScriptElement | null = null

// both signals have to agree the frame is up: our own load listener, and the
// loading class giscus' client.js drops on load. If either one ever goes quiet
// we fall back to reloading the frame with the right theme - a flash, rather
// than a message into a frame that is not listening and a stale theme
const isFrameLive = (iframe: HTMLIFrameElement) =>
  giscusFrameLoaded && !iframe.classList.contains("giscus-frame--loading")

const setGiscusTheme = (theme: string) => {
  const themeUrl = getThemeUrl(getThemeName(theme))
  const iframe = document.querySelector("iframe.giscus-frame") as HTMLIFrameElement | null

  // giscus' client.js has not run yet - it reads the theme off our script tag
  if (!iframe) {
    giscusScriptEl?.setAttribute("data-theme", themeUrl)
    return
  }

  // the frame is still pending, so put the theme in the URL it will load
  if (!isFrameLive(iframe) && iframe.src) {
    const src = new URL(iframe.src)
    src.searchParams.set("theme", themeUrl)
    iframe.src = src.toString()
    return
  }

  iframe.contentWindow?.postMessage(
    {
      giscus: {
        setConfig: {
          theme: themeUrl,
        },
      },
    },
    "https://giscus.app",
  )
}

const changeTheme = (e: CustomEventMap["themechange"]) => {
  setGiscusTheme(e.detail.theme)
}

const getThemeName = (theme: string) => {
  if (theme !== "dark" && theme !== "light") {
    return theme
  }
  const giscusContainer = document.querySelector(".giscus") as GiscusElement
  if (!giscusContainer) {
    return theme
  }
  const darkGiscus = giscusContainer.dataset.darkTheme ?? "dark"
  const lightGiscus = giscusContainer.dataset.lightTheme ?? "light"
  return theme === "dark" ? darkGiscus : lightGiscus
}

const getThemeUrl = (theme: string) => {
  const giscusContainer = document.querySelector(".giscus") as GiscusElement
  if (!giscusContainer) {
    return `https://giscus.app/themes/${theme}.css`
  }
  return `${giscusContainer.dataset.themeUrl ?? "https://giscus.app/themes"}/${theme}.css`
}

type GiscusElement = Omit<HTMLElement, "dataset"> & {
  dataset: DOMStringMap & {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    themeUrl: string
    lightTheme: string
    darkTheme: string
    mapping: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict: string
    reactionsEnabled: string
    inputPosition: "top" | "bottom"
  }
}

document.addEventListener("nav", () => {
  const giscusContainer = document.querySelector(".giscus") as GiscusElement
  if (!giscusContainer) {
    return
  }

  // a fresh container means a fresh frame
  giscusFrameLoaded = false

  const giscusScript = document.createElement("script")
  giscusScript.src = "https://giscus.app/client.js"
  giscusScript.async = true
  giscusScript.crossOrigin = "anonymous"
  giscusScript.setAttribute("data-loading", "lazy")
  giscusScript.setAttribute("data-emit-metadata", "0")
  giscusScript.setAttribute("data-repo", giscusContainer.dataset.repo)
  giscusScript.setAttribute("data-repo-id", giscusContainer.dataset.repoId)
  giscusScript.setAttribute("data-category", giscusContainer.dataset.category)
  giscusScript.setAttribute("data-category-id", giscusContainer.dataset.categoryId)
  giscusScript.setAttribute("data-mapping", giscusContainer.dataset.mapping)
  giscusScript.setAttribute("data-strict", giscusContainer.dataset.strict)
  giscusScript.setAttribute("data-reactions-enabled", giscusContainer.dataset.reactionsEnabled)
  giscusScript.setAttribute("data-input-position", giscusContainer.dataset.inputPosition)

  const theme = document.documentElement.getAttribute("saved-theme")
  if (theme) {
    giscusScript.setAttribute("data-theme", getThemeUrl(getThemeName(theme)))
  }

  giscusScriptEl = giscusScript
  giscusContainer.appendChild(giscusScript)

  // client.js replaces the container's children with the frame, so wait for it
  // to appear before we can tell whether the frame is live yet
  const onFrameLoad = () => {
    giscusFrameLoaded = true
  }
  const watchForFrame = new MutationObserver(() => {
    const iframe = giscusContainer.querySelector("iframe.giscus-frame")
    if (!iframe) {
      return
    }
    watchForFrame.disconnect()
    iframe.addEventListener("load", onFrameLoad)
    window.addCleanup(() => iframe.removeEventListener("load", onFrameLoad))
  })
  watchForFrame.observe(giscusContainer, { childList: true })
  window.addCleanup(() => watchForFrame.disconnect())

  document.addEventListener("themechange", changeTheme)
  window.addCleanup(() => document.removeEventListener("themechange", changeTheme))
})
