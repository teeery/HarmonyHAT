import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Clock, MapPin } from 'lucide-react'
import type { JourneyDay } from '../../types'

interface Props {
  day: JourneyDay | null
  onClose: () => void
}

const DAY_THEME: Record<number, { accent: string; accentBg: string }> = {
  1: { accent: 'var(--color-tech)', accentBg: 'rgba(74,158,255,0.10)' },
  2: { accent: 'var(--color-accent)', accentBg: 'rgba(108,92,231,0.10)' },
  3: { accent: '#10b981', accentBg: 'rgba(16,185,129,0.10)' },
  4: { accent: '#f59e0b', accentBg: 'rgba(245,158,11,0.10)' },
}

/**
 * 调研详情弹窗 — 大屏叠层
 *
 * 布局（桌面端）：
 *   左 55%：点位时间线（纵向滚动）
 *   右 45%：观察 / 思考 / 未来方向
 *
 * 动画：遮罩淡入 + 面板缩放浮入
 * Esc 关闭
 */
export function ResearchDetail({ day, onClose }: Props) {
  // Esc 关闭
  useEffect(() => {
    if (!day) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [day, onClose])

  return (
    <AnimatePresence>
      {day && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
          {/* ---- 暗色遮罩 ---- */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
          />

          {/* ---- 弹窗面板 ---- */}
          <motion.div
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{
              background: 'linear-gradient(160deg, rgba(15,19,38,0.98), rgba(7,10,25,0.98))',
              border: '1px solid rgba(255,255,255,0.10)',
              boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04) inset',
            }}
            initial={{ opacity: 0, scale: 0.94, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 32 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* ---- 顶部装饰光条 ---- */}
            <div
              className="absolute top-0 left-8 right-8 h-px"
              style={{
                background: `linear-gradient(90deg, transparent, var(--color-accent), transparent)`,
              }}
            />

            {/* ---- 关闭按钮 ---- */}
            <motion.button
              onClick={onClose}
              className="absolute top-5 right-5 z-10 flex items-center justify-center h-9 w-9 rounded-full bg-white/5 hover:bg-white/12 text-white/40 hover:text-white/80 transition-all"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
            >
              <X size={18} />
            </motion.button>

            {/* ---- 内容区 ---- */}
            <div className="px-6 py-8 md:px-10 md:py-10">
              {/* 头部 */}
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="flex items-center justify-center h-10 w-10 rounded-full text-white font-bold text-sm"
                      style={{
                        background: 'var(--color-accent)',
                        boxShadow: `0 0 16px ${DAY_THEME[day.dayNumber].accent}50`,
                      }}
                    >
                      {day.dayNumber}
                    </span>
                    <span className="text-xs tracking-[0.25em] text-white/30 font-sans">
                      DAY {day.dayNumber} · {day.date}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold tracking-wide text-white/95 font-sans">
                    {day.theme}
                  </h2>
                  <p className="mt-2 text-sm md:text-base text-white/40 leading-relaxed max-w-lg font-sans">
                    {day.subtitle}
                  </p>
                </div>
                {/* 封面 icon */}
                <span className="text-6xl md:text-7xl opacity-15 select-none shrink-0">
                  {day.coverIcon}
                </span>
              </div>

              {/* ---- 主体：两栏 ---- */}
              <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr] gap-8 md:gap-10">
                {/* 左侧：点位时间线 */}
                <div className="space-y-5">
                  <p className="text-[11px] tracking-[0.25em] text-white/25 uppercase font-sans">
                    实地调研路线
                  </p>

                  {day.stops.map((stop, i) => (
                    <motion.div
                      key={stop.title}
                      className="relative pl-6"
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.1, duration: 0.45 }}
                    >
                      {/* 竖线 */}
                      <div
                        className="absolute left-0 top-3 bottom-0 w-px"
                        style={{
                          background:
                            i < day.stops.length - 1
                              ? `linear-gradient(180deg, var(--color-accent), rgba(255,255,255,0.04))`
                              : 'transparent',
                        }}
                      />
                      {/* 圆点 */}
                      <span
                        className="absolute left-[-4px] top-2.5 h-[9px] w-[9px] rounded-full"
                        style={{
                          background: 'var(--color-accent)',
                          boxShadow: `0 0 10px var(--color-accent)`,
                        }}
                      />

                      {/* 内容 */}
                      <div
                        className="rounded-xl p-5"
                        style={{
                          background: DAY_THEME[day.dayNumber].accentBg,
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-white/28 tracking-wider mb-2">
                          <span className="flex items-center gap-1">
                            <Clock size={11} />
                            {stop.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={11} />
                            {stop.location}
                          </span>
                        </div>
                        <h4 className="text-base font-semibold text-white/85 font-sans">
                          {stop.title}
                        </h4>
                        <span
                          className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] tracking-wider font-medium"
                          style={{
                            background: DAY_THEME[day.dayNumber].accentBg,
                            color: DAY_THEME[day.dayNumber].accent,
                            border: `1px solid ${DAY_THEME[day.dayNumber].accent}25`,
                          }}
                        >
                          {stop.scene}
                        </span>
                        <p className="mt-3 text-sm leading-relaxed text-white/55 font-sans">
                          {stop.description}
                        </p>
                        <ul className="mt-3 space-y-1">
                          {stop.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-1.5 text-xs text-white/38"
                            >
                              <span
                                className="mt-1.5 h-1 w-1 rounded-full shrink-0"
                                style={{ background: DAY_THEME[day.dayNumber].accent }}
                              />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 右侧：观察 / 思考 / 方向 */}
                <div className="space-y-5 md:pt-7">
                  <NarrativeBlock
                    label="我们观察"
                    content={day.observation}
                    accentColor={DAY_THEME[day.dayNumber].accent}
                  />
                  <NarrativeBlock
                    label="我们思考"
                    content={day.reflection}
                    accentColor="var(--color-accent)"
                  />
                  <NarrativeBlock
                    label="未来方向"
                    content={day.futureDirection}
                    accentColor="#8A5DFA"
                    highlight
                  />
                </div>
              </div>

              {/* ---- 底部留白 ---- */}
              <div className="mt-10 pt-6 border-t border-white/5 text-center">
                <span className="text-[10px] tracking-[0.3em] text-white/15 font-sans">
                  Esc 或点击遮罩关闭
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

/** 叙事块 */
function NarrativeBlock({
  label,
  content,
  accentColor,
  highlight,
}: {
  label: string
  content: string
  accentColor: string
  highlight?: boolean
}) {
  return (
    <div
      className="relative pl-4 rounded-r-lg"
      style={{
        borderLeft: highlight
          ? '2px solid var(--gradient-btn-end)'
          : `1px solid rgba(255,255,255,0.10)`,
        background: highlight
          ? 'linear-gradient(90deg, rgba(138,93,250,0.06), transparent)'
          : 'transparent',
      }}
    >
      <p
        className="text-xs font-semibold tracking-[0.2em] mb-2 uppercase"
        style={{ color: accentColor }}
      >
        {label}
      </p>
      <p
        className={`text-sm md:text-base leading-relaxed font-sans ${
          highlight ? 'text-white/85' : 'text-white/60'
        }`}
      >
        {content}
      </p>
    </div>
  )
}
