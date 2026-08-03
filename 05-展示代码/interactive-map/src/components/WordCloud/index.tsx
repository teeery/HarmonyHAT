import { useMemo } from 'react'
import { motion } from 'framer-motion'

// ============================================================
// WordCloud — 词云组件（星座主题）
//
// 词语如星辰般悬浮于暗色空间，高频词之间有
// 微弱的"连接线"，呼应"万物互联"的页面主题。
// ============================================================

export interface WordCloudWord {
  text: string
  value: number
}

interface PlacedWord extends WordCloudWord {
  x: number
  y: number
  fontSize: number
  color: string
  glow: string
  rotation: number
}

interface WordCloudProps {
  words: WordCloudWord[]
  width?: number
  height?: number
}

// ---- 工具函数 ----

/** 平滑字号映射 0.7rem ~ 3.2rem */
function mapFontSize(ratio: number): number {
  return 0.7 + ratio * 2.5
}

/**
 * 平滑颜色插值：科技蓝 → 鸿蒙紫 → 浅紫 → 亮白
 * 使用 HSL 保证过渡自然
 */
function mapColor(ratio: number): { color: string; glow: string } {
  // 4 段渐变
  const stops = [
    { pos: 0.0, h: 210, s: 100, l: 50, a: 0.82 },  // 科技蓝 #4a9eff
    { pos: 0.33, h: 248, s: 65, l: 55, a: 0.88 },  // 鸿蒙紫 #6c5ce7
    { pos: 0.60, h: 260, s: 50, l: 72, a: 0.92 },  // 浅紫
    { pos: 1.0, h: 240, s: 10, l: 95, a: 0.95 },   // 近白
  ]

  // 找到 ratio 所在区间并插值
  let lo = stops[0], hi = stops[stops.length - 1]
  for (let i = 0; i < stops.length - 1; i++) {
    if (ratio >= stops[i].pos && ratio <= stops[i + 1].pos) {
      lo = stops[i]; hi = stops[i + 1]; break
    }
  }
  const t = lo.pos === hi.pos ? 0 : (ratio - lo.pos) / (hi.pos - lo.pos)
  const h = lo.h + (hi.h - lo.h) * t
  const s = lo.s + (hi.s - lo.s) * t
  const l = lo.l + (hi.l - lo.l) * t
  const a = lo.a + (hi.a - lo.a) * t

  return {
    color: `hsla(${h}, ${s}%, ${l}%, ${a})`,
    // 只有高频词发光
    glow: ratio > 0.55
      ? `0 0 ${18 + ratio * 28}px hsla(${h}, ${s}%, ${l}%, ${0.12 + ratio * 0.25})`
      : 'none',
  }
}

/** 估算中文词语宽度（px） */
function estimateWidth(text: string, fontSizeRem: number): number {
  let w = 0
  for (const ch of text) {
    w += /[一-鿿]/.test(ch) ? fontSizeRem : fontSizeRem * 0.6
  }
  return w * 16
}

function estimateHeight(fontSizeRem: number): number {
  return fontSizeRem * 16 * 1.35
}

// ---- 碰撞检测 ----

interface BBox { x: number; y: number; w: number; h: number }

function overlaps(a: BBox, b: BBox, pad: number): boolean {
  return !(
    a.x + a.w + pad < b.x || b.x + b.w + pad < a.x ||
    a.y + a.h + pad < b.y || b.y + b.h + pad < a.y
  )
}

// ---- 螺旋排布 ----

