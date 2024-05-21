import { QuartzComponentConstructor } from "./types"

export default (() => {
  function Footer() {
    return (
      <script
        src="https://giscus.app/client.js"
        data-repo="thdngan/arboretum"
        data-repo-id="R_kgDOHxknJg"
        data-category="Announcements"
        data-category-id="DIC_kwDOHxknJs4CfhAs"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light"
        data-lang="en"
        crossorigin="anonymous"
        async
      ></script>
    )
  }

  return Footer
}) satisfies QuartzComponentConstructor