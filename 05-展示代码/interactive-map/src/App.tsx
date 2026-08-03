import { useRef } from 'react'
import {
  Prologue,
  ExploreMap,
  FieldResearch,
  HarmonyInsight,
  DataLab,
  AIResearcher,
  FutureCity,
  Epilogue,
} from './scenes'
import { GlobalNav } from './components/layout/GlobalNav'

/**
 * 《鸿蒙未来城市探索馆》
 *
 * 叙事顺序（8 个场景）：
 *   序章（Hero 开场）→ 走进南城 → 田野调查 → 鸿蒙洞察
 *   → 数据实验室 → AI 调研员 → 未来南城 2035 → 尾页
 *
 * 交互：全页滚动驱动，右侧全局导航条
 */
export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={containerRef} className="relative">
      {/* 全局导航条 — 右侧固定 */}
      <GlobalNav />

      {/* 序章：鸿蒙未来城市探索馆 — 全屏 Hero 开场 */}
      <Prologue />

      {/* 第二幕：走进南城 — 探索地图 */}
      <ExploreMap />

      {/* 第三幕：田野调查 — 发现卡片 */}
      <FieldResearch />

      {/* 第四幕：鸿蒙洞察 — 连接的新方式 */}
      <HarmonyInsight />

      {/* 第五幕：数据实验室 — 调研证据 */}
      <DataLab />

      {/* 第六幕：AI 调研员 — 让成果继续生长 */}
      <AIResearcher />

      {/* 第七幕：未来南城 2035 — 青年想象 */}
      <FutureCity />

      {/* 尾页：青年未来宣言 */}
      <Epilogue />
    </div>
  )
}
