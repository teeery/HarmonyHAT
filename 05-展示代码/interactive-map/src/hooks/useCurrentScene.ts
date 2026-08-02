import { useEffect, useState } from 'react'
import type { SceneId } from '../types'

/**
 * 监听页面滚动，返回当前所在场景。
 *
 * 遍历所有 scene-container，判断哪个在视口中占比最大。
 * 用于 GlobalNav 高亮和 ProgressBar 进度计算。
 */
export function useCurrentScene() {
  const [current, setCurrent] = useState<SceneId>('prologue')

  useEffect(() => {
    // TODO: IntersectionObserver 监听各 scene 区块
    // 在视口中面积最大者设为 current
    const el = document.getElementById('root')
    if (!el) return
    setCurrent('prologue') // placeholder
  }, [])

  return current
}
