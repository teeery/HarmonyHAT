import { FUTURE_SCENES } from '../../data/futureCity'
import { HeroStage } from './HeroStage'
import { NetworkStage } from './NetworkStage'
import { CompareStage } from './CompareStage'
import { TransformStage } from './TransformStage'
import { SpotlightStage } from './SpotlightStage'

// ============================================================
// 第七幕：未来南城 2035 — 高潮章节
//
// 5 个 Stage 纵向堆叠，每个至少占满一屏。
// 共享背景层（网格纹理 + 氛围光），各 Stage
// 通过 whileInView 独立触发入场动画。
//
// 叙事线：
//   震撼 → 理解 → 共鸣 → 想象 → 期待
// ============================================================

/** 根据 variant 渲染对应 Stage 组件 */
function renderStage(config: (typeof FUTURE_SCENES)[number]) {
  switch (config.variant) {
    case 'hero':
      return (
        <HeroStage
          title={config.title as string[]}
          prologue={config.prologue}
          prologueHighlight={config.prologueHighlight}
          image={config.image}
        />
      )
    case 'network':
      return (
        <NetworkStage
          title={config.title as string}
          subtitle={config.subtitle}
          nodes={config.nodes}
          centerLabel={config.centerLabel}
          evolution={config.evolution}
          image={config.image}
        />
      )
    case 'comparison':
      return (
        <CompareStage
          title={config.title as string}
          beforeYear={config.beforeYear}
          beforeLabel={config.beforeLabel}
          beforeDescription={config.beforeDescription}
          beforeItems={config.beforeItems}
          afterYear={config.afterYear}
          afterLabel={config.afterLabel}
          afterDescription={config.afterDescription}
          afterItems={config.afterItems}
          harmonyConnection={config.harmonyConnection}
          image={config.image}
        />
      )
    case 'transform':
      return (
        <TransformStage
          title={config.title as string}
          subtitle={config.subtitle}
          phases={config.phases}
          closingQuote={config.closingQuote}
          image={config.image}
        />
      )
    case 'spotlight':
      return (
        <SpotlightStage
          title={config.title as string}
          focusLabel={config.focusLabel}
          focusDescription={config.focusDescription}
          growthSteps={config.growthSteps}
          quote={config.quote}
          image={config.image}
        />
      )
    default:
      return null
  }
}

export function FutureCity() {
  return (
    <section id="future-city" className="relative w-full bg-[var(--color-bg-deep)]">
      {/* ================================================================ */}
      {/* Stage 序列 — 每个 stage 是一屏，独立参与 snap */}
      {/* ================================================================ */}
      {FUTURE_SCENES.map((scene) => (
        <div
          key={scene.id}
          className="relative z-10 w-full overflow-x-hidden"
          style={{ height: '100dvh', scrollSnapAlign: 'start', overflowY: 'auto' }}
        >
          {renderStage(scene)}
        </div>
      ))}
    </section>
  )
}
