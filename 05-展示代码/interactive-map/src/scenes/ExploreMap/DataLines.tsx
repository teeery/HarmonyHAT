import type { ExploreNodeData } from './ExploreNode'

interface Props {
  nodes: ExploreNodeData[]
  activeId: string | null
  /** 连接中心点（百分比） */
  centerX?: number
  centerY?: number
}

/**
 * 数据流动画连线 — SVG 贝塞尔曲线 + dash 流动
 *
 * 从中心向外辐射到各节点，选中节点高亮其连线
 */
export function DataLines({ nodes, activeId, centerX = 50, centerY = 50 }: Props) {
  const cx = centerX
  const cy = centerY

  return (
    <svg className="absolute inset-0 z-10 h-full w-full pointer-events-none" viewBox="0 0 100 100">
      {nodes.map((node) => {
        const isActive = node.id === activeId
        // 控制点：中点偏上方形成弧线
        const mx = (cx + node.x) / 2
        const my = Math.min(cy, node.y) - 8

        return (
          <path
            key={node.id}
            d={`M ${cx} ${cy} Q ${mx} ${my} ${node.x} ${node.y}`}
            fill="none"
            stroke={isActive ? 'rgba(108,92,231,0.5)' : 'rgba(74,158,255,0.2)'}
            strokeWidth={isActive ? 0.5 : 0.3}
            strokeDasharray={isActive ? '4 2' : '2 4'}
            style={{
              animation: isActive
                ? 'dash-flow-fast 1.5s linear infinite'
                : 'dash-flow-slow 4s linear infinite',
            }}
          />
        )
      })}
    </svg>
  )
}
