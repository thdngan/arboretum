import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

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
