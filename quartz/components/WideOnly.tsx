import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Like DesktopOnly, but it only ever hides. Quartz's .desktop-only / .mobile-only
// set `display` in the visible state too, which clobbers whatever display the
// component set for itself (a grid row silently collapses to block). These also
// split at $desktop rather than $mobile, so the tablet band counts as narrow.
export default ((component: QuartzComponent) => {
  const Component = component
  const WideOnly: QuartzComponent = (props: QuartzComponentProps) => {
    return <Component displayClass="wide-only" {...props} />
  }

  WideOnly.displayName = component.displayName
  WideOnly.afterDOMLoaded = component?.afterDOMLoaded
  WideOnly.beforeDOMLoaded = component?.beforeDOMLoaded
  WideOnly.css = component?.css
  return WideOnly
}) satisfies QuartzComponentConstructor<QuartzComponent>
