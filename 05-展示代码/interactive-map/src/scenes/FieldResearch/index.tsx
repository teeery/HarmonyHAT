import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { JOURNEY_DAYS } from '../../data/content'
import { StopCard } from './StopCard'
import { ResearchDetail } from './ResearchDetail'

/** 扁平化：每个地点一条 */
interface TimelineItem {
  day: (typeof JOURNEY_DAYS)[number]
  stop: (typeof JOURNEY_DAYS)[number]['stops'][number]
  globalIndex: number
  isFirstOfDay: boolean
}

/**
 * 第三幕：调研旅程 — 地点级时间线
 *
 * 8 个地点拆为 8 张卡片，左右交替排列
 * 每日第一个地点在时间轴上标注日期
 */
export function FieldResearch() {
  const [activeDayId, setActiveDayId] = useState<string | null>(null)
  const activeDay = JOURNEY_DAYS.find((d) => d.id === activeDayId) ?? null

  const items = useMemo<TimelineItem[]>(() => {
    let gi = 0
    return JOURNEY_DAYS.flatMap((day) =>
      day.stops.map((stop, si) => ({
        day,
        stop,
        globalIndex: gi++,
        isFirstOfDay: si === 0,
      })),
    )
  }, [])

  return (
    <section
      id="field-research"
      data-snap-page="field-research"
      className="relative w-full h-screen overflow-y-auto"
      style={{ background: 'var(--color-bg-deep)' }}
      data-scrollable
    >
      {/* ---- 网格纹理 ---- */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ---- 章节标题 ---- */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 pt-20 md:pt-28 pb-8 md:pb-10 text-center"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs md:text-sm tracking-[0.3em] text-[var(--color-accent)]/60 font-sans">
          第三幕 · 调研旅程
        </p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-wide text-white/95 font-sans">
          走进鸿蒙生态的真实现场
        </h2>
        <p className="mt-4 text-sm md:text-base text-white/35 tracking-wider max-w-xl mx-auto font-sans leading-relaxed">
          从汽车城到适配中心、从教育路演到智慧政务，记录每一个观察与思考。
        </p>
      </motion.div>

      {/* ---- 时间线 ---- */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 pb-24">
        {/* 中心竖线 */}
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-px hidden md:block"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.08) 5%, rgba(255,255,255,0.08) 95%, transparent 100%)',
          }}
        />

        {items.map(({ day, stop, globalIndex, isFirstOfDay }, i) => {
          const isLeft = i % 2 === 1

          return (
            <div
              key={`${day.id}-${stop.title}`}
              className={`relative flex items-start ${i === 0 ? '' : '-mt-10 md:-mt-14'}`}
            >
              {/* ======== 时间线节点 + 日期标记 ======== */}
              <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                {/* 日期标注 — 每日第一个地点 */}
                {isFirstOfDay && (
                  <div className="mb-2 flex flex-col items-center">
                    <span className="text-[9px] tracking-[0.25em] text-white/50 font-sans whitespace-nowrap">
                      DAY {day.dayNumber}
                    </span>
                    <span className="text-[10px] tracking-wider text-white/25 font-mono mt-0.5">
                      {day.date}
                    </span>
                  </div>
                )}

                <div className="flex items-center">
                  <div
                    className="hidden md:block h-px"
                    style={{
                      width: 12,
                      background: `linear-gradient(${isLeft ? '270' : '90'}deg, rgba(255,255,255,0.25), transparent)`,
                    }}
                  />
                  <motion.div
                    className={`rounded-full shrink-0 ${isFirstOfDay ? 'h-3.5 w-3.5' : 'h-2.5 w-2.5'}`}
                    style={{
                      background: 'var(--color-accent)',
                      boxShadow: isFirstOfDay
                        ? '0 0 10px var(--color-accent), 0 0 20px rgba(108,92,231,0.5)'
                        : '0 0 6px var(--color-accent)',
                    }}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 + globalIndex * 0.06, duration: 0.3 }}
                  />
                  <div
                    className="hidden md:block h-px"
                    style={{
                      width: 12,
                      background: `linear-gradient(${isLeft ? '90' : '270'}deg, rgba(255,255,255,0.25), transparent)`,
                    }}
                  />
                </div>
              </div>

              {/* ======== 卡片 ======== */}
              <div
                className={`
                  w-full md:w-[calc(50%-22px)]
                  ${isLeft ? 'md:mr-auto' : 'md:ml-auto'}
                  ml-7 md:ml-0
                `}
              >
                <StopCard
                  day={day}
                  stop={stop}
                  index={globalIndex}
                  isActive={activeDayId === day.id}
                  onClick={() =>
                    setActiveDayId((prev) => (prev === day.id ? null : day.id))
                  }
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* ---- 详情弹窗 ---- */}
      <ResearchDetail day={activeDay} onClose={() => setActiveDayId(null)} />
    </section>
  )
}
