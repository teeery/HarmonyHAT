import { useEffect, useRef, useState } from 'react'

/**
 * 滚动驱动动画 hook。
 *
 * 监听元素在视口中的位置，返回 0-1 的进度值。
 * 用于驱动 Three.js 时间线（比如未来南城的年份过渡）。
 *
 * @param threshold — 触发区间 [start, end]，都是 0-1
 * @returns progress — 0-1，当前元素在触发区间的进度
 */
export function useScrollProgress(
  threshold: [number, number] = [0, 0.8],
) {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // TODO: IntersectionObserver + scroll 事件
    // 计算元素在 [threshold[0], threshold[1]] 区间的进度
    const node = ref.current
    if (!node) return
    setProgress(0) // placeholder
  }, [threshold])

  return { ref, progress }
}
