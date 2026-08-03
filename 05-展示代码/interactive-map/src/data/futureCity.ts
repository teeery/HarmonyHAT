import type { FutureStageConfig } from '../types'

// ============================================================
// 第七幕：未来南城 2035 — 五个阶段的场景配置
//
// 叙事弧线：
//   震撼（未来之门）→ 理解（城市网络）→ 共鸣（智慧社区）
//   → 想象（智慧交通）→ 期待（智慧教育）
//
// 六张图片（已放入 public/images/future/）：
//   1. 未来南城总览.png       → Scene 01 未来之门
//   2. 城市生命网络.png       → Scene 02 城市生命网络
//   3. 未来智慧社区场景.png   → Scene 03 智慧社区
//   4. 未来智慧城市交通景观.png → Scene 04 智慧交通
//   5. 人机共学全息实验室.png → Scene 05 智慧教育
//   6. 青年宣言.png           → Scene 06 青年未来宣言
// ============================================================

export const FUTURE_SCENES: FutureStageConfig[] = [
  // ==========================================================
  // Scene 01 · 未来之门
  // ==========================================================
  {
    id: 'gateway',
    chapterNum: 1,
    chapterLabel: '未来之门',
    variant: 'hero',
    title: ['南城 2035', '一个人与城市自然连接的未来'],
    image: '/images/future/未来南城总览.png',
    prologue:
      '十年前，我们开始寻找一个问题：',
    prologueHighlight: '技术如何真正服务于人？',
  },

  // ==========================================================
  // Scene 02 · 城市生命网络
  // ==========================================================
  {
    id: 'city-network',
    chapterNum: 2,
    chapterLabel: '城市生命网络',
    variant: 'network',
    title: '城市，不再只是空间。',
    subtitle: '而成为一个能够感知和协同的生命系统。',
    image: '/images/future/城市生命网络.png',
    nodes: [
      { id: 'home', label: '家庭', icon: '🏠' },
      { id: 'community', label: '社区', icon: '🏘️' },
      { id: 'traffic', label: '交通', icon: '🚇' },
      { id: 'enterprise', label: '企业', icon: '🏢' },
      { id: 'service', label: '公共服务', icon: '🏛️' },
    ],
    centerLabel: '城市 OS',
    evolution: ['设备连接', '服务连接', '人与城市连接'],
  },

  // ==========================================================
  // Scene 03 · 智慧社区
  // ==========================================================
  {
    id: 'smart-community',
    chapterNum: 3,
    chapterLabel: '智慧社区',
    variant: 'comparison',
    title: '不是让老人学会用手机，\n而是让家学会理解老人。',
    image: '/images/future/未来智慧社区场景.png',
    beforeYear: '2026',
    beforeLabel: '设备孤岛',
    beforeDescription: '老人需要记住多个 App、多个密码、多个操作流程',
    beforeItems: ['手机', '智能音箱', '空调遥控', '社区 App', '医疗手环'],
    afterYear: '2035',
    afterLabel: '生活理解',
    afterDescription: '"帮我打开空调。" → 家庭设备自动协同 → 社区服务主动响应',
    afterItems: ['一句话唤醒', '全屋协同响应', '社区主动关怀', '医疗自动预警'],
    harmonyConnection:
      '手机 → 家庭设备 → 社区服务 → 医疗健康 — 一个入口连接全部',
  },

  // ==========================================================
  // Scene 04 · 智慧交通
  // ==========================================================
  {
    id: 'smart-traffic',
    chapterNum: 4,
    chapterLabel: '智慧交通',
    variant: 'transform',
    title: '当每一个城市节点能够交流，',
    subtitle: '交通不只是移动，而成为城市智能的一部分。',
    image: '/images/future/未来智慧城市交通景观.png',
    phases: [
      { label: '现在', items: ['车辆', '道路', '管理中心'] },
      { label: '鸿蒙连接', items: ['车路协同', '实时数据流', 'AI 调度'] },
      { label: '未来', items: ['城市协同网络'] },
    ],
    closingQuote: '从各自为战，到协同运行。',
  },

  // ==========================================================
  // Scene 05 · 智慧教育
  // ==========================================================
  {
    id: 'smart-education',
    chapterNum: 5,
    chapterLabel: '智慧教育',
    variant: 'spotlight',
    title: '每个人，都拥有自己的AI伙伴。',
    image: '/images/future/人机共学全息实验室.png',
    focusLabel: 'AI 学习伙伴',
    focusDescription:
      '不再是一个老师面对几十个学生，而是每个学生都有自己的 AI 伙伴——理解学习节奏、发现隐藏天赋、规划成长路径。',
    growthSteps: ['认知学生特点', '定制学习路径', '发现隐藏天赋', '陪伴长期成长'],
    quote: '技术的价值，不是替代教育者，而是让每一个人的成长被看见。',
  },
]
