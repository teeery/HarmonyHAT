import { useMemo } from 'react'

/** 随机生成浮游粒子坐标 */
function useParticles(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        duration: 6 + Math.random() * 14,
        delay: Math.random() * 8,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [count],
  )
}

/**
 * 动画背景层：
 * - 深色径向渐变底
 * - 城市背景图缓慢平移呼吸
 * - 科技蓝紫渐变叠层
 * - 浮游数据光点
 * - 水平流动光条
 */
export function AnimatedBackground() {
  const particles = useParticles(40)

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden>
      {/* Layer 1 — 深色渐变底 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 40%, #0d1b3e 0%, #070d1a 45%, #030712 100%)',
        }}
      />

      {/* Layer 2 — 城市背景图 + 呼吸式缓慢平移 */}
      <div className="absolute inset-0 animate-[city-breathe_24s_ease-in-out_infinite]">
        <div
          className="absolute inset-[-8%] bg-cover bg-center opacity-40"
          style={{
            backgroundImage: 'url(/textures/background-image.png)',
            filter: 'saturate(0.8) brightness(0.7)',
          }}
        />
      </div>

      {/* Layer 3 — 蓝紫渐变叠层 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,89,247,0.08) 0%, transparent 40%, rgba(124,60,224,0.06) 70%, rgba(3,7,18,0.9) 100%)',
        }}
      />

      {/* Layer 4 — 网格纹理 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Layer 5 — 浮游数据光点 */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: p.id % 3 === 0
              ? 'radial-gradient(circle, #4a9eff, transparent)'
              : p.id % 3 === 1
                ? 'radial-gradient(circle, #6c5ce7, transparent)'
                : 'radial-gradient(circle, #42D1E3, transparent)',
            animation: `particle-float ${p.duration}s ${p.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Layer 6 — 水平光条流动 */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.06]">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute h-px w-[60%]"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 18}%`,
              background:
                'linear-gradient(90deg, transparent 0%, #4a9eff 40%, #6c5ce7 80%, transparent 100%)',
              animation: `scan-line ${8 + i * 5}s ${i * 3}s linear infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
