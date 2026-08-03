import { motion } from 'framer-motion'
import { AnimatedBackground } from './AnimatedBackground'
import { GlassButton } from './GlassButton'

/** 渐进式入场的 stagger 配置 */
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const },
})

/**
 * 序章 Hero — 鸿蒙未来城市探索馆
 *
 * 叙事节奏（Apple 发布会式）：
 *   0.0s — 英文标识行
 *   0.3s — 主标题：鸿蒙未来城市探索馆
 *   0.5s — 副标题 slogan
 *   0.8s — 核心文案：一座城市……
 *   1.0s — 追问：但连接……
 *   1.2s — 开始探索按钮
 *   1.8s — 底部地点信息
 */
export function HeroSection() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-[var(--color-bg-deep)]">
      {/* ---- 动画背景 ---- */}
      <AnimatedBackground />

      {/* ---- 前景内容 ---- */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        {/* 英文标识行 */}
        <motion.p
          {...fadeUp(0)}
          className="text-[10px] font-medium tracking-[0.4em] text-white/30 uppercase sm:text-xs"
        >
          HarmonyOS · Future City Exploration
        </motion.p>

        {/* 主标题 */}
        <motion.h1
          {...fadeUp(0.3)}
          className="mt-6 text-4xl font-bold tracking-wide text-white/95 sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ lineHeight: 1.15 }}
        >
          鸿蒙未来城市
          <br />
          探索馆
        </motion.h1>

        {/* Slogan */}
        <motion.p
          {...fadeUp(0.5)}
          className="mt-5 text-sm tracking-[0.25em] text-white/40 sm:text-base"
        >
          探索 · 连接 · 洞察 · 共创未来城市新生态
        </motion.p>

        {/* 核心叙事文案 */}
        <motion.p
          {...fadeUp(0.8)}
          className="mt-10 max-w-2xl text-lg font-medium leading-relaxed text-white/80 sm:text-xl md:text-2xl"
        >
          一座城市，
          <br />
          每天产生千万次
          <br />
          人与设备之间的连接
        </motion.p>

        {/* 追问 */}
        <motion.p
          {...fadeUp(1.0)}
          className="mt-4 text-base font-light tracking-wide text-white/50 sm:text-lg"
        >
          但连接，是否意味着真正的智慧？
        </motion.p>

        {/* CTA 按钮 */}
        <div className="mt-12">
          <GlassButton
            onClick={() => {
              document
                .getElementById('explore-map')
                ?.scrollIntoView({ behavior: 'smooth' })
            }}
          />
        </div>

        {/* 底部地点信息 */}
        <motion.p
          {...fadeUp(1.8)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[0.2em] text-white/20 sm:text-sm"
        >
          东莞南城 · 2026夏
        </motion.p>
      </div>
    </div>
  )
}