function computeLayout(words: WordCloudWord[], cw: number, ch: number): PlacedWord[] {
  const sorted = [...words].sort((a, b) => b.value - a.value)
  const maxV = sorted[0]?.value ?? 1
  const minV = sorted[sorted.length - 1]?.value ?? 0

  const placed: PlacedWord[] = []
  const boxes: BBox[] = []

  const cx = cw / 2
  const cy = ch / 2

  for (const word of sorted) {
    const ratio = maxV === minV ? 0.5 : (word.value - minV) / (maxV - minV)
    const fs = mapFontSize(ratio)
    const { color, glow } = mapColor(ratio)
    const ew = estimateWidth(word.text, fs)
    const eh = estimateHeight(fs)

    // 旋转策略：中低频词轻微倾斜，高频词保持水平（可读性优先）
    const rotation = ratio < 0.5 ? (Math.random() - 0.5) * (10 + (0.5 - ratio) * 30) : 0

    // 螺旋间距根据词大小动态调整，大词间距更大
    const spiralStep = 3 + fs * 2.5

    let theta = 0
    let found: { x: number; y: number } | null = null
    const pad = 6 + fs * 1.5

    while (theta < 150) {
      const r = spiralStep * theta
      const x = cx + r * Math.cos(theta)
      const y = cy + r * Math.sin(theta)
      const box: BBox = { x: x - ew / 2, y: y - eh / 2, w: ew, h: eh }

      if (box.x < 12 || box.y < 12 || box.x + box.w > cw - 12 || box.y + box.h > ch - 12) {
        theta += 0.5; continue
      }

      if (!boxes.some((b) => overlaps(box, b, pad))) {
        found = { x, y }; boxes.push(box); break
      }
      theta += 0.5
    }

    // 回退：放到最外层
    if (!found) {
      const r = spiralStep * theta
      found = { x: cx + r * Math.cos(theta), y: cy + r * Math.sin(theta) }
    }

    placed.push({ text: word.text, value: word.value, x: found.x, y: found.y, fontSize: fs, color, glow, rotation })
  }

  return placed
}

// ---- 组件 ----

export function WordCloud({ words, width = 800, height = 520 }: WordCloudProps) {
  const placed = useMemo(() => computeLayout(words, width, height), [words, width, height])

  // 取前 5 个高频词画连线（"连接"的视觉隐喻）
  const top5 = useMemo(() => placed.slice(0, 5), [placed])

  return (
    <div className="relative mx-auto" style={{ width, height, maxWidth: '100%' }}>
      {/* ---- 中心光晕（柔和的呼吸感） ---- */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: '50%', top: '50%',
          width: width * 0.35, height: height * 0.45,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(108,92,231,0.08) 0%, rgba(74,158,255,0.03) 40%, transparent 70%)',
        }}
      />

      {/* ---- 高频词连线 ---- */}
      <svg
        className="absolute inset-0 pointer-events-none overflow-visible"
        width={width}
        height={height}
      >
        {top5.map((w, i) => {
          // 每个词连向下一个，最后一个连回第一个（形成闭环）
          const next = top5[(i + 1) % top5.length]
          return (
            <line
              key={`link-${i}`}
              x1={w.x} y1={w.y}
              x2={next.x} y2={next.y}
              stroke="rgba(108,92,231,0.12)"
              strokeWidth={1}
              strokeDasharray="4 6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="20" to="0"
                dur={`${3 + i * 0.7}s`}
                repeatCount="indefinite"
              />
            </line>
          )
        })}
      </svg>

      {/* ---- 词语 ---- */}
      {placed.map((w, i) => (
        <motion.span
          key={`${w.text}`}
          className="absolute inline-block whitespace-nowrap select-none cursor-default font-sans"
          style={{
            left: w.x,
            top: w.y,
            fontSize: `${w.fontSize}rem`,
            color: w.color,
            fontWeight: w.value > (placed[0]?.value ?? 100) * 0.55 ? 700 : 400,
            transform: `translate(-50%, -50%) rotate(${w.rotation}deg)`,
            textShadow: w.glow,
            letterSpacing: w.fontSize > 1.4 ? '0.04em' : '0.01em',
            transition: 'color 0.3s, text-shadow 0.3s',
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.45,
            delay: i * 0.035,
            ease: [0.16, 1, 0.3, 1],
          }}
          whileHover={{
            scale: 1.12,
            color: '#ffffff',
            textShadow: '0 0 28px rgba(108,92,231,0.65), 0 0 56px rgba(74,158,255,0.3)',
          }}
        >
          {w.text}
        </motion.span>
      ))}
    </div>
  )
}
