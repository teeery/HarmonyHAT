import { motion } from 'framer-motion'
import { WordCloud, type WordCloudWord } from '../../components/WordCloud'
import { WORD_CLOUD_DATA, INSIGHT_PAIRS, RESEARCH_STATS } from '../../data'

// ============================================================
// 第四幕：鸿蒙洞察 — 连接的新方式
//
// 星座主题：词云如星辰悬浮，高频词之间有微弱连线，
// 数据指标围绕词云轨道排布，洞察以"问题→方案"的
// 连接线形式呈现——全页围绕"连接"这一核心隐喻。
// ============================================================

const CLOUD_W = 800
const CLOUD_H = 380

// ---- 轨道指标配置 ----
const ORBIT_STATS = [
  { key: 'totalSites' as const, label: '调研场景', pos: 'top' },
  { key: 'totalInterviews' as const, label: '访谈记录', pos: 'top' },
  { key: 'totalMinutes' as const, label: '分钟交流', pos: 'bottom' },
  { key: 'totalTags' as const, label: '问题标签', pos: 'bottom' },
  { key: 'totalScenarios' as const, label: '未来场景', pos: 'bottom' },
]

export function HarmonyInsight() {
  return (
    <section
      id="harmony-insight"
      data-snap-page="harmony-insight"
      className="scene-container relative flex flex-col items-center bg-[var(--color-bg-deep)]"
    >
      {/* ================================================================ */}
      {/* 背景层 */}
      {/* ================================================================ */}
      {/* 网格纹理 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.015]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* 径向光晕：词云背后柔和的紫光 */}
      <div
        className="pointer-events-none absolute z-0"
        style={{
          left: '50%', top: '48%',
          width: 640, height: 500,
          transform: 'translate(-50%, -50%)',
          background:
            'radial-gradient(ellipse, rgba(108,92,231,0.07) 0%, rgba(74,158,255,0.03) 35%, transparent 65%)',
        }}
      />

      {/* ================================================================ */}
      {/* 标题区 */}
      {/* ================================================================ */}
      <header className="relative z-10 text-center px-4 pt-16 md:pt-20 pb-2">
        <motion.p
          className="text-xs md:text-sm tracking-[0.3em] text-[var(--color-accent)]/60 font-sans mb-3"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          第四幕 · 鸿蒙洞察
        </motion.p>

        <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-wide text-white/95 leading-snug">
          <LineReveal text="从设备智能，" delay={0.15} />
          <br />
          <LineReveal text="到万物互联。" delay={0.9} />
        </h2>

        <motion.p
          className="mt-3 text-lg md:text-2xl tracking-wider"
          style={{ color: 'var(--color-accent)' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.5, duration: 0.7 }}
        >
          鸿蒙提供了一种新的技术思路
        </motion.p>
      </header>

      {/* ================================================================ */}
      {/* 词云主体 + 轨道指标 */}
      {/* ================================================================ */}
      <div className="relative z-10 w-full max-w-[880px] mx-auto mt-4 md:mt-6 mb-4">
        {/* 轨道指标 — 词云上方 */}
        <div className="flex justify-center gap-6 md:gap-12 mb-1">
          {ORBIT_STATS.filter((s) => s.pos === 'top').map((s, i) => (
            <OrbitBadge
              key={s.key}
              value={RESEARCH_STATS[s.key]}
              label={s.label}
              side="top"
              index={i}
            />
          ))}
        </div>

        {/* 词云本体（无容器边框，悬浮于暗色空间） */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <WordCloud words={WORD_CLOUD_DATA as WordCloudWord[]} width={CLOUD_W} height={CLOUD_H} />
        </motion.div>

        {/* 轨道指标 — 词云下方 */}
        <div className="flex justify-center gap-4 md:gap-10 mt-0">
          {ORBIT_STATS.filter((s) => s.pos === 'bottom').map((s, i) => (
            <OrbitBadge
              key={s.key}
              value={RESEARCH_STATS[s.key]}
              label={s.label}
              side="bottom"
              index={i}
            />
          ))}
        </div>
      </div>

      {/* ================================================================ */}
      {/* 洞察流：问题 → 技术思考 */}
      {/* ================================================================ */}
      <motion.div
        className="relative z-10 w-full max-w-2xl mx-auto px-4 pb-12 md:pb-16"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <InsightFlow pairs={INSIGHT_PAIRS} />
      </motion.div>
    </section>
  )
}

// ============================================================
// 逐字揭示标题
// ============================================================
function LineReveal({ text, delay }: { text: string; delay: number }) {
  return (
    <span className="inline-block">
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{
            delay: delay + 0.04 * i,
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  )
}

// ============================================================
// 轨道指标徽章 — 轻量、发光、悬浮感
// ============================================================
function OrbitBadge({
  value,
  label,
  side,
  index,
}: {
  value: number
  label: string
  side: 'top' | 'bottom'
  index: number
}) {
  return (
    <motion.div
      className="flex items-center gap-2.5 rounded-full px-4 py-2 select-none"
      style={{
        background: 'rgba(26,26,62,0.3)',
        border: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(8px)',
      }}
      initial={{ opacity: 0, y: side === 'top' ? -8 : 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 1.8 + index * 0.12, duration: 0.5 }}
      whileHover={{
        borderColor: 'rgba(108,92,231,0.45)',
        boxShadow: '0 0 20px rgba(108,92,231,0.15)',
      }}
    >
      <span className="text-lg md:text-xl font-bold tracking-tight text-white/90 tabular-nums">
        {value.toLocaleString()}
      </span>
      <span className="text-[11px] md:text-xs tracking-wider text-white/35 font-sans">
        {label}
      </span>
    </motion.div>
  )
}

// ============================================================
// 洞察流：问题 ────✦──── 方案
//
// 左右两列，中间为带动画 dash 的 SVG 连线，
// 视觉上直接表达"连接"的核心隐喻。
// ============================================================
function InsightFlow({ pairs }: { pairs: { problem: string; solution: string }[] }) {
  return (
    <div className="relative">
      {/* 列标题 */}
      <div className="flex items-center mb-3">
        <span className="flex-1 text-right text-[11px] tracking-[0.2em] text-white/30 font-sans pr-6">
          城市问题
        </span>
        <span className="w-px h-3 bg-white/8" />
        <span className="flex-1 text-left text-[11px] tracking-[0.2em] font-sans pl-6" style={{ color: 'var(--color-accent)' }}>
          技术思考
        </span>
      </div>

      {/* SVG 连接线层 */}
      <div className="relative">
        <svg
          className="absolute inset-0 pointer-events-none overflow-visible"
          preserveAspectRatio="none"
        >
          {pairs.map((_, i) => {
            const y = 24 + i * 44 // 行高估算
            return (
              <g key={i}>
                {/* 水平连接线 */}
                <line
                  x1="32%" y1={y} x2="68%" y2={y}
                  stroke="rgba(108,92,231,0.15)"
                  strokeWidth={1}
                  strokeDasharray="3 5"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="16" to="0"
                    dur={`${2.5 + i * 0.4}s`}
                    repeatCount="indefinite"
                  />
                </line>
                {/* 中心光点 */}
                <circle cx="50%" cy={y} r={2.5} fill="rgba(108,92,231,0.5)">
                  <animate
                    attributeName="opacity"
                    values="0.3;0.9;0.3"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="2;3.5;2"
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            )
          })}
        </svg>

        {/* 文本行 */}
        <div className="flex flex-col gap-1.5">
          {pairs.map((pair, i) => (
            <motion.div
              key={pair.problem}
              className="flex items-center group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 * i, duration: 0.4 }}
            >
              {/* 左侧：问题 */}
              <div className="flex-1 text-right pr-5">
                <span className="inline-block text-sm text-white/60 font-sans py-1.5 px-3 rounded-lg transition-all duration-300 group-hover:text-white/85 group-hover:bg-[rgba(239,68,68,0.06)]">
                  {pair.problem}
                </span>
              </div>

              {/* 分隔 */}
              <div className="w-px h-4 bg-white/6 group-hover:bg-[var(--color-accent)]/30 transition-colors duration-300" />

              {/* 右侧：方案 */}
              <div className="flex-1 text-left pl-5">
                <span
                  className="inline-block text-sm font-medium font-sans py-1.5 px-3 rounded-lg transition-all duration-300 group-hover:bg-[rgba(108,92,231,0.1)]"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {pair.solution}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
