import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/graph.inline"
// @ts-ignore
import placement from "./scripts/graphPlacement.inline"
import style from "./styles/graph.scss"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

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
  focusOnHover?: boolean
  enableRadial?: boolean
  excludeTags: string[]
}

interface GraphOptions {
  localGraph: Partial<D3Config> | undefined
  globalGraph: Partial<D3Config> | undefined
  // false drops the on-page map panel and keeps only the full-screen one, for
  // pages that should still answer the floating map button and Ctrl+G without
  // showing a map of their own
  localPanel?: boolean
}

const defaultOptions: GraphOptions = {
  localGraph: {
    drag: true,
    zoom: true,
    depth: 1,
    scale: 1.1,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1,
    showTags: true,
    removeTags: [],
    focusOnHover: false,
    enableRadial: false,
    excludeTags: [],
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 0.5,
    centerForce: 0.2,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1,
    showTags: true,
    removeTags: [],
    focusOnHover: true,
    excludeTags: [],
    enableRadial: true,
  },
}

export default ((opts?: Partial<GraphOptions>) => {
  const Graph: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const localGraph = { ...defaultOptions.localGraph, ...opts?.localGraph }
    const globalGraph = { ...defaultOptions.globalGraph, ...opts?.globalGraph }
    const localPanel = opts?.localPanel ?? true

    // The expand icon has to stay in the DOM even with the panel gone: the
    // floating map button opens the map by dispatching a click at it. Without
    // #graph-container, renderGraph() early-returns, so no local graph is drawn.
    const expandIcon = (
      <button id="global-graph-icon" aria-label="Global Graph" hidden={!localPanel}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor">
          <path stroke-linecap="butt" d="M2 14 L14 2"/>
          <path stroke-linecap="square" d="M14 2 L9 2"/>
          <path stroke-linecap="square" d="M2 14 L7 14"/>
          <path stroke-linecap="square" d="M14 2 L14 7"/>
          <path stroke-linecap="square" d="M2 14 L2 9"/>
        </svg>
      </button>
    )

    return (
      <div class={classNames(displayClass, "graph")}>
        {localPanel && (
          <>
            <h3><span class="shimmer-symbol"><i class="fas fa-compass">&nbsp;</i></span> Interactive Map</h3>
            <div class="graph-outer">
              <div id="graph-container" data-cfg={JSON.stringify(localGraph)}></div>
              {expandIcon}
            </div>
          </>
        )}
        {!localPanel && expandIcon}
        <div id="global-graph-outer">
          <div id="global-graph-container" data-cfg={JSON.stringify(globalGraph)}></div>
          {/* the legend and the close button are siblings of the container, not
              children: renderGraph() wipes the container's children every time
              the map is opened */}
          <figure class="global-graph-legend">
            {/* <figcaption>Legend</figcaption> */}
            <ul>
              {/* on a tag page the current page IS the tag, so this row and
                  "Current tag" below are mutually exclusive */}
              <li class="legend-current-page-item">
                <span class="legend-swatch legend-current" aria-hidden="true"></span>
                Current page
              </li>
              {/* only meaningful on a tag page; hidden elsewhere via body[data-slug] */}
              <li class="legend-current-tag-item">
                <span class="legend-swatch legend-current-tag" aria-hidden="true"></span>
                Current tag
              </li>
              <li>
                <span class="legend-swatch legend-tag" aria-hidden="true"></span>
                Tag
              </li>
              <li>
                <span class="legend-swatch legend-visited" aria-hidden="true"></span>
                Visited note
              </li>
              <li>
                <span class="legend-swatch legend-unvisited" aria-hidden="true"></span>
                Unvisited note
              </li>
            </ul>
          </figure>
          <button class="global-graph-close" type="button" aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    )
  }

  Graph.css = style
  Graph.afterDOMLoaded = script
  Graph.beforeDOMLoaded = placement

  return Graph
}) satisfies QuartzComponentConstructor
