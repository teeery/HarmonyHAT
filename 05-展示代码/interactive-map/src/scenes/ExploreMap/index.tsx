import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExploreNode, type ExploreNodeData } from './ExploreNode'
import { DataLines } from './DataLines'
import { InfoPanel } from './InfoPanel'

/**
 * 四节点坐标（百分比定位）
 * 中心辐射布局：上 / 左 / 右 / 下
 */
const NODES: ExploreNodeData[] = [
  {
    id: 'enterprise',
    icon: <img src="/images/map/企业.png" alt="企业" className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] object-contain" />,
    title: '企业',
    desc: '',
    x: 50,
    y: 24,
    labelSide: 'top',
  },
  {
    id: 'community',
    icon: <img src="/images/map/社区.png" alt="社区" className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] object-contain" />,
    title: '社区',
    desc: '',
    x: 24,
    y: 48,
    labelSide: 'left',
  },
  {
    id: 'commerce',
    icon: <img src="/images/map/商圈.png" alt="商圈" className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] object-contain" />,
    title: '商圈',
    desc: '',
    x: 76,
    y: 48,
    labelSide: 'right',
  },
  {
    id: 'government',
    icon: <img src="/images/map/政务.png" alt="政务" className="w-[200px] h-[200px] md:w-[260px] md:h-[260px] object-contain" />,
    title: '政务',
    desc: '',
    x: 50,
    y: 74,
    labelSide: 'bottom',
  },
]

/**
 * 第二幕：走进南城 — 数字探索地图
 *
 * 五层架构：
 *   Layer 1 — 深色径向渐变背景
 *   Layer 2 — PNG 南城未来地图底图
 *   Layer 3 — 南城中心标记
 *   Layer 4 — SVG 数据流动画连线
 *   Layer 5 — 四个探索节点（呼吸光点 + 点击展开信息卡）
 *
 * 交互：
 *   - 节点呼吸脉冲动画
 *   - Hover 显示标题 + 副标题
 *   - 点击 → 地图变暗 + 右侧玻璃面板滑入
 */
export function ExploreMap() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeNode = NODES.find((n) => n.id === activeId) ?? null

  const handleNodeClick = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id))
  }

  const handleClose = () => setActiveId(null)

  return (
    <section id="explore-map" className="relative h-screen w-full overflow-hidden">
      {/* ---- Layer 1: 深色径向渐变背景 ---- */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, #142850 0%, #0a0f1a 50%, #030712 100%)',
        }}
      />

      {/* ---- Layer 2: PNG 南城未来地图底图 ---- */}
      <motion.div
        className="absolute inset-0 z-[1]"
        initial={{ opacity: 0, scale: 1.08 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <img
          src="/textures/南城的探索地图.png"
          alt="东莞南城数字探索地图"
          className="h-full w-full object-cover opacity-80"
        />
      </motion.div>

      {/* ---- Layer 3: 南城中心标记 ---- */}
      <motion.div
        className="absolute top-1/2 left-1/2 z-[5] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <div
          className="h-3 w-3 rounded-full"
          style={{
            background: 'linear-gradient(135deg, #6c5ce7, #4a9eff)',
            boxShadow: '0 0 16px rgba(108,92,231,0.5), 0 0 32px rgba(108,92,231,0.25)',
          }}
        />
        <span className="mt-2 text-sm font-medium tracking-widest text-white/70">南城</span>
      </motion.div>

      {/* ---- Layer 4: SVG 数据流动画连线 ---- */}
      <DataLines nodes={NODES} activeId={activeId} centerX={50} centerY={50} />

      {/* ---- Layer 5: 四个探索节点 ---- */}
      <div className="absolute inset-0 z-20">
        {NODES.map((node) => (
          <ExploreNode
            key={node.id}
            node={node}
            isActive={activeId === node.id}
            onClick={() => handleNodeClick(node.id)}
          />
        ))}
      </div>

      {/* ---- 标题：左上 ---- */}
      <motion.div
        className="absolute top-8 left-8 md:top-12 md:left-12 z-10"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-wide text-white/95">
          东莞南城
        </h2>
        <p className="mt-2 text-sm md:text-base tracking-wider text-white/45">
          探索数字生活的真实场景
        </p>
      </motion.div>

      {/* ---- 引导文字：右上 ---- */}
      <motion.div
        className="absolute top-8 right-8 md:top-12 md:right-12 z-10"
        initial={{ opacity: 0, y: -16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <p className="text-[10px] md:text-xs tracking-[0.3em] text-white/35 font-sans">
          探索城市：
        </p>
        <p className="mt-3 text-sm md:text-base leading-loose text-white/75 font-sans font-medium tracking-wide">
          在南城中寻找
          <br />
          未来数字生活的答案。
        </p>
      </motion.div>

      {/* ---- Glass Info Panel ---- */}
      <InfoPanel node={activeNode} onClose={handleClose} />
    </section>
  )
}
