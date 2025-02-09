import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/graph.inline"
import style from "./styles/graph.scss"

export interface D3Config {
  drag: boolean
  zoom: boolean
  depth: number
  scale: number
  repelForce: number
  centerForce: number
  linkDistance: number
  fontSize: number
  opacityScale: number
  removeTags: string[]
  showTags: boolean
}

interface GraphOptions {
  localGraph: Partial<D3Config> | undefined
  globalGraph: Partial<D3Config> | undefined
}

const defaultOptions: GraphOptions = {
  localGraph: {
    drag: true, // whether to allow panning the view around
    zoom: true, // whether to allow zooming in and out
    depth: 1, // how many hops of notes to display
    scale: 1.6, // default view scale
    repelForce: 0.5, // how much nodes should repel each other
    centerForce: 0.3, // how much force to use when trying to center the nodes
    linkDistance: 30, // how long should the links be by default?
    fontSize: 0.6, // what size should the node labels be?
    opacityScale: 1, // how quickly do we fade out the labels when zooming out?
    showTags:true,
    removeTags:[]
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 1.,
    repelForce: 0.5,
    centerForce: 0.5,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1,
    showTags: true,
    removeTags: [],
    focusOnHover: true,
  },
}

export default ((opts?: GraphOptions) => {
  function Graph({ displayClass }: QuartzComponentProps) {
    const localGraph = { ...defaultOptions.localGraph, ...opts?.localGraph }
    const globalGraph = { ...defaultOptions.globalGraph, ...opts?.globalGraph }
    return (
      <div class={`graph ${displayClass ?? ""}`}>
        <h3>🧭 Interactive Map</h3>
        {/* Click top right symbol for full view */}
        <div class="graph-outer">
          <div id="graph-container" data-cfg={JSON.stringify(localGraph)}></div>
          <svg id="global-graph-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
            <path stroke-linecap="butt" d="M2 14 L14 2"/>
            <path stroke-linecap="square" d="M14 2 L9 2"/>
            <path stroke-linecap="square" d="M2 14 L7 14"/>
            <path stroke-linecap="square" d="M14 2 L14 7"/>
            <path stroke-linecap="square" d="M2 14 L2 9"/>
          </svg>
        </div>
        <div id="global-graph-outer">
          <div id="global-graph-container" data-cfg={JSON.stringify(globalGraph)}>
          </div>
        </div>

      </div>
    )
  }

  Graph.css = style
  Graph.afterDOMLoaded = script

  return Graph
}) satisfies QuartzComponentConstructor