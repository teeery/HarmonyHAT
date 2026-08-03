import { type ReactNode } from 'react'
import { motion } from 'framer-motion'

export interface ExploreNodeData {
  id: string
  icon: ReactNode
  title: string
  desc: string
  x: number
  y: number
  labelSide: 'top' | 'bottom' | 'left' | 'right'
}

interface Props {
  node: ExploreNodeData
  isActive: boolean
  onClick: () => void
}

/**
 * 探索节点 — 图标在上 + 标题在下 + 呼吸光环
 *
 * 动画：
 *   - 光环呼吸脉冲 (2.5s)
 *   - 图标微缩放
 *   - 点击选中高亮（鸿蒙紫发光）
 */
export function ExploreNode({ node, isActive, onClick }: Props) {
  return (
    <motion.div
      className="absolute z-20 flex flex-col items-center gap-2 cursor-pointer"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={onClick}
    >
      {/* 图标 + 呼吸光环 */}
      <div className="relative flex items-center justify-center">
        {/* 呼吸光环 */}
        <motion.div
          className="absolute rounded-full h-[200px] w-[200px] md:h-[260px] md:w-[260px]"
          style={{
            background: isActive
              ? 'rgba(108,92,231,0.15)'
              : 'rgba(74,158,255,0.08)',
            boxShadow: isActive
              ? '0 0 32px rgba(108,92,231,0.35), 0 0 64px rgba(108,92,231,0.15)'
              : '0 0 16px rgba(74,158,255,0.2)',
          }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* PNG 图标 */}
        <motion.div
          className="relative z-10"
          animate={{ scale: isActive ? 1.12 : [1, 1.06, 1] }}
          transition={{ duration: 2, repeat: isActive ? 0 : Infinity, ease: 'easeInOut' }}
        >
          {node.icon}
        </motion.div>
      </div>

      {/* 标题 — 图标正下方 */}
      <span className="text-sm md:text-base font-semibold tracking-wider text-white/85 font-sans whitespace-nowrap text-center">
        {node.title}
      </span>
    </motion.div>
  )
}
