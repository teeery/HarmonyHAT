import { useMemo } from 'react'
import { motion } from 'framer-motion'
import type { FutureCityNode } from '../../types'

// ============================================================
// NetworkStage — Scene 02：城市生命网络
//
// 俯视拓扑：5 个节点围成环形，中心为"城市 OS"
// SVG 连线带流动动画，底部展示三层进化
// ============================================================

interface NetworkStageProps {
  title: string
  subtitle?: string
  nodes?: FutureCityNode[]
  centerLabel?: string
  evolution?: string[]
  image?: string
}

/** 计算环形排布坐标 */
function ringLayout(n: number, cx: number, cy: number, r: number) {
  return Array.from({ length: n }, (_, i) => {
    const angle = (2 * Math.PI * i) / n - Math.PI / 2
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  })
}

export function NetworkStage({ title, subtitle, nodes, centerLabel, evolution, image }: NetworkStageProps) {
  const svgW = 640
  const svgH = 440
  const cx = svgW / 2
  const cy = svgH / 2
  const r = 150

  const nodeList = nodes ?? []
  const positions = useMemo(() => ringLayout(nodeList.length, cx, cy, r), [nodeList.length])

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center px-6">
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
                'linear-gradient(180deg, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.4) 50%, rgba(10,10,15,0.65) 100%)',
            }}
          />
        </div>
      )}

      {/* ================================================================ */}
      {/* 章节标记 */}
      {/* ================================================================ */}
      <motion.p
        className="text-xs tracking-[0.3em] text-white/25 font-sans mb-8"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Scene 02 · 城市生命网络
      </motion.p>

      {/* ================================================================ */}
      {/* 标题 */}
      {/* ================================================================ */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-wide text-white/95 text-center leading-snug mb-3"
        initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className="text-base md:text-lg tracking-wider text-white/35 font-sans text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* ================================================================ */}
      {/* SVG 网络拓扑 */}
      {/* ================================================================ */}
      <motion.div
        className="relative w-full max-w-[640px] mx-auto"
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <svg
          viewBox={`0 0 ${svgW} ${svgH}`}
          className="w-full h-auto"
          style={{ maxHeight: '60vh' }}
        >
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(108,92,231,0.5)" />
              <stop offset="100%" stopColor="rgba(108,92,231,0)" />
            </radialGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(74,158,255,0.35)" />
              <stop offset="100%" stopColor="rgba(74,158,255,0)" />
            </radialGradient>
          </defs>

          {/* 外环虚线 */}
          <circle
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
            strokeDasharray="6 8"
          />

          {/* 节点 → 中心连线 */}
          {positions.map((p, i) => (
            <g key={`conn-${i}`}>
              <line
                x1={p.x} y1={p.y} x2={cx} y2={cy}
                stroke="rgba(108,92,231,0.18)"
                strokeWidth={1.2}
                strokeDasharray="3 5"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="16" to="0"
                  dur={`${2.5 + i * 0.4}s`}
                  repeatCount="indefinite"
                />
              </line>
              {/* 数据包流动光点 */}
              <circle r={3} fill="rgba(108,92,231,0.8)">
                <animateMotion
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                  path={`M${p.x},${p.y} L${cx},${cy}`}
                />
                <animate
                  attributeName="opacity"
                  values="0.2;1;0.2"
                  dur={`${2 + i * 0.3}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}

          {/* 邻节点连线（环形连接） */}
          {positions.map((p, i) => {
            const next = positions[(i + 1) % positions.length]
            return (
              <line
                key={`ring-${i}`}
                x1={p.x} y1={p.y} x2={next.x} y2={next.y}
                stroke="rgba(74,158,255,0.1)"
                strokeWidth={1}
                strokeDasharray="2 8"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="20" to="0"
                  dur={`${3 + i * 0.5}s`}
                  repeatCount="indefinite"
                />
              </line>
            )
          })}

          {/* 节点圆 */}
          {positions.map((p, i) => (
            <g key={`node-${i}`}>
              <circle cx={p.x} cy={p.y} r={28} fill="url(#nodeGlow)" />
              <circle
                cx={p.x} cy={p.y} r={18}
                fill="rgba(26,26,62,0.7)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth={1.5}
              />
              <text
                x={p.x} y={p.y}
                textAnchor="middle"
                dominantBaseline="central"
                fill="rgba(255,255,255,0.85)"
                fontSize={13}
                fontFamily="var(--font-sans)"
                fontWeight={500}
              >
                {nodeList[i]?.label ?? ''}
              </text>
            </g>
          ))}

          {/* 中心节点 */}
          <circle cx={cx} cy={cy} r={42} fill="url(#centerGlow)" />
          <motion.foreignObject x={cx - 32} y={cy - 16} width={64} height={32}>
            <div
              style={{
                width: 64,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 16,
                background: 'rgba(108,92,231,0.25)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.9)',
                fontSize: 13,
                fontWeight: 600,
                fontFamily: 'var(--font-sans)',
                backdropFilter: 'blur(6px)',
              }}
            >
              {centerLabel}
            </div>
          </motion.foreignObject>

          {/* 脉动圆环（中心） */}
          <circle cx={cx} cy={cy} r={50} fill="none" stroke="rgba(108,92,231,0.3)" strokeWidth={1}>
            <animate attributeName="r" values="42;58;42" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx={cx} cy={cy} r={50} fill="none" stroke="rgba(108,92,231,0.2)" strokeWidth={1}>
            <animate attributeName="r" values="42;64;42" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0;0.4" dur="2.5s" begin="0.8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </motion.div>

      {/* ================================================================ */}
      {/* 三层进化 */}
      {/* ================================================================ */}
      {evolution && evolution.length > 0 && (
        <motion.div
          className="flex items-center gap-3 md:gap-6 mt-10 flex-wrap justify-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.7 }}
        >
          {evolution.map((text, i) => (
            <div key={text} className="flex items-center gap-3">
              <span className="text-sm md:text-base tracking-wider text-white/40 font-sans whitespace-nowrap">
                {text}
              </span>
              {i < evolution.length - 1 && (
                <svg width={20} height={12} className="text-white/15">
                  <line x1={0} y1={6} x2={16} y2={6} stroke="currentColor" strokeWidth={1} strokeDasharray="2 3" />
                  <polygon points="14,2 18,6 14,10" fill="currentColor" opacity={0.4} />
                </svg>
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
