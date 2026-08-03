import { motion } from 'framer-motion'

// ============================================================
// 尾页 — Scene 06：青年未来宣言
//
// 不是"感谢观看"。
// 而是留下核心观点，形成情感闭环。
//
// 情绪曲线终点：升华
// 黑底 → 文字逐行淡入 → 城市消失 → 留下光点 → 署名
// ============================================================

/** 宣言文本，按段落分组 */
const MANIFESTO_LINES = [
  { text: '我们走进城市，', delay: 0.3 },
  { text: '寻找技术与生活的连接。', delay: 0.8 },
  { text: '', delay: 2.0 }, // 停顿
  { text: '我们记录问题，', delay: 2.6 },
  { text: '探索未来的可能。', delay: 3.1 },
  { text: '', delay: 4.3 }, // 停顿
  { text: '我们相信：', delay: 4.9 },
  { text: '技术的终点，', delay: 5.6 },
  { text: '不是更多设备，', delay: 6.0 },
  { text: '而是更好的生活。', delay: 6.4 },
]

export function Epilogue() {
  return (
    <section
      id="epilogue"
      className="scene-container relative flex flex-col items-center justify-center bg-[var(--color-bg-deep)] overflow-hidden"
    >
      {/* ================================================================ */}
      {/* 全屏背景图片 */}
      {/* ================================================================ */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/future/青年宣言.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(10,10,15,0.6) 0%, rgba(10,10,15,0.5) 50%, rgba(10,10,15,0.8) 100%)',
          }}
        />
      </div>

      {/* ================================================================ */}
      {/* 背景光点 — 城市消失后留下的唯一光 */}
      {/* ================================================================ */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          left: '50%', top: '50%',
          width: 4, height: 4,
          transform: 'translate(-50%, -50%)',
          background: 'var(--color-accent)',
          boxShadow: '0 0 40px var(--color-accent), 0 0 80px rgba(108,92,231,0.4), 0 0 160px rgba(108,92,231,0.15)',
        }}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 8.0, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* ================================================================ */}
      {/* 宣言文字 — 逐行淡入 */}
      {/* ================================================================ */}
      <div className="relative z-10 text-center px-6">
        {MANIFESTO_LINES.map((line, i) => {
          // 空行做停顿间距
          if (!line.text) {
            return <div key={i} className="h-6 md:h-8" />
          }

          // 最后一句用特殊样式
          const isLast = i === MANIFESTO_LINES.length - 1

          return (
            <motion.p
              key={i}
              className={`
                text-lg sm:text-xl md:text-3xl tracking-wider font-sans leading-relaxed
                ${isLast ? 'font-medium mt-1' : 'font-normal'}
              `}
              style={{
                color: isLast ? 'var(--color-accent)' : 'rgba(255,255,255,0.6)',
                textShadow: isLast
                  ? '0 0 32px rgba(108,92,231,0.4)'
                  : 'none',
              }}
              initial={{ opacity: 0, y: 16, filter: 'blur(3px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{
                delay: line.delay,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line.text}
            </motion.p>
          )
        })}
      </div>

      {/* ================================================================ */}
      {/* 最终署名 — 宣言结束后出现 */}
      {/* ================================================================ */}
      <motion.div
        className="absolute bottom-12 md:bottom-16 left-0 right-0 text-center z-10 px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 9.0, duration: 1.0 }}
      >
        {/* 分隔线 */}
        <div
          className="mx-auto mb-6"
          style={{
            width: 40,
            height: 1,
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />

        {/* 馆名 */}
        <motion.p
          className="text-2xl md:text-4xl font-bold tracking-wide text-white/90 font-sans mb-3"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 9.3, duration: 0.8 }}
        >
                    鸿蒙未来城市探索馆
        </motion.p>

        {/* 团队 */}
        <motion.p
          className="text-sm md:text-base tracking-[0.2em] text-white/30 font-sans"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 9.8, duration: 0.8 }}
        >
          东莞理工学院 · 鸿蒙突击队
        </motion.p>

        <motion.p
          className="text-xs tracking-[0.2em] text-white/15 font-sans mt-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 10.1, duration: 0.8 }}
        >
          2026
        </motion.p>
      </motion.div>
    </section>
  )
}
