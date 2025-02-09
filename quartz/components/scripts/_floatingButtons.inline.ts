// from https://quartz.eilleeenz.com/Quartz-customization-log#scroll-to-top--random-page
// original source: 2/2/25
// https://github.com/CatCodeMe/catcodeme.github.io/blob/770f3f8d1f6849ef40bc06b4300a52b3aecfb551/quartz/components/scripts/floatingButtons.inline.ts
import { navigateToRandomPage } from "./_randomPage.inline";

// 全局变量跟踪状态
// let activeModal: HTMLElement | null = null
let currentCleanup: (() => void) | null = null

function setupFloatingButtons() {
  // 清理之前的设置
  if (currentCleanup) {
    currentCleanup()
    currentCleanup = null
  }

  const buttons = document.querySelectorAll<HTMLElement>('.floating-button');

  const buttonGroups = document.querySelectorAll<HTMLElement>('.button-group')
  function toggleGraph() {
    const graphComponent = document.querySelector('.graph') as HTMLElement
    if (!graphComponent) return

    const isVisible = graphComponent.classList.contains('active')
    if (!isVisible) {
      // 显示图谱
      graphComponent.classList.add('active')
      // 触发图谱渲染
      const globalGraphIcon = document.getElementById('global-graph-icon')
      if (globalGraphIcon) {
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        })
        globalGraphIcon.dispatchEvent(clickEvent)
      }

      // 注册 ESC 关闭事件
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          graphComponent.classList.remove('active')
          document.removeEventListener('keydown', handleEsc)
        }
      };
      const handleClickOutside = (e: MouseEvent) => {
        if (!graphComponent.contains(e.target as Node)) {
          graphComponent.classList.remove('active');
          document.removeEventListener('keydown', handleEsc);
          document.removeEventListener('click', handleClickOutside);
        }
      };
      document.addEventListener('keydown', handleEsc);
      document.addEventListener('click', handleClickOutside);
    } else {
      // 隐藏图谱
      graphComponent.classList.remove('active')
    }
  }

  // 处理按钮点击
  function handleButtonClick(this: HTMLElement,e: Event) {
    // const clickaction = this.getAttribute('data-action');
    // if (!clickaction) return

    const button = (e.target as Element).closest('[data-action]')
    if (!button) return
    
    const action = (button as Element).getAttribute('data-action')
    const center = document.querySelector('.center')
    const footer = document.querySelector('.footer')

    if (!center) return
    if (!footer) return

    switch (action) {
      case 'scrollTop':
        // const firstElement = center.firstElementChild
        // if (firstElement) {
        //   firstElement.scrollIntoView({ behavior: 'smooth' })
        // }
        globalThis.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        break
      case 'scrollBottom':
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' })
        }

        break
      case 'graph':
        toggleGraph()
        break

      case 'randomPgFloating':
        navigateToRandomPage()
        break
    }
  }

  // Hide tooltips after click
  const tooltip = this.querySelector('.floating-button-tooltip');
  if (tooltip) {
    tooltip.style.opacity = '0';
    tooltip.style.visibility = 'hidden';
  }

  // 设置事件监听
  buttonGroups.forEach(group => {
    group.addEventListener('click', handleButtonClick)
  })

  // 保存当前的清理函数
  currentCleanup = () => {
    buttonGroups.forEach(group => {
      group.removeEventListener('click', handleButtonClick)
    })
    // if (activeModal) {
    //   activeModal.remove()
    //   activeModal = null
    // }
  }
}


document.addEventListener('DOMContentLoaded', setupFloatingButtons)
document.addEventListener('nav', setupFloatingButtons)

// Adding in the "prevent default" behavior here but this is actually for broken links
document.querySelectorAll('.broken-link').forEach(link => {
  link.addEventListener('click', function(event) {
    event.preventDefault(); // Prevents the link from navigating
  });
});