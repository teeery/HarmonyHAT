import { motion } from 'framer-motion'

// ============================================================
// CompareStage — Scene 03：智慧社区
//
// 左（2026·混乱）→ 右（2035·理解）
// 不是"预测未来"，而是"基于调研的设计推演"
// ============================================================

interface CompareStageProps {
  title: string
  beforeYear?: string
  beforeLabel?: string
  beforeDescription?: string
  beforeItems?: string[]
  afterYear?: string
  afterLabel?: string
  afterDescription?: string
  afterItems?: string[]
  harmonyConnection?: string
  image?: string
}

export function CompareStage({
  title,
  beforeYear,
  beforeLabel,
  beforeDescription,
  beforeItems,
  afterYear,
  afterLabel,
  afterDescription,
  afterItems,
  harmonyConnection,
  image,
}: CompareStageProps) {
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
                'linear-gradient(180deg, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.45) 50%, rgba(10,10,15,0.7) 100%)',
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
        Scene 03 · 智慧社区
      </motion.p>

      {/* ================================================================ */}
      {/* 标题 */}
      {/* ================================================================ */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide text-white/95 text-center leading-snug mb-10 md:mb-14 max-w-3xl"
        style={{ whiteSpace: 'pre-line' }}
        initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {/* ================================================================ */}
      {/* 对比面板 */}
      {/* ================================================================ */}
      <motion.div
        className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full max-w-4xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        {/* ---- 左侧：现在（问题） ---- */}
        <motion.div
          className="flex-1 w-full md:w-auto rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{
            background: 'rgba(40,15,20,0.4)',
            border: '1px solid rgba(239,68,68,0.12)',
          }}
          initial={{ x: -30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 左上角红色光点 */}
          <div
            className="absolute top-4 left-4 w-2 h-2 rounded-full"
            style={{ background: 'rgba(239,68,68,0.6)', boxShadow: '0 0 8px rgba(239,68,68,0.3)' }}
          />

          <span className="text-xs tracking-[0.2em] text-red-400/50 font-sans mb-3 block">
            {beforeYear}
          </span>
          <h3 className="text-lg md:text-xl font-bold text-white/60 mb-2">{beforeLabel}</h3>
          <p className="text-sm text-white/35 leading-relaxed mb-4">{beforeDescription}</p>

          {beforeItems && (
            <div className="flex flex-wrap gap-2">
              {beforeItems.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full text-xs text-white/40 font-sans"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* ---- 中间连接 ---- */}
        <motion.div
          className="flex flex-col items-center gap-2 shrink-0"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 箭头 SVG */}
          <svg width={40} height={40} className="rotate-0 md:-rotate-90">
            <line
              x1={4} y1={20} x2={32} y2={20}
              stroke="rgba(108,92,231,0.5)"
              strokeWidth={1.5}
              strokeDasharray="3 4"
            >
              <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1.5s" repeatCount="indefinite" />
            </line>
            <polygon points="28,14 36,20 28,26" fill="rgba(108,92,231,0.5)" />
            <circle cx={20} cy={20} r={4} fill="rgba(108,92,231,0.6)">
              <animate attributeName="r" values="3;5;3" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.9;0.4" dur="1.5s" repeatCount="indefinite" />
            </circle>
          </svg>
          <span className="text-[10px] tracking-[0.15em] text-white/20 font-sans whitespace-nowrap">
            鸿蒙连接
          </span>
        </motion.div>

        {/* ---- 右侧：未来（方案） ---- */}
        <motion.div
          className="flex-1 w-full md:w-auto rounded-2xl p-6 md:p-8 relative overflow-hidden"
          style={{
            background: 'rgba(20,15,40,0.4)',
            border: '1px solid rgba(108,92,231,0.15)',
          }}
          initial={{ x: 30, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* 左上角紫色光点 */}
          <div
            className="absolute top-4 left-4 w-2 h-2 rounded-full"
            style={{
              background: 'var(--color-accent)',
              boxShadow: '0 0 10px var(--color-accent)',
            }}
          />

          <span className="text-xs tracking-[0.2em] text-purple-400/50 font-sans mb-3 block">
            {afterYear}
          </span>
          <h3
            className="text-lg md:text-xl font-bold mb-2"
            style={{ color: 'var(--color-accent)' }}
          >
            {afterLabel}
          </h3>
          <p className="text-sm text-white/50 leading-relaxed mb-4">{afterDescription}</p>

          {afterItems && (
            <div className="flex flex-col gap-2">
              {afterItems.map((item, i) => (
                <div key={item} className="flex items-center gap-2.5">
                  {/* 小圆点 + 连线暗示 */}
                  <div className="flex items-center">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{
                        background: 'var(--color-accent)',
                        boxShadow: '0 0 6px var(--color-accent)',
                      }}
                    />
                    {i < afterItems.length - 1 && (
                      <div
                        className="w-px h-4 ml-[2.5px]"
                        style={{ background: 'rgba(108,92,231,0.2)' }}
                      />
                    )}
                  </div>
                  <span className="text-sm text-white/55 font-sans">{item}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* ================================================================ */}
      {/* 底部：鸿蒙连接示意 */}
      {/* ================================================================ */}
      {harmonyConnection && (
        <motion.div
          className="mt-10 md:mt-12 flex items-center gap-2 flex-wrap justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.3, duration: 0.6 }}
        >
          <span className="text-xs tracking-wider text-white/20 font-sans">
            {harmonyConnection}
          </span>
        </motion.div>
      )}
    </div>
  )
}
