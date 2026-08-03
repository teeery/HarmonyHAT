// ============================================================
// 《鸿蒙未来城市探索馆》— 核心类型定义
// ============================================================

// ---- 场景系统 ----

/** 全部场景标识（8 个场景） */
export type SceneId =
  | 'prologue'
  | 'explore-map'
  | 'field-research'
  | 'harmony-insight'
  | 'future-city'
  | 'epilogue'

/** 场景导航状态 */
export interface SceneState {
  current: SceneId
  previous: SceneId | null
  /** 当前场景内的滚动进度 0-1 */
  progress: number
}

// ---- 导航 ----

export interface NavItem {
  id: SceneId
  label: string
  shortLabel: string
}

// ---- 发现卡片（第三幕：田野调查） ----

export interface DiscoveryCard {
  id: string
  sceneLabel: string // "社区观察" | "产业观察" | "商业观察" | "公共服务观察"
  photoUrl: string
  observation: string  // "我们观察"
  reflection: string   // "我们思考"
  futureDirection: string // "未来方向"
  date: string
  location: string
}

// ---- 数据实验室（第五幕） ----

export interface ResearchStats {
  totalSites: number       // 15 个调研场景
  totalInterviews: number  // 37 份访谈记录
  totalMinutes: number     // 1280 分钟交流
  totalTags: number        // 56 个问题标签
  totalScenarios: number   // 12 个未来场景
}

export interface DemandNode {
  id: string
  label: string
  score: number        // 1-5 星级
  connections: string[] // 关联节点 id
}

// ---- AI 调研员（第六幕） ----

export interface KnowledgeSource {
  type: 'interview' | 'photo' | 'note' | 'report' | 'policy'
  title: string
  date: string
  excerpt: string
}

export interface KnowledgeEntry {
  id: string
  question: string
  answer: string
  sources: KnowledgeSource[]
  tags: string[]
}

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  sources?: KnowledgeSource[]
  timestamp: number
}

// ---- 调研旅程（第三幕：时间线卡片） ----

export interface JourneyStop {
  time: string
  title: string
  location: string
  scene: string
  description: string
  highlights: string[]
  /** 地点配图 */
  image: string
}

export interface JourneyDay {
  id: string
  dayNumber: 1 | 2 | 3 | 4
  date: string
  theme: string
  subtitle: string
  coverIcon: string
  /** 卡片背景图 */
  image: string
  /** 该天核心观察 */
  observation: string
  /** 该天核心思考 */
  reflection: string
  /** 该天对未来的启发 */
  futureDirection: string
  stops: JourneyStop[]
}

// ---- 未来南城（第七幕）----

export type FutureStageVariant = 'hero' | 'network' | 'comparison' | 'transform' | 'spotlight'

export interface FutureCityNode {
  id: string
  label: string
  icon?: string
}

export interface FutureStageConfig {
  id: string
  chapterNum: number
  chapterLabel: string
  variant: FutureStageVariant
  title: string | string[]
  subtitle?: string
  image?: string
  /** Hero — 开篇引导文字 */
  prologue?: string
  prologueHighlight?: string
  /** Network — 网络节点 */
  nodes?: FutureCityNode[]
  centerLabel?: string
  evolution?: string[]
  /** Comparison — 对比面板 */
  beforeYear?: string
  beforeLabel?: string
  beforeDescription?: string
  beforeItems?: string[]
  afterYear?: string
  afterLabel?: string
  afterDescription?: string
  afterItems?: string[]
  /** Transform — 演变阶段 */
  phases?: { label: string; items: string[] }[]
  /** Spotlight — 核心聚焦 */
  focusLabel?: string
  focusDescription?: string
  growthSteps?: string[]
  /** 通用 */
  harmonyConnection?: string
  closingQuote?: string
  quote?: string
}

// ---- 动画 ----

export interface ScrollAnimationConfig {
  /** 视口位置触发点 0-1 */
  triggerPosition: number
  /** 动画时长 ms */
  duration: number
  /** 延迟 ms */
  delay: number
}
