/**
 * 统计数据卡片 — 第五幕数据实验室用
 *
 * 大数字（72px）+ 小标签（14px）
 * 数字从 0 滚动到终值（约 1.5s）
 * hover 上浮效果
 */
export function StatCard({
  value,
  label,
}: {
  value: number
  label: string
}) {
  return (
    <div
      className="flex flex-col items-center gap-3 p-8
                 rounded-xl bg-[var(--color-bg-card)]
                 transition-all duration-300
                 hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
    >
      <span
        className="text-[72px] font-bold leading-none text-white"
        style={{ fontFeatureSettings: '"tnum"', letterSpacing: '1px' }}
      >
        {value}
      </span>
      <span className="text-sm text-white/50">{label}</span>
    </div>
  )
}
