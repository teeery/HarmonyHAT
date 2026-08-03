import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { JOURNEY_DAYS } from '../../data/content'
import { TimelineCard } from './TimelineCard'
import { ResearchDetail } from './ResearchDetail'

/**
 * 第三幕：调研旅程 — 横向时间线卡片
 *
 * 四天线下调研：
 *   Day 1（7.28）感知鸿蒙 — 汽车城 → R&A PARK → 全屋智能
 *   Day 2（7.29）行业落地 — 省适配中心 → 慕思睡眠
 *   Day 3（7.30）教育专场 — 9家企业供需对接路演
 *   Day 4（7.31）数字经济+智慧政务 — 湾区数谷 → 市民服务中心
 *
 * 交互：
 *   - 水平滚动浏览四天行程
 *   - 左右箭头辅助导航
 *   - 点击卡片 → 全屏详情叠层（点位时间线 + 观察/思考/方向）
 */
export function FieldResearch() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const activeDay = JOURNEY_DAYS.find((d) => d.id === activeId) ?? null

  // ---- 滚动状态检测 ----
  const checkScrollEdges = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollContainerRef.current
    if (!el) return
    checkScrollEdges()
    el.addEventListener('scroll', checkScrollEdges, { passive: true })
    return () => el.removeEventListener('scroll', checkScrollEdges)
  }, [checkScrollEdges])

  // ---- 箭头滚动 ----
  const scrollBy = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current
    if (!el) return
    const cardWidth = el.querySelector('article')?.clientWidth ?? 360
    const gap = 48
    el.scrollBy({
      left: direction === 'left' ? -(cardWidth + gap) : cardWidth + gap,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="field-research"
      className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'var(--color-bg-deep)' }}
    >
      {/* ---- 网格纹理背景 ---- */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* ---- 章节标题 ---- */}
      <motion.div
        className="relative z-10 px-8 md:px-16 pt-16 md:pt-20"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="text-xs md:text-sm tracking-[0.3em] text-[var(--color-accent)]/70 font-sans">
          第三幕 · 调研旅程
        </p>
        <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-wide text-white/95 font-sans">
          四天，走进鸿蒙生态的真实现场
        </h2>
        <p className="mt-3 text-sm md:text-base text-white/40 tracking-wider max-w-2xl font-sans leading-relaxed">
          从汽车城到适配中心、从教育路演到智慧政务——我们跟随鸿蒙落地的足迹，
          走遍东莞及周边 10+ 个真实场景，记录每一个观察、每一次思考。
        </p>
      </motion.div>

      {/* ---- 横向滚动卡片区 ---- */}
      <div className="relative z-10 mt-14 md:mt-18 pb-24">
        {/* 时间线轨道 */}
        <div className="absolute left-0 right-0 bottom-12 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        {/* 卡片滚动容器 */}
        <div
          ref={scrollContainerRef}
          className="flex gap-12 md:gap-16 px-8 md:px-16 overflow-x-auto scrollbar-hide"
          style={{
            scrollSnapType: 'x mandatory',
            paddingBottom: '12px',
          }}
        >
          {/* 左侧留白 */}
          <div className="flex-shrink-0 w-4 md:w-8" />

          {JOURNEY_DAYS.map((day, i) => (
            <div
              key={day.id}
              className="flex-shrink-0 pb-12"
              style={{ scrollSnapAlign: 'center' }}
            >
              <TimelineCard
                day={day}
                index={i}
                isActive={activeId === day.id}
                onClick={() =>
                  setActiveId((prev) => (prev === day.id ? null : day.id))
                }
              />
            </div>
          ))}

          {/* 右侧留白 */}
          <div className="flex-shrink-0 w-4 md:w-8" />
        </div>

        {/* ---- 左右导航箭头 ---- */}
        {canScrollLeft && (
          <motion.button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/80 transition-all backdrop-blur-sm"
            onClick={() => scrollBy('left')}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={22} />
          </motion.button>
        )}

        {canScrollRight && (
          <motion.button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/50 hover:text-white/80 transition-all backdrop-blur-sm"
            onClick={() => scrollBy('right')}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={22} />
          </motion.button>
        )}
      </div>

      {/* ---- 底部提示 ---- */}
      <motion.p
        className="relative z-10 text-center text-xs tracking-[0.25em] text-white/20 font-sans pb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        左右滑动浏览 · 点击卡片深入探索
      </motion.p>

      {/* ---- 详情叠层 ---- */}
      <ResearchDetail day={activeDay} onClose={() => setActiveId(null)} />
    </section>
  )
}
