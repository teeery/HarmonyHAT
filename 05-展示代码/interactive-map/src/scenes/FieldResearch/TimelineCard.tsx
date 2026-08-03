import { motion } from 'framer-motion'
import type { JourneyDay } from '../../types'

interface Props {
  day: JourneyDay
  index: number
  isActive: boolean
  onClick: () => void
}

const DAY_ACCENT: Record<number, string> = {
  1: 'var(--color-tech)',
  2: 'var(--color-accent)',
  3: '#10b981',
  4: '#f59e0b',
}

/**
 * 时间线卡片 — 图片背景 + 暗色遮罩
 *
 * 普通态：缩略展示
 * Active：边框高亮
 */
export function TimelineCard({ day, index, isActive, onClick }: Props) {
  const accent = DAY_ACCENT[day.dayNumber] ?? DAY_ACCENT[1]

  return (
    <motion.article
      className="relative w-full cursor-pointer group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.65,
        delay: 0.1 + index * 0.18,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
    >
      <div
        className="relative rounded-2xl overflow-hidden transition-all duration-500 h-64 md:h-72"
        style={{
          border: isActive
            ? `1px solid ${accent}50`
            : '1px solid var(--color-border)',
          boxShadow: isActive
            ? `0 0 32px ${accent}20, 0 0 64px ${accent}08`
            : 'var(--shadow-card)',
        }}
      >
        {/* 背景图片 */}
        <img
          src={day.image}
          alt={day.theme}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 暗色渐变遮罩 — hover 时变亮 */}
        <div
          className="absolute inset-0 transition-opacity duration-500 group-hover:opacity-50"
          style={{
            background:
              'linear-gradient(180deg, rgba(3,7,18,0.55) 0%, rgba(3,7,18,0.75) 50%, rgba(3,7,18,0.92) 100%)',
          }}
        />

        {/* 内容 */}
        <div className="relative z-10 flex flex-col justify-end h-full p-5">
          {/* 头部 */}
          <div className="flex items-center gap-3 mb-2">
            <span
              className="flex items-center justify-center h-9 w-9 rounded-full text-white font-bold text-xs shrink-0"
              style={{
                background: accent,
                boxShadow: `0 0 12px ${accent}40`,
              }}
            >
              {day.dayNumber}
            </span>
            <div>
              <p className="text-[11px] tracking-[0.2em] text-white/40 font-sans">
                DAY {day.dayNumber} · {day.date}
              </p>
              <h3 className="text-lg md:text-xl font-bold tracking-wide text-white/95 font-sans mt-0.5">
                {day.theme}
              </h3>
            </div>
          </div>

          {/* 副标题 */}
          <p className="text-sm leading-relaxed text-white/55 font-sans line-clamp-2 mb-3">
            {day.subtitle}
          </p>

          {/* 点位概览 */}
          <div className="space-y-1">
            {day.stops.map((stop) => (
              <div key={stop.title} className="flex items-center gap-2 text-xs">
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: 'var(--color-accent)' }}
                />
                <span className="text-white/65 font-medium">{stop.title}</span>
                <span className="text-white/20">·</span>
                <span className="text-white/30">{stop.scene}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.article>
  )
}
