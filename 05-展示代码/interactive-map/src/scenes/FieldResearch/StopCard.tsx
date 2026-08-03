import { motion } from 'framer-motion'
import type { JourneyDay, JourneyStop } from '../../types'

interface Props {
  day: JourneyDay
  stop: JourneyStop
  index: number
  isActive: boolean
  onClick: () => void
}

/**
 * 地点卡片 — 极简：图片 + 地点名 + 场景标签
 */
export function StopCard({ day, stop, index, isActive, onClick }: Props) {
  return (
    <motion.article
      className="relative w-full cursor-pointer group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay: 0.06 + index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
    >
      <div
        className="relative rounded-xl overflow-hidden transition-all duration-400 h-40 md:h-44"
        style={{
          border: isActive
            ? '1px solid rgba(108,92,231,0.4)'
            : '1px solid var(--color-border)',
        }}
      >
        {/* 背景图 */}
        <img
          src={stop.image}
          alt={stop.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* 轻遮罩 — 底部渐变保证文字可读 */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(3,7,18,0.15) 0%, rgba(3,7,18,0.5) 100%)',
          }}
        />

        {/* 内容 — 底部对齐 */}
        <div className="relative z-10 flex flex-col justify-end h-full p-3.5">
          {/* DAY 角标 */}
          <span className="absolute top-3 right-3 text-[9px] font-semibold tracking-wider text-white/40">
            DAY {day.dayNumber}
          </span>
          <h4 className="text-sm md:text-base font-bold text-white/93 font-sans leading-snug">
            {stop.title}
          </h4>
          <p className="mt-1 text-[11px] md:text-xs leading-relaxed text-white/55 font-sans line-clamp-2">
            {stop.description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
