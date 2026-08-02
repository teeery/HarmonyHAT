import type { NavItem } from '../../types'

const NAV_ITEMS: NavItem[] = [
  { id: 'prologue',       label: '序章 · 城市连接',    shortLabel: '序章' },
  { id: 'explore-map',    label: '走进南城',           shortLabel: '探索' },
  { id: 'field-research', label: '田野调查',           shortLabel: '发现' },
  { id: 'harmony-insight',label: '鸿蒙洞察',           shortLabel: '洞察' },
  { id: 'data-lab',       label: '数据实验室',         shortLabel: '数据' },
  { id: 'ai-researcher',  label: 'AI 调研员',          shortLabel: 'AI' },
  { id: 'future-city',    label: '未来南城 2035',      shortLabel: '未来' },
  { id: 'epilogue',       label: '青年宣言',           shortLabel: '宣言' },
]

/**
 * 全局导航条 — 右侧固定竖向
 *
 * 圆点 + 标签，当前页鸿蒙紫高亮
 * hover 显示完整标签
 * 点击跳转到对应场景锚点
 */
export function GlobalNav() {
  // TODO: 监听滚动，自动高亮当前场景
  // TODO: 点击跳转对应 section

  return (
    <nav
      className="fixed right-6 top-1/2 -translate-y-1/2 z-[1000] flex flex-col gap-4"
      aria-label="场景导航"
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className="group flex items-center gap-3"
          title={item.label}
          aria-label={`跳转到${item.label}`}
        >
          {/* 标签 — hover 显示 */}
          <span className="text-sm text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            {item.shortLabel}
          </span>

          {/* 圆点 */}
          <span className="w-2 h-2 rounded-full border border-white/30 bg-transparent transition-all duration-300 group-hover:border-[var(--color-accent)] group-hover:shadow-[0_0_8px_var(--color-accent)]" />
        </button>
      ))}
    </nav>
  )
}
