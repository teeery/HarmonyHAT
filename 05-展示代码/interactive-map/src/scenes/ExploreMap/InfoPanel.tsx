import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import type { ExploreNodeData } from './ExploreNode'

interface Props {
  node: ExploreNodeData | null
  onClose: () => void
  onEnter?: () => void
}

/**
 * 信息面板 — 右侧玻璃拟态滑入
 *
 * 动画：
 *   - 进场：从右侧滑入 + 地图变暗
 *   - 退场：滑出右侧
 *   - 内容：观察 → 思考 → 方向
 */
export function InfoPanel({ node, onClose, onEnter }: Props) {
  return (
    <AnimatePresence>
      {node && (
        <>
          {/* 地图暗色遮罩 */}
          <motion.div
            className="absolute inset-0 z-30 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 玻璃面板 */}
          <motion.div
            className="absolute right-0 top-0 z-40 h-full w-full max-w-md flex flex-col p-10"
            style={{
              background: 'rgba(10,10,15,0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
            }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 关闭按钮 */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-white/40 hover:text-white/80 transition-colors"
            >
              <X size={20} />
            </button>

            {/* 节点标题 */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <p className="text-xs tracking-[0.3em] text-[var(--color-accent)] uppercase">
                Discovery
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-white">{node.title}</h3>
              <p className="mt-1 text-sm text-white/50">{node.desc}</p>
            </motion.div>

            {/* 分割线 */}
            <div className="mt-8 h-px bg-gradient-to-r from-white/15 to-transparent" />

            {/* 探索文案 */}
            <motion.div
              className="mt-8 flex-1 space-y-6 text-sm leading-relaxed text-white/70"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div>
                <p className="text-xs tracking-wider text-white/40 mb-2">我们观察</p>
                <p>{getObservation(node.id)}</p>
              </div>
              <div>
                <p className="text-xs tracking-wider text-white/40 mb-2">我们思考</p>
                <p>{getReflection(node.id)}</p>
              </div>
              <div>
                <p className="text-xs tracking-wider text-white/40 mb-2">未来方向</p>
                <p className="text-white/85">{getFutureDirection(node.id)}</p>
              </div>
            </motion.div>

            {/* 进入按钮 */}
            <motion.button
              className="mt-8 btn-explore flex items-center justify-center gap-2 w-full px-6 py-3 text-white text-sm font-medium rounded-full"
              onClick={onEnter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              进入{node.title}探索
              <ArrowRight size={16} />
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/** 通过节点 id 获取对应观察内容 */
function getObservation(id: string): string {
  const map: Record<string, string> = {
    enterprise:
      '企业的生产系统、管理系统、物流系统各自独立，数据无法流动。',
    community:
      '社区配备了智能设备，但老人需要记住多个 App、多个密码、多个操作流程。',
    commerce:
      '线上体验和线下体验完全割裂，消费者在多个平台间反复切换。',
    government:
      '政务信息分散在不同系统，市民办事需要多次提交相同材料。',
  }
  return map[id] ?? ''
}

function getReflection(id: string): string {
  const map: Record<string, string> = {
    enterprise:
      '如果设备之间可以自然协同，生产效率能否大幅提升？',
    community:
      '智慧社区的"智慧"，不应该以增加使用门槛为代价。',
    commerce:
      '如果一次操作就能跨越多设备，消费体验会变成什么样？',
    government:
      '数据的打通不仅是技术问题，更是城市治理思维的转变。',
  }
  return map[id] ?? ''
}

function getFutureDirection(id: string): string {
  const map: Record<string, string> = {
    enterprise:
      '鸿蒙分布式能力，让工厂设备从"各自为战"走向"协同工作"。',
    community:
      '一个入口，连接家庭设备、社区服务、医疗健康。让老人只对话，不操作。',
    commerce:
      '从"人找服务"到"服务找人"——跨场景无缝体验。',
    government:
      '城市感知层 + 数据协同层 + 主动服务层。让城市理解市民。',
  }
  return map[id] ?? ''
}
