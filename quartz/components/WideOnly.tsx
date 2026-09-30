import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

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
