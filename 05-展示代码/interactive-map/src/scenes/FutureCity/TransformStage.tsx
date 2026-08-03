import { motion } from 'framer-motion'

// ============================================================
// TransformStage — Scene 04：智慧交通
//
// 三阶段演变动画：
//   现在（3个孤立圆）
//     ↓
//   鸿蒙连接（连线生长、数据流动）
//     ↓
//   未来（融合为一个协同网络）
// ============================================================

interface PhaseConfig {
  label: string
  items: string[]
}

interface TransformStageProps {
  title: string
  subtitle?: string
  phases?: PhaseConfig[]
  closingQuote?: string
  image?: string
}

export function TransformStage({ title, subtitle, phases, closingQuote, image }: TransformStageProps) {
  const phaseList = phases ?? []

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
                'linear-gradient(180deg, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.4) 50%, rgba(10,10,15,0.7) 100%)',
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
        Scene 04 · 智慧交通
      </motion.p>

      {/* ================================================================ */}
      {/* 标题 */}
      {/* ================================================================ */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide text-white/95 text-center leading-snug mb-3"
        initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-base md:text-lg tracking-wider text-white/35 font-sans text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* ================================================================ */}
      {/* 三阶段演变图 */}
      {/* ================================================================ */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-6 md:gap-4 w-full max-w-4xl justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {phaseList.map((phase, pi) => (
          <div key={phase.label} className="flex flex-col items-center">
            {/* ---- 阶段容器 ---- */}
            <motion.div
              className="rounded-2xl p-5 md:p-7 flex flex-col items-center relative"
              style={{
                background:
                  pi === 0
                    ? 'rgba(30,20,20,0.35)'
                    : pi === 1
                    ? 'rgba(20,20,40,0.35)'
                    : 'rgba(15,25,30,0.35)',
                border:
                  pi === 0
                    ? '1px solid rgba(239,68,68,0.1)'
                    : pi === 1
                    ? '1px solid rgba(108,92,231,0.2)'
                    : '1px solid rgba(74,158,255,0.15)',
                minWidth: phaseList.length === 1 ? 280 : 180,
              }}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 + pi * 0.25, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* 阶段标签 */}
              <span
                className="text-[10px] tracking-[0.2em] font-sans mb-3"
                style={{
                  color:
                    pi === 0
                      ? 'rgba(239,68,68,0.5)'
                      : pi === 1
                      ? 'var(--color-accent)'
                      : 'rgba(74,158,255,0.6)',
                }}
              >
                {phase.label}
              </span>

              {/* 节点/条目 */}
              <div className="flex flex-wrap justify-center gap-2">
                {phase.items.map((item, ii) => (
                  <div key={item} className="flex items-center gap-1.5">
                    {/* 条目圆点 */}
                    <motion.div
                      className="rounded-full shrink-0"
                      style={{
                        width: phase.items.length === 1 ? 10 : 7,
                        height: phase.items.length === 1 ? 10 : 7,
                        background:
                          pi === 0
                            ? 'rgba(239,68,68,0.4)'
                            : pi === 1
                            ? 'var(--color-accent)'
                            : 'rgba(74,158,255,0.5)',
                        boxShadow:
                          pi === 2
                            ? '0 0 12px rgba(74,158,255,0.4)'
                            : pi === 1
                            ? '0 0 8px rgba(108,92,231,0.3)'
                            : 'none',
                      }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: 0.9 + pi * 0.25 + ii * 0.1,
                        duration: 0.3,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                    <span className="text-sm text-white/55 font-sans whitespace-nowrap">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </motion.div>

      {/* ---- 阶段间连接 ---- */}
      {phaseList.length > 1 && (
        <motion.div
          className="flex items-center gap-0 w-full max-w-3xl justify-center mt-4 md:mt-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          {phaseList.slice(0, -1).map((_, i) => (
            <div key={i} className="flex items-center mx-2 md:mx-6">
              {/* 连线 + 流动动画 */}
              <svg width={60} height={20}>
                <line
                  x1={0} y1={10} x2={48} y2={10}
                  stroke="rgba(108,92,231,0.3)"
                  strokeWidth={1.5}
                  strokeDasharray="3 5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="16" to="0"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </line>
                <polygon points="44,5 54,10 44,15" fill="rgba(108,92,231,0.45)" />
                {/* 流动光点 */}
                <circle r={2.5} fill="rgba(108,92,231,0.7)">
                  <animate
                    attributeName="cx"
                    values="2;48"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1.8s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>
            </div>
          ))}
        </motion.div>
      )}

      {/* ================================================================ */}
      {/* 底部金句 */}
      {/* ================================================================ */}
      {closingQuote && (
        <motion.p
          className="mt-10 md:mt-14 text-base md:text-xl tracking-wider text-white/30 font-sans text-center italic"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          {closingQuote}
        </motion.p>
      )}
    </div>
  )
}
