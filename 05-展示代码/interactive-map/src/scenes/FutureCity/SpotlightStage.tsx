import { motion } from 'framer-motion'

// ============================================================
// SpotlightStage — Scene 05：智慧教育
//
// 中心聚焦：AI 学习伙伴
// 从"一对多"到"一对一"的范式转变
// 底部：成长路径 + 金句
// ============================================================

interface SpotlightStageProps {
  title: string
  focusLabel?: string
  focusDescription?: string
  growthSteps?: string[]
  quote?: string
  image?: string
}

export function SpotlightStage({
  title,
  focusLabel,
  focusDescription,
  growthSteps,
  quote,
  image,
}: SpotlightStageProps) {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center px-4 md:px-8">
      {/* ================================================================ */}
      {/* 全屏背景图片 */}
      {/* ================================================================ */}
      {image && (
        <div className="absolute inset-0 z-0">
          <img src={image} alt="" className="w-full h-full object-cover" />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,15,0.5) 0%, rgba(10,10,15,0.4) 50%, rgba(10,10,15,0.65) 100%)',
            }}
          />
        </div>
      )}

      {/* ================================================================ */}
      {/* 章节标记 */}
      {/* ================================================================ */}
      <motion.p
        className="text-xs tracking-[0.3em] text-white/25 font-sans mb-6"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Scene 05 · 智慧教育
      </motion.p>

      {/* ================================================================ */}
      {/* 标题 */}
      {/* ================================================================ */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide text-white/95 text-center leading-snug mb-10"
        initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {/* ================================================================ */}
      {/* 中心焦点：AI 学习伙伴 */}
      {/* ================================================================ */}
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        {/* ---- 外圈脉动光环 ---- */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            border: '1px solid rgba(108,92,231,0.15)',
          }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 260,
            height: 260,
            border: '1px solid rgba(74,158,255,0.08)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.08, 0.3] }}
          transition={{ duration: 3.5, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* ---- 中心核心光球 ---- */}
        <div
          className="relative w-28 h-28 md:w-36 md:h-36 rounded-full flex items-center justify-center"
          style={{
            background:
              'radial-gradient(circle, rgba(108,92,231,0.25) 0%, rgba(74,158,255,0.12) 45%, rgba(10,10,15,0.6) 100%)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow:
              '0 0 60px rgba(108,92,231,0.25), 0 0 120px rgba(74,158,255,0.1), inset 0 0 30px rgba(108,92,231,0.1)',
          }}
        >
          {/* AI 核心图标 — 抽象十字星 */}
          <svg width={40} height={40} viewBox="0 0 40 40">
            <circle cx={20} cy={20} r={6} fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth={1.5}>
              <animate attributeName="r" values="5;7;5" dur="2s" repeatCount="indefinite" />
            </circle>
            <line x1={20} y1={4} x2={20} y2={14} stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
            <line x1={20} y1={26} x2={20} y2={36} stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
            <line x1={4} y1={20} x2={14} y2={20} stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
            <line x1={26} y1={20} x2={36} y2={20} stroke="rgba(255,255,255,0.4)" strokeWidth={1} />
          </svg>
        </div>

        {/* ---- 标签 ---- */}
        {focusLabel && (
          <motion.span
            className="mt-5 text-sm md:text-base tracking-wider font-sans"
            style={{ color: 'var(--color-accent)' }}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {focusLabel}
          </motion.span>
        )}
      </motion.div>

      {/* ================================================================ */}
      {/* 描述文字 */}
      {/* ================================================================ */}
      {focusDescription && (
        <motion.p
          className="mt-8 text-sm md:text-base text-white/35 leading-relaxed max-w-xl text-center font-sans"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          {focusDescription}
        </motion.p>
      )}

      {/* ================================================================ */}
      {/* 成长路径 — 水平步骤 */}
      {/* ================================================================ */}
      {growthSteps && growthSteps.length > 0 && (
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 md:gap-5 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.7 }}
        >
          {growthSteps.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <motion.div
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full"
                style={{
                  background: 'rgba(26,26,62,0.3)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.3 + i * 0.12, duration: 0.4 }}
              >
                <span
                  className="text-[10px] tracking-[0.15em] font-mono"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-white/55 font-sans whitespace-nowrap">
                  {step}
                </span>
              </motion.div>

              {/* 步骤间连线 */}
              {i < growthSteps.length - 1 && (
                <svg width={16} height={10} className="shrink-0 hidden sm:block">
                  <line
                    x1={0} y1={5} x2={14} y2={5}
                    stroke="rgba(255,255,255,0.12)"
                    strokeWidth={1}
                    strokeDasharray="2 3"
                  />
                </svg>
              )}
            </div>
          ))}
        </motion.div>
      )}

      {/* ================================================================ */}
      {/* 金句 */}
      {/* ================================================================ */}
      {quote && (
        <motion.p
          className="mt-12 md:mt-16 text-base md:text-xl tracking-wider text-white/30 font-sans text-center italic max-w-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          {quote}
        </motion.p>
      )}
    </div>
  )
}
