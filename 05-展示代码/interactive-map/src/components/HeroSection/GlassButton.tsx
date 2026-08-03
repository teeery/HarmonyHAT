import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface GlassButtonProps {
  onClick?: () => void
}

/**
 * 玻璃拟态探索按钮
 *
 * 视觉：蓝紫渐变胶囊 + 外发光
 * 交互：Hover 放大 + 光晕增强，Tap 微缩
 * 设计令牌：btn-explore 类已在 index.css 定义
 */
export function GlassButton({ onClick }: GlassButtonProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.button
        onClick={onClick}
        className="btn-explore group relative flex items-center gap-3 px-10 py-4 text-lg font-semibold tracking-wide cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label="开始探索"
      >
        <span>开始探索</span>
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowRight className="h-5 w-5" />
        </motion.span>
      </motion.button>

      {/* 滚动提示 */}
      {/* <motion.p
        className="text-[11px] tracking-[0.35em] text-white/25 font-sans"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        Scroll to Explore
      </motion.p> */}
    </motion.div>
  )
}
