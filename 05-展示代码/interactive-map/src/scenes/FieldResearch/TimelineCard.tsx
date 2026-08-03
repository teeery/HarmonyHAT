import { motion } from 'framer-motion'
import type { JourneyDay } from '../../types'

interface Props {
  day: JourneyDay
  index: number
  isActive: boolean
  onClick: () => void
}

/**
 * 每日主题色 — 由设计系统派生
 *
 * Day 1 科技蓝  (--color-tech)
 * Day 2 鸿蒙紫  (--color-accent)
 * Day 3 青翠    (教育/成长)
 * Day 4 暖金    (政务/服务)
 */
const DAY_THEME: Record<number, { accent: string; gradient: string }> = {
  1: {
    accent: 'var(--color-tech)',
    gradient:
      'linear-gradient(135deg, rgba(74,158,255,0.28) 0%, rgba(74,158,255,0.06) 60%, transparent 100%)',
  },
  2: {
    accent: 'var(--color-accent)',
    gradient:
      'linear-gradient(135deg, rgba(108,92,231,0.28) 0%, rgba(108,92,231,0.06) 60%, transparent 100%)',
  },
  3: {
    accent: '#10b981',
    gradient:
      'linear-gradient(135deg, rgba(16,185,129,0.22) 0%, rgba(16,185,129,0.05) 60%, transparent 100%)',
  },
  4: {
    accent: '#f59e0b',
    gradient:
      'linear-gradient(135deg, rgba(245,158,11,0.22) 0%, rgba(245,158,11,0.05) 60%, transparent 100%)',
  },
}

/**
 * 时间线卡片 — 玻璃拟态 + 设计令牌
 *
 * 视觉层级：
 *   - 玻璃卡片主体 (.card-journey)
 *   - 顶部渐变条（每日主题色）
 *   - Day 编号徽章
 *   - 点位行程列表
 *   - 底部时间线连接点
 *
 * 动画策略：
 *   - Framer Motion: 仅处理入场（scroll reveal）
 *   - CSS (.card-journey): Hover / Active 状态过渡
 */
export function TimelineCard({ day, index, isActive, onClick }: Props) {
  const theme = DAY_THEME[day.dayNumber] ?? DAY_THEME[1]

  return (
    <motion.div
      className="relative flex-shrink-0 w-[350px] md:w-[440px] cursor-pointer group"
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        delay: 0.12 + index * 0.15,
        ease: [0.16, 1, 0.3, 1],
      }}
      onClick={onClick}
    >
      {/* ========== 卡片主体 ========== */}
      <article className={`card-journey ${isActive ? 'is-active' : ''}`}>
        {/* ---- 顶部色条 ---- */}
        <div
          className="card-journey-strip h-40 md:h-48"
          style={{ background: theme.gradient }}
        >
          {/* Day 编号 + 标签 */}
          <div className="relative z-10 flex items-center gap-3 px-5 pt-5">
            {/* 数字徽章 — 毛玻璃底 */}
            <span
              className="flex items-center justify-center h-11 w-11 rounded-full font-bold text-sm backdrop-blur-md select-none"
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#ffffff',
              }}
            >
              {day.dayNumber}
            </span>
            <span
              className="text-xs tracking-[0.22em] font-medium select-none"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              DAY {day.dayNumber}
            </span>
          </div>

          {/* 封面 emoji */}
          <span className="absolute right-5 bottom-4 text-6xl md:text-7xl opacity-[0.18] select-none pointer-events-none">
            {day.coverIcon}
          </span>
        </div>

        {/* ---- 信息区 ---- */}
        <div className="relative px-5 pt-4 pb-5 md:px-6 md:pt-5 md:pb-6 space-y-3.5">
          {/* 主题标题 */}
          <h3 className="text-[var(--text-heading)] md:text-[28px] font-bold tracking-wide text-white/92 font-sans">
            {day.theme}
          </h3>

          {/* 副标题 */}
          <p className="text-[var(--text-small)] leading-relaxed text-[var(--color-text-muted)] font-sans line-clamp-2">
            {day.subtitle}
          </p>

          {/* 行程列表 */}
          <div className="space-y-2 pt-1.5">
            {day.stops.map((stop) => (
              <div
                key={stop.title}
                className="flex items-start gap-2.5 text-xs"
              >
                {/* 彩色圆点 */}
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0"
                  style={{ background: theme.accent }}
                />
                <span style={{ color: 'var(--color-text-faint)' }}>
                  <span style={{ color: 'var(--color-text-secondary)' }}>
                    {stop.title}
                  </span>
                  <span className="mx-1.5 opacity-40">·</span>
                  {stop.scene}
                </span>
              </div>
            ))}
          </div>

          {/* 分割线 + 日期 + 提示 */}
          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: '1px solid var(--color-border)' }}
          >
            <span
              className="text-[11px] tracking-wider font-mono select-none"
              style={{ color: 'var(--color-text-faint)' }}
            >
              {day.date}
            </span>
            <span
              className="text-[11px] tracking-wider transition-colors duration-300 font-sans select-none"
              style={{
                color: 'var(--color-text-faint)',
              }}
            >
              点击深入探索 →
            </span>
          </div>
        </div>
      </article>

      {/* ========== 时间线连接点 ========== */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-30">
        <div
          className={`
            h-3.5 w-3.5 rounded-full transition-all duration-500
            ring-4 ring-[var(--color-bg-deep)]
            ${isActive ? 'shadow-[0_0_16px_rgba(108,92,231,0.6)]' : ''}
          `}
          style={{
            background: isActive
              ? 'var(--color-accent)'
              : 'rgba(255,255,255,0.12)',
          }}
        />
      </div>
    </motion.div>
  )
}
