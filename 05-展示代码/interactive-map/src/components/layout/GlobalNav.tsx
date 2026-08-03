import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface NavItem {
  id: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'prologue',        label: '序章' },
  { id: 'explore-map',     label: '走进南城' },
  { id: 'field-research',  label: '调研旅程' },
  { id: 'harmony-insight', label: '鸿蒙洞察' },
  { id: 'future-city',     label: '未来南城' },
  { id: 'epilogue',        label: '青年宣言' },
]

/**
 * 极简圆点导航 — Apple 风格
 * - 8 个圆点纵向排列，active 发光
 * - hover 显示标签
 * - IntersectionObserver 自动切换
 * - 点击平滑滚动
 */
export function GlobalNav() {
  const [activeId, setActiveId] = useState<string>('prologue')

  useEffect(() => {
    const sections = NAV_ITEMS
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleClick = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <nav
      className="fixed right-5 top-1/2 -translate-y-1/2 z-[1000] flex flex-col items-center gap-3"
      aria-label="场景导航"
    >
      {NAV_ITEMS.map((item) => {
        const isActive = activeId === item.id

        return (
          <button
            key={item.id}
            onClick={() => handleClick(item.id)}
            className="group relative flex items-center gap-3 outline-none"
            aria-label={`跳转到${item.label}`}
            aria-current={isActive ? 'true' : undefined}
          >
            {/* 标签 — hover 显示 */}
            <span className="absolute right-7 text-xs tracking-wider text-white/0 group-hover:text-white/70 whitespace-nowrap transition-all duration-300 pointer-events-none">
              {item.label}
            </span>

            {/* 圆点 */}
            <motion.span
              className="block rounded-full border transition-colors duration-300"
              animate={{
                width: isActive ? 10 : 7,
                height: isActive ? 10 : 7,
                background: isActive
                  ? 'var(--color-accent)'
                  : 'transparent',
                borderColor: isActive
                  ? 'var(--color-accent)'
                  : 'rgba(255,255,255,0.25)',
                boxShadow: isActive
                  ? '0 0 10px var(--color-accent), 0 0 20px rgba(108,92,231,0.4)'
                  : 'none',
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </button>
        )
      })}
    </nav>
  )
}
