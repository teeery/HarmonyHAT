import { useMemo } from 'react'
import { motion } from 'framer-motion'

// ============================================================
// HeroStage — Scene 01：未来之门
//
// 暗色背景 + CSS 城市天际线剪影 + 窗户灯光逐个亮起
// 中心大字标题 + 底部引导文字
// ============================================================

interface HeroStageProps {
  title: string[]
  prologue?: string
  prologueHighlight?: string
  image?: string
}

/** 生成一组建筑数据：x 位置、宽度、高度 */
function generateBuildings(count: number, maxW: number, maxH: number) {
  return Array.from({ length: count }, (_, i) => ({
    x: (i / count) * 100 + ((Math.sin(i * 2.7) * 3) | 0),
    w: 3 + ((i * 7 + 3) % 9),
    h: 0.25 + ((i * 13 + 5) % 60) / 100,
  }))
}

/** 为每栋建筑生成窗户光点 */
function generateWindows(
  buildings: ReturnType<typeof generateBuildings>,
  totalWindows: number,
) {
  const windows: { bx: number; bw: number; bh: number; wx: number; wy: number; delay: number }[] = []
  for (const b of buildings) {
    const count = 1 + ((b.w * 3 + b.h * 10) | 0)
    for (let j = 0; j < count; j++) {
      windows.push({
        bx: b.x,
        bw: b.w,
        bh: b.h,
        wx: 15 + ((j * 37 + 11) % 70),
        wy: 8 + ((j * 23 + 7) % 75),
        delay: (windows.length / totalWindows) * 2.5 + Math.random() * 0.5,
      })
    }
  }
  return windows.slice(0, totalWindows)
}

export function HeroStage({ title, prologue, prologueHighlight, image }: HeroStageProps) {
  const buildings = useMemo(() => generateBuildings(22, 100, 60), [])
  const windows = useMemo(() => generateWindows(buildings, 80), [buildings])

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden">
      {/* ================================================================ */}
      {/* 全屏背景图片 */}
      {/* ================================================================ */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* 暗色叠加层 — 保证文字可读 */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,15,0.5) 0%, rgba(10,10,15,0.35) 40%, rgba(10,10,15,0.7) 100%)',
            }}
          />
        </div>
      )}

      {/* ================================================================ */}
      {/* 城市天际线（CSS 纯绘，无图片时的 fallback） */}
      {/* ================================================================ */}
      {!image && (
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{ height: '55%' }}
        >

        {/* 地平线微光 */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: 1,
            background:
              'linear-gradient(90deg, transparent 5%, rgba(108,92,231,0.35) 30%, rgba(74,158,255,0.4) 50%, rgba(108,92,231,0.35) 70%, transparent 95%)',
          }}
        />

        {/* 建筑剪影 */}
        {buildings.map((b, i) => (
          <div
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${b.x}%`,
              width: `${b.w}%`,
              height: `${b.h * 55}vh`,
              background: `linear-gradient(180deg,
                rgba(20,20,40,0.95) 0%,
                rgba(15,15,30,0.98) 100%)`,
              borderLeft: '1px solid rgba(255,255,255,0.03)',
              borderRight: '1px solid rgba(255,255,255,0.03)',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          />
        ))}

        {/* 窗户灯光 */}
        {windows.map((w, i) => (
          <motion.div
            key={i}
            className="absolute rounded-sm"
            style={{
              left: `${w.bx + (w.wx / 100) * w.bw}%`,
              bottom: `${(w.bh * 55 * w.wy) / 100}vh`,
              width: 2.5 + Math.random() * 2,
              height: 2 + Math.random() * 1.5,
              background: Math.random() > 0.3
                ? 'rgba(255,220,180,0.7)'
                : 'rgba(180,210,255,0.5)',
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 0.9, 0.5, 0.8] }}
            viewport={{ once: true }}
            transition={{
              delay: 0.2 + w.delay,
              duration: 1.2 + Math.random() * 1.5,
              ease: 'easeOut',
            }}
          />
        ))}
      </div>
      )}

      {/* ================================================================ */}
      {/* 远光：城市上方的暖色光晕 */}
      {/* ================================================================ */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '30%',
          left: '50%',
          width: 800,
          height: 300,
          transform: 'translate(-50%, 0)',
          background:
            'radial-gradient(ellipse at center, rgba(255,180,120,0.06) 0%, rgba(108,92,231,0.04) 40%, transparent 70%)',
        }}
      />

      {/* ================================================================ */}
      {/* 标题区 */}
      {/* ================================================================ */}
      <div className="relative z-10 text-center px-6 mb-8">
        {/* 幕次标记 */}
        <motion.p
          className="text-xs md:text-sm tracking-[0.3em] text-[var(--color-accent)]/50 font-sans mb-8"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          第五幕 · 未来南城 2035
        </motion.p>

        {/* 主标题 */}
        <motion.h2
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-wide text-white/95 leading-tight mb-5"
          initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {title[0]}
        </motion.h2>

        {/* 副标题 */}
        <motion.p
          className="text-lg sm:text-xl md:text-2xl tracking-wider text-white/40 font-sans"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {title[1]}
        </motion.p>
      </div>

      {/* ================================================================ */}
      {/* 底部引导文字 */}
      {/* ================================================================ */}
      {(prologue || prologueHighlight) && (
        <motion.div
          className="absolute bottom-16 md:bottom-20 left-0 right-0 text-center z-10 px-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          {prologue && (
            <p className="text-sm md:text-base text-white/30 tracking-wide font-sans mb-2">
              {prologue}
            </p>
          )}
          {prologueHighlight && (
            <p className="text-base md:text-lg tracking-wider font-sans"
              style={{ color: 'var(--color-accent)' }}>
              {prologueHighlight}
            </p>
          )}
        </motion.div>
      )}

      {/* ================================================================ */}
      {/* 底部渐变：建筑融入暗色 */}
      {/* ================================================================ */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '30%',
          background:
            'linear-gradient(to top, rgba(10,10,15,0.6) 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
