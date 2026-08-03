import { useEffect, useRef, useCallback } from 'react'

// ============================================================
// usePageScroll — 严格的「一次滚轮 = 翻一页」导航
//
// CSS scroll-snap 无法可靠实现这个效果，因为：
//   1. 滚轮的 delta 是累积的，snap 在惯性结束后才触发
//   2. 快速滚动时 snap 点会被跳过
//   3. 嵌套 overflow 容器会拦截滚轮事件
//
// 解决方案：JS 拦截 wheel 事件 → preventDefault →
// 计算目标页 → scrollIntoView({ behavior: 'smooth' })
//
// 页面通过 data-snap-page 属性标识。
// ============================================================

const SNAP_PAGE_SELECTOR = '[data-snap-page]'
/** 滚轮触发 snap 后的冷却时间（防止连续跳页） */
const WHEEL_COOLDOWN = 1200
/** scroll 事件停止后多久认为动画结束 */
const SCROLL_IDLE_MS = 250

export function usePageScroll() {
  // ---- refs ----
  /** 页面是否正在滚动动画中 */
  const isAnimating = useRef(false)
  /** 滚轮触发 snap 后的专属冷却 */
  const wheelCooldown = useRef(false)
  /** scroll 停止检测 timer */
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  /** 当前页码（每次 snap 后更新） */
  const currentIndex = useRef(0)

  // ---- helpers ----
  const getPages = useCallback(
    () => Array.from(document.querySelectorAll(SNAP_PAGE_SELECTOR)) as HTMLElement[],
    [],
  )

  const findCurrentIndex = useCallback(() => {
    const pages = getPages()
    if (pages.length === 0) return 0

    const viewportTop = window.scrollY
    let best = 0
    let bestDist = Infinity

    for (let i = 0; i < pages.length; i++) {
      // 用 getBoundingClientRect + scrollY 拿到绝对位置
      const top = pages[i].getBoundingClientRect().top + window.scrollY
      const dist = Math.abs(viewportTop - top)
      if (dist < bestDist) {
        bestDist = dist
        best = i
      }
    }
    return best
  }, [getPages])

  // ---- 翻页 ----
  const scrollToPage = useCallback(
    (index: number) => {
      const pages = getPages()
      if (index < 0 || index >= pages.length) return

      currentIndex.current = index
      isAnimating.current = true
      wheelCooldown.current = true

      pages[index].scrollIntoView({ behavior: 'smooth', block: 'start' })

      // 动画完成后释放冷却，同时重置动画状态
      setTimeout(() => {
        wheelCooldown.current = false
        isAnimating.current = false
        currentIndex.current = findCurrentIndex()
      }, WHEEL_COOLDOWN)
    },
    [getPages],
  )

  // ---- effect ----
  useEffect(() => {
    // -------- wheel 拦截 --------
    const handleWheel = (e: WheelEvent) => {
      // 只处理垂直滚动
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return

      // 动画中 / 冷却中 → 阻止
      if (isAnimating.current || wheelCooldown.current) {
        e.preventDefault()
        return
      }

      // 如果 target 在内部可滚动容器内，且容器还能滚 → 放行原生滚动
      const target = e.target as HTMLElement | null
      const scrollable = target?.closest('[data-scrollable]')
      if (scrollable) {
        const { scrollTop, scrollHeight, clientHeight } = scrollable
        const atBottom = scrollTop + clientHeight >= scrollHeight - 2
        const atTop = scrollTop <= 1
        if ((e.deltaY > 0 && !atBottom) || (e.deltaY < 0 && !atTop)) {
          return // 容器内部还能滚，不拦截
        }
      }

      e.preventDefault()

      const pages = getPages()
      if (pages.length === 0) return

      // 临界情况：已到边界，不再阻止（允许浏览器正常行为）
      const atFirst = currentIndex.current === 0 && e.deltaY < 0
      const atLast = currentIndex.current === pages.length - 1 && e.deltaY > 0
      if (atFirst || atLast) return // 让浏览器处理边界弹性

      const dir = e.deltaY > 0 ? 1 : -1
      const targetIdx = currentIndex.current + dir
      if (targetIdx >= 0 && targetIdx < pages.length) {
        scrollToPage(targetIdx)
      }
    }

    // -------- 键盘方向键 --------
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp'].includes(e.key)) return

      if (isAnimating.current || wheelCooldown.current) {
        e.preventDefault()
        return
      }

      e.preventDefault()

      const pages = getPages()
      if (pages.length === 0) return

      const dir = e.key === 'ArrowDown' || e.key === 'PageDown' ? 1 : -1
      const target = currentIndex.current + dir
      if (target >= 0 && target < pages.length) {
        scrollToPage(target)
      }
    }

    // -------- scroll 监听：检测动画结束 + 校正 currentIndex --------
    const handleScroll = () => {
      // 滚轮冷却期间不干扰
      if (wheelCooldown.current) return

      // 清除旧 timer
      if (idleTimer.current) clearTimeout(idleTimer.current)

      // 正在滚动
      isAnimating.current = true

      // 停止一段时间后认为动画结束
      idleTimer.current = setTimeout(() => {
        isAnimating.current = false
        currentIndex.current = findCurrentIndex()
      }, SCROLL_IDLE_MS)
    }

    // -------- touch 支持（移动端滑动） --------
    let touchStartY = 0
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartY = e.touches[0].clientY
      }
    }
    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current || wheelCooldown.current) return
      const dy = touchStartY - (e.changedTouches[0]?.clientY ?? touchStartY)
      // 滑动超过 50px 才触发
      if (Math.abs(dy) < 50) return

      // 如果有内部可滚动元素正在滚动，不拦截
      const target = e.target as HTMLElement | null
      const scrollParent = target?.closest('[data-scrollable]')
      if (scrollParent) {
        const { scrollTop, scrollHeight, clientHeight } = scrollParent
        const atBottom = scrollTop + clientHeight >= scrollHeight - 2
        const atTop = scrollTop <= 1
        if ((dy > 0 && !atBottom) || (dy < 0 && !atTop)) return
      }

      const pages = getPages()
      if (pages.length === 0) return

      const dir = dy > 0 ? 1 : -1
      const targetIdx = currentIndex.current + dir
      if (targetIdx >= 0 && targetIdx < pages.length) {
        scrollToPage(targetIdx)
      }
    }

    // ---- 初始化 ----
    currentIndex.current = findCurrentIndex()

    // ---- 注册 ----
    document.addEventListener('wheel', handleWheel, { passive: false })
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('scroll', handleScroll, { passive: true })
    document.addEventListener('touchstart', handleTouchStart, { passive: true })
    document.addEventListener('touchend', handleTouchEnd, { passive: false })

    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('scroll', handleScroll)
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchend', handleTouchEnd)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [getPages, findCurrentIndex, scrollToPage])

  // 暴露供外部使用（例如 GlobalNav 程序化跳转后更新 currentIndex）
  return {
    goToPage: (index: number) => scrollToPage(index),
    getCurrentIndex: () => currentIndex.current,
    /** 供 GlobalNav 点击时调用，不触发冷却但更新状态 */
    notifyNavClick: (sectionId: string) => {
      const pages = getPages()
      // 找第一个匹配的 page
      const idx = pages.findIndex(
        (p) => p.getAttribute('data-snap-page') === sectionId || p.id === sectionId,
      )
      if (idx >= 0) {
        currentIndex.current = idx
      }
    },
  }
}
