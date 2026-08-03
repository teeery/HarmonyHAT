import { useRef } from 'react'
import {
  Prologue,
  ExploreMap,
  FieldResearch,
  HarmonyInsight,
  FutureCity,
  Epilogue,
} from './scenes'
import { GlobalNav } from './components/layout/GlobalNav'
import { usePageScroll } from './hooks'

/**
 * 《鸿蒙未来城市探索馆》
 *
 * 叙事顺序（10 个页面）：
 *   序章 → 走进南城 → 调研旅程 → 鸿蒙洞察
 *   → 未来南城 2035（5个 stage） → 青年宣言
 *
 * 交互：JS 拦截滚轮事件，一次滚轮 = 翻一页
 */
export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  // 页面级滚动：一次滚轮 = 翻一页
  usePageScroll()

  return (
    <div ref={containerRef} className="relative">
      {/* 全局导航条 — 右侧固定 */}
      <GlobalNav />

      {/* 序章：鸿蒙未来城市探索馆 — 全屏 Hero 开场 */}
      <Prologue />

      {/* 第二幕：走进南城 — 探索地图 */}
      <ExploreMap />

      {/* 第三幕：调研旅程 — 发现卡片 */}
      <FieldResearch />

      {/* 第四幕：鸿蒙洞察 — 连接的新方式 */}
      <HarmonyInsight />

      {/* 第五幕：未来南城 2035 — 青年想象 */}
      <FutureCity />

      {/* 尾页：青年未来宣言 */}
      <Epilogue />
    </div>
  )
}
