import type { DiscoveryCard, ResearchStats, DemandNode } from '../types'

/** 四张发现卡片内容（第三幕） */
export const DISCOVERY_CARDS: DiscoveryCard[] = [
  {
    id: 'community',
    sceneLabel: '社区观察',
    photoUrl: '/images/research/community.jpg',
    observation:
      '社区配备了智能设备，但老人需要记住多个 App、多个密码、多个操作流程。',
    reflection:
      '智慧社区的"智慧"，不应该以增加使用门槛为代价。',
    futureDirection:
      '一个入口，连接家庭设备、社区服务、医疗健康。让老人只对话，不操作。',
    date: '2026-07-29',
    location: '宏图社区',
  },
  {
    id: 'enterprise',
    sceneLabel: '产业观察',
    photoUrl: '/images/research/enterprise.jpg',
    observation:
      '企业的生产系统、管理系统、物流系统各自独立，数据无法流动。',
    reflection:
      '如果设备之间可以自然协同，生产效率能否大幅提升？',
    futureDirection:
      '鸿蒙分布式能力，让工厂设备从"各自为战"走向"协同工作"。',
    date: '2026-07-28',
    location: '东莞南城天安数码城',
  },
  {
    id: 'commerce',
    sceneLabel: '商业观察',
    photoUrl: '/images/research/commerce.jpg',
    observation:
      '线上体验和线下体验完全割裂，消费者在多个平台间反复切换。',
    reflection:
      '如果一次操作就能跨越多设备，消费体验会变成什么样？',
    futureDirection:
      '从"人找服务"到"服务找人"——跨场景无缝体验。',
    date: '2026-07-30',
    location: '南城商圈',
  },
  {
    id: 'government',
    sceneLabel: '公共服务观察',
    photoUrl: '/images/research/government.jpg',
    observation:
      '政务信息分散在不同系统，市民办事需要多次提交相同材料。',
    reflection:
      '数据的打通不仅是技术问题，更是城市治理思维的转变。',
    futureDirection:
      '城市感知层 + 数据协同层 + 主动服务层。让城市理解市民。',
    date: '2026-07-31',
    location: '南城政务服务中心',
  },
]

/** 调研统计数据（第五幕） */
export const RESEARCH_STATS: ResearchStats = {
  totalSites: 15,
  totalInterviews: 37,
  totalMinutes: 1280,
  totalTags: 56,
  totalScenarios: 12,
}

/** 需求图谱数据（第五幕） */
export const DEMAND_NODES: DemandNode[] = [
  { id: 'elderly', label: '智慧养老', score: 5, connections: ['device', 'service'] },
  { id: 'device', label: '设备协同', score: 4, connections: ['elderly', 'traffic'] },
  { id: 'service', label: '数字服务', score: 4, connections: ['elderly'] },
  { id: 'traffic', label: '智慧交通', score: 3, connections: ['device'] },
]

/** 鸿蒙洞察对应表（第四幕） */
export const INSIGHT_PAIRS = [
  { problem: '设备孤岛', solution: '设备协同' },
  { problem: '服务割裂', solution: '跨设备体验' },
  { problem: '信息不透明', solution: '数据连接' },
]
