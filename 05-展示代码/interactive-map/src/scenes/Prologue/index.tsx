import { HeroSection } from '../../components/HeroSection'

/**
 * 第一幕：序章 — 鸿蒙未来城市探索馆
 *
 * 作为整个作品的首页入口，融合了原 HeroSection 的全屏开场：
 *   阶段 A：城市背景图缓慢呼吸 + 数据光点浮游
 *   阶段 B：标题 "鸿蒙未来城市探索馆" + slogan 渐显
 *   阶段 C：核心叙事文案 + 追问 + "开始探索" 按钮
 *
 * 目标：用户打开 5 秒内产生
 *   "这不是一个学生报告，这是一个科技展览。"
 */
export function Prologue() {
  return (
    <section id="prologue" className="relative w-full overflow-hidden" style={{ height: '100dvh', scrollSnapAlign: 'start' }}>
      <HeroSection />
    </section>
  )
}
