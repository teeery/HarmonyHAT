import type { DiscoveryCard as DiscoveryCardType } from '../../types'

/**
 * 发现卡片 — 第三幕田野调查的核心组件
 *
 * 布局：左侧大幅照片 | 右侧三层文字（观察 → 思考 → 未来方向）
 * 交互动画：hover 微放大 + 紫色边框发光
 */
export function DiscoveryCard({ card }: { card: DiscoveryCardType }) {
  return (
    <article
      className="grid grid-cols-[55fr_45fr] gap-12 items-center
                 min-h-screen px-24 py-20
                 transition-all duration-500
                 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(108,92,231,0.15)]"
    >
      {/* 左侧：照片 */}
      <div className="rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <img
          src={card.photoUrl}
          alt={card.sceneLabel}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* 右侧：三层文字 */}
      <div className="flex flex-col gap-8">
        {/* 标签 */}
        <span className="inline-block w-fit px-4 py-1 text-sm rounded-full
                         bg-[var(--color-accent)]/20 text-[var(--color-accent)]
                         border border-[var(--color-accent)]/30">
          {card.sceneLabel}
        </span>

        <Block label="我们观察" text={card.observation} />
        <Block label="我们思考" text={card.reflection} />
        <Block label="未来方向" text={card.futureDirection} color="#6c5ce7" />

        <p className="text-sm text-white/30 mt-4">
          {card.location} · {card.date}
        </p>
      </div>
    </article>
  )
}

function Block({
  label,
  text,
  color,
}: {
  label: string
  text: string
  color?: string
}) {
  return (
    <div>
      <h3
        className="text-sm uppercase tracking-widest mb-2"
        style={{ color: color ?? 'rgba(255,255,255,0.5)' }}
      >
        {label}
      </h3>
      <p className="text-lg leading-relaxed text-white/80">{text}</p>
    </div>
  )
}
