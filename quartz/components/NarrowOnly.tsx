import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Like MobileOnly, but it only ever hides. Quartz's .desktop-only / .mobile-only
// set `display` in the visible state too, which clobbers whatever display the
// component set for itself (a grid row silently collapses to block). These also
// split at $desktop rather than $mobile, so the tablet band counts as narrow.
export default ((component: QuartzComponent) => {
  const Component = component
  const NarrowOnly: QuartzComponent = (props: QuartzComponentProps) => {
    return <Component displayClass="narrow-only" {...props} />
  }

  NarrowOnly.displayName = component.displayName
  NarrowOnly.afterDOMLoaded = component?.afterDOMLoaded
  NarrowOnly.beforeDOMLoaded = component?.beforeDOMLoaded
  NarrowOnly.css = component?.css
  return NarrowOnly
}) satisfies QuartzComponentConstructor<QuartzComponent>
