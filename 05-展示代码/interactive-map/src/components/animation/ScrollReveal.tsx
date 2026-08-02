import { type ReactNode } from 'react'

/**
 * 滚动触发显示 — 通用动画包装器
 *
 * 子元素进入视口 30% 时触发淡入 + 上移动画
 *
 * @param direction — 'up' | 'left' | 'right'
 * @param delay — 延迟秒数
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
}: {
  children: ReactNode
  direction?: 'up' | 'left' | 'right'
  delay?: number
}) {
  // TODO: Intersection Observer + CSS transform 动画
  return <div style={{ animationDelay: `${delay}s` }}>{children}</div>
}
