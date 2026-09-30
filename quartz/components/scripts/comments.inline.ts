let giscusFrameLoaded = false
let giscusScriptEl: HTMLScriptElement | null = null

const isFrameLive = (iframe: HTMLIFrameElement) =>
  giscusFrameLoaded && !iframe.classList.contains("giscus-frame--loading")

const setGiscusTheme = (theme: string) => {
  const themeUrl = getThemeUrl(getThemeName(theme))
  const iframe = document.querySelector("iframe.giscus-frame") as HTMLIFrameElement | null

  if (!iframe) {
    giscusScriptEl?.setAttribute("data-theme", themeUrl)
    return
  }

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
