import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, MapPin, Clock } from 'lucide-react'
import type { JourneyDay } from '../../types'

interface Props {
  day: JourneyDay | null
  onClose: () => void
}

const DAY_THEME: Record<number, { accent: string; accentBg: string }> = {
  1: { accent: 'var(--color-tech)', accentBg: 'rgba(74,158,255,0.15)' },
  2: { accent: 'var(--color-accent)', accentBg: 'rgba(108,92,231,0.15)' },
  3: { accent: '#10b981', accentBg: 'rgba(16,185,129,0.15)' },
  4: { accent: '#f59e0b', accentBg: 'rgba(245,158,11,0.15)' },
}

/**
 * 调研详情 — 全屏玻璃叠层
 *
 * 上半：Day 标题 + 元信息
 * 中部：点位时间线（左）+ 观察/思考/方向（右）
 * 底部：关闭按钮
 *
 * 动画：暗色遮罩淡入 + 面板从底部浮入
 */
export function ResearchDetail({ day, onClose }: Props) {
  return (
    <AnimatePresence>
      {day && (
        <>
          {/* 暗色遮罩 */}
          <motion.div
            className="absolute inset-0 z-40 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* 内容面板 — 底部滑入 */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-50 overflow-y-auto"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,15,0.94) 0%, var(--color-bg-deep) 100%)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              borderTop: '1px solid var(--color-border)',
              maxHeight: '90vh',
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white/80 transition-all"
            >
              <X size={20} />
            </button>

            <div className="max-w-5xl mx-auto px-6 py-10 md:px-12 md:py-14">
              {/* ---- Day 标题 ---- */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex items-center justify-center h-8 w-8 rounded-full text-white font-bold text-xs"
                    style={{ background: DAY_THEME[day.dayNumber].accent }}
                  >
                    {day.dayNumber}
                  </span>
                  <span className="text-xs tracking-[0.2em] text-white/35 font-sans">
                    DAY {day.dayNumber} · {day.date}
                  </span>
                </div>
                <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-wide text-white/95 font-sans">
                  {day.theme}
                </h2>
                <p className="mt-2 text-sm md:text-base text-white/45 leading-relaxed max-w-2xl font-sans">
                  {day.subtitle}
                </p>
              </motion.div>

              {/* ---- 点位时间线 + 反思 ---- */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-12">
                {/* 左侧：点位时间线 */}
                <div className="md:col-span-3 space-y-6">
                  <p className="text-xs tracking-[0.25em] text-white/30 font-sans uppercase">
                    实地调研路线
                  </p>

                  {day.stops.map((stop, i) => (
                    <motion.div
                      key={stop.title}
                      className="relative pl-8"
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.25 + i * 0.12,
                        duration: 0.5,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      {/* 时间线竖线 */}
                      <div
                        className="absolute left-0 top-2 bottom-0 w-px"
                        style={{
                          background:
                            i < day.stops.length - 1
                              ? 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.04) 100%)'
                              : 'transparent',
                        }}
                      />
                      {/* 圆点 */}
                      <div
                        className="absolute left-[-4px] top-2 h-[9px] w-[9px] rounded-full"
                        style={{ background: DAY_THEME[day.dayNumber].accent }}
                      />

                      {/* 点位内容 */}
                      <div
                        className="p-5 rounded-xl border border-[var(--color-border)]"
                        style={{ background: 'rgba(255,255,255,0.025)' }}
                      >
                        <div className="flex items-center gap-3 text-xs text-white/35 tracking-wider mb-1.5">
                          <span className="flex items-center gap-1">
                            <Clock size={12} />
                            {stop.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            {stop.location}
                          </span>
                        </div>
                        <h4 className="text-base md:text-lg font-semibold text-white/85 font-sans">
                          {stop.title}
                        </h4>
                        <span
                          className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] tracking-wider font-medium"
                          style={{
                            background: DAY_THEME[day.dayNumber].accentBg,
                            color: DAY_THEME[day.dayNumber].accent,
                          }}
                        >
                          {stop.scene}
                        </span>
                        <p className="mt-3 text-sm leading-relaxed text-white/60 font-sans">
                          {stop.description}
                        </p>
                        {/* 亮点 */}
                        <ul className="mt-3 space-y-1">
                          {stop.highlights.map((h) => (
                            <li
                              key={h}
                              className="flex items-start gap-2 text-xs text-white/45"
                            >
                              <span className="mt-1.5 h-1 w-1 rounded-full bg-white/20 flex-shrink-0" />
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 右侧：观察 → 思考 → 方向 */}
                <div className="md:col-span-2 space-y-6 md:pt-8">
                  <NarrativeBlock
                    label="我们观察"
                    content={day.observation}
                    delay={0.4}
                    accentColor={DAY_THEME[day.dayNumber].accent}
                  />
                  <NarrativeBlock
                    label="我们思考"
                    content={day.reflection}
                    delay={0.55}
                    accentColor="var(--color-accent)"
                  />
                  <NarrativeBlock
                    label="未来方向"
                    content={day.futureDirection}
                    delay={0.7}
                    accentColor="#8A5DFA"
                    highlight
                  />
                </div>
              </div>

              {/* ---- 底部 CTA ---- */}
              <motion.div
                className="mt-12 pt-8 border-t border-white/5 flex justify-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.5 }}
              >
                <button
                  className="btn-explore flex items-center justify-center gap-2 px-8 py-3 text-white text-sm font-medium rounded-full"
                  onClick={onClose}
                >
                  返回时间线
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/** 单层叙事块 */
function NarrativeBlock({
  label,
  content,
  delay,
  accentColor,
  highlight,
}: {
  label: string
  content: string
  delay: number
  accentColor: string
  highlight?: boolean
}) {
  return (
    <motion.div
      className={`relative pl-5 border-l-2 ${
        highlight ? 'border-l-[var(--gradient-btn-end)] opacity-80' : ''
      }`}
      style={highlight ? {} : { borderLeftColor: 'var(--color-border)' }}
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <p
        className="text-xs font-semibold tracking-[0.2em] mb-2 uppercase"
        style={{ color: accentColor }}
      >
        {label}
      </p>
      <p
        className={`text-sm md:text-base leading-relaxed font-sans ${
          highlight ? 'text-white/90' : 'text-white/65'
        }`}
      >
        {content}
      </p>
    </motion.div>
  )
}
