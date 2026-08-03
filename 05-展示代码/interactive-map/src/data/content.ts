import type { DiscoveryCard, ResearchStats, DemandNode, JourneyDay } from '../types'

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
  { problem: '系统异构', solution: '分布式软总线' },
  { problem: '体验碎片化', solution: '原子化服务' },
  { problem: '品牌壁垒', solution: '开源生态共建' },
]

// ============================================================
// 第四幕：鸿蒙洞察 — 词云数据
// ============================================================

/**
 * 词云词汇（基于全部调研文档的词频统计）
 * value 为相对频率，用于确定字号和颜色权重
 */
export const WORD_CLOUD_DATA = [
  { text: '鸿蒙', value: 100 },
  { text: '智能', value: 85 },
  { text: '设备', value: 78 },
  { text: '城市', value: 72 },
  { text: '连接', value: 68 },
  { text: '协同', value: 65 },
  { text: '数据', value: 60 },
  { text: '生态', value: 55 },
  { text: '服务', value: 52 },
  { text: '产业', value: 50 },
  { text: '南城', value: 48 },
  { text: '智慧', value: 45 },
  { text: '开发者', value: 42 },
  { text: '政务', value: 40 },
  { text: '交通', value: 38 },
  { text: '教育', value: 36 },
  { text: '医疗', value: 34 },
  { text: '家居', value: 32 },
  { text: '碰一碰', value: 30 },
  { text: '分布式', value: 28 },
  { text: '场景', value: 26 },
  { text: '安全', value: 24 },
  { text: '社区', value: 22 },
  { text: '商圈', value: 20 },
  { text: '芯片', value: 18 },
  { text: '数字化', value: 16 },
  { text: '认证', value: 14 },
  { text: '全屋', value: 13 },
  { text: '座舱', value: 12 },
  { text: '人车家', value: 11 },
  { text: '传感器', value: 10 },
  { text: 'AI', value: 9 },
  { text: '零碳', value: 8 },
  { text: '物联网', value: 8 },
  { text: '硬件', value: 7 },
  { text: '机器人', value: 7 },
  { text: '无人机', value: 6 },
  { text: '灯杆', value: 5 },
  { text: '潮玩', value: 5 },
  { text: '实验室', value: 4 },
]

// ============================================================
// 调研旅程（第三幕）— 四天线下实地调研
// ============================================================

export const JOURNEY_DAYS: JourneyDay[] = [
  {
    id: 'day1',
    dayNumber: 1,
    date: '2026-07-28',
    theme: '感知鸿蒙',
    subtitle: '从汽车到商圈到家庭——第一次亲手触碰鸿蒙全场景生态',
    coverIcon: '🚗',
    image: '/images/research/感知鸿蒙.jpg',
    observation:
      '鸿蒙智行展厅内，问界、智界、享界、尊界全系车型一字排开，座舱体验区排起了队。R&A PARK 里，孩子们围着 AI 机器人不肯走，年轻人在鸿蒙碰一碰互动屏前打卡拍照。晚上在国贸，全屋智能体验店的灯光从黄昏模式过渡到睡眠模式只用了不到两秒——柔顺、安静、不需要掏手机。一天跑完三个场景，鸿蒙从一个概念变成了可以触摸的东西。',
    reflection:
      '鸿蒙不是未来技术——它已经在汽车、商圈、家居中落地。但三个场景的消费者有一个共同点：他们体验得很开心，但被问到"你愿意为这套系统多花钱吗"时，大部分人会犹豫。从"觉得好"到"愿意买"，中间还差什么？',
    futureDirection:
      '当"人车家"生态的体验成本降到消费者不再犹豫时，鸿蒙就会从少数极客的选择变成城市居民的生活方式。',
    stops: [
      {
        time: '下午',
        title: '鸿蒙智行用户中心',
        location: '寮步国际汽车城',
        image: '/images/research/鸿蒙智行.jpg',
        scene: '鸿蒙+智慧出行',
        description:
          '全国最大鸿蒙智行展厅（1.5万㎡），问界/智界/享界/尊界全系实车体验。鸿蒙座舱与手机、家居无缝联动，全国首个零碳4S店（4000㎡光伏+全液冷超充）。',
        highlights: [
          '鸿蒙座舱语音+触控+手势多模态交互实测',
          '"人车家"全生态：车内控家中灯光空调',
          '零碳运营模式：光伏发电覆盖全店用电',
        ],
      },
      {
        time: '傍晚',
        title: 'R&A PARK（睿派）',
        location: '南城东莞大道',
        image: '/images/research/睿派.jpg',
        scene: '鸿蒙+智慧商圈',
        description:
          '全球首个"机器人+AI"主题商圈，位于东莞大道核心地段。团队自由探索八大科创空间，重点观察市民在 XTOY 鸿蒙AI潮玩区和碰一碰交互设备前的自然行为，近距离感受鸿蒙技术在商业场景中的真实落地形态。',
        highlights: [
          '八大科创空间自由探索：AI教育/元宇宙VR/无人机/机甲',
          '观察记录市民与鸿蒙碰一碰设备的自然交互行为',
          '现场拍摄素材，采集商圈鸿蒙化的一手影像资料',
        ],
      },
      {
        time: '晚间',
        title: '华为全屋智能体验店',
        location: '民盈国贸中心B1',
        image: '/images/research/鸿蒙智家.jpg',
        scene: '鸿蒙+全屋智能',
        description:
          '暗光环境下实测全场景智能家居：从黄昏到睡眠模式的灯光渐变顺滑度、AI传感器弱光灵敏度、起夜微光的响应速度，白天试不出的效果晚上一目了然。',
        highlights: [
          '睡眠/起夜/晨起三种模式的暗光实测',
          '灯光渐变过渡无阶梯感，全程丝滑',
          'AI传感器在近乎全黑环境下的灵敏度',
        ],
      },
    ],
  },
  {
    id: 'day2',
    dayNumber: 2,
    date: '2026-07-29',
    theme: '行业落地',
    subtitle: '从省级适配平台到企业产品上市——追踪鸿蒙产业化的完整链条',
    coverIcon: '🏭',
    image: '/images/research/行业落地.jpg',
    observation:
      '省适配中心的展厅里，"交通佳鸿"OS 在全国 6 城 10 条地铁线部署的案例令人印象深刻——鸿蒙已经跑在了基础设施里。到了慕思，一张能联动灯光、空调、窗帘的智能床，上市销售额超 1 亿元，占智能床销量 40%。从"省级平台制定标准"到"企业产品商业验证"，一个下午跑通了鸿蒙产业化的完整逻辑。',
    reflection:
      '省适配中心负责人说了一句话让人印象深刻："鸿蒙不是某一家公司的操作系统，而是整个产业的公共品。"但回到现实，企业投入适配需要真金白银，信任来自可预期的商业回报。从省平台到一家具体企业，链条很长——标准化程度决定了生态扩张的速度。',
    futureDirection:
      '当适配认证标准化、成本可预期、商业回报可验证，鸿蒙将从"标杆案例"进入"规模化复制"阶段。慕思的 1 亿销售额只是一个开始。',
    stops: [
      {
        time: '14:00 — 15:00',
        title: '广东省开源鸿蒙适配中心',
        location: '广州黄埔',
        image: '/images/research/省适配中心.jpg',
        scene: '鸿蒙+产业生态',
        description:
          '全国首个省级开源鸿蒙适配中心，2026年3月揭牌。全省鸿蒙生态"总闸门"——制定适配标准、发放认证、协同跨行业资源。"一中心+三基地"布局，总投资1亿元，国企牵头+生态龙头协同运营。',
        highlights: [
          '颁发全省首张开源鸿蒙生态产品适配认证证书',
          '"交通佳鸿"OS 已在全国6城10条地铁线部署',
          '五大技术能力+四大服务体系+三大核心平台',
          '公益属性+企业化运作，2026年预计完成500+项适配',
        ],
      },
      {
        time: '16:00 — 18:00',
        title: '慕思健康睡眠股份有限公司',
        location: '东莞厚街',
        image: '/images/research/慕思.jpg',
        scene: '鸿蒙+智慧家居',
        description:
          '"鸿蒙智选"首批合作伙伴，东莞本土上市公司。鸿蒙智能床上市销售额超 1 亿元，占智能床销量 40%。床体可无感联动灯光、空调、窗帘，精准感知心率、呼吸等生命体征，定位"睡眠中枢"。',
        highlights: [
          '鸿蒙智能床占智能床销量40%，上市销售额超1亿',
          '10.8亿条睡眠数据的隐私保护与合规机制',
          '从传统床垫制造商到"睡眠中枢"的转型路径',
          '2026年5月联合发起"开源鸿蒙家居产业生态合作倡议"',
        ],
      },
    ],
  },
  {
    id: 'day3',
    dayNumber: 3,
    date: '2026-07-30',
    theme: '教育专场',
    subtitle: '旁听9家企业路演，看鸿蒙如何走进校园的每一个角落',
    coverIcon: '📚',
    image: '/images/research/教育专场.jpg',
    observation:
      '华为、中软国际、拓维信息等 9 家企业轮流上台路演，每家 10 分钟——电子学生证碰一碰考勤、AI 体育课堂实时数据分析、分布式图书管理系统……方案一个比一个精彩。但到了学校代表提问环节，问题出奇一致：多少钱？安全吗？和现有系统怎么对接？企业讲了 30 分钟技术亮点，学校只关心这三件事。',
    reflection:
      '鸿蒙在教育场景的落地，技术不是瓶颈——是"谁买单"和"谁来推动"。企业有方案、有热情，但学校最关心的永远是价格、安全、易用性。对接会的真正价值不在于当场签单，而在于让做技术的人和用技术的人终于坐在了同一张桌子前。',
    futureDirection:
      '当"1+3+N"试点跑通并形成可复制的模板，鸿蒙智慧校园将从松山湖这一所标杆校走向东莞全市，再向全国推广。',
    stops: [
      {
        time: '14:30 — 17:30',
        title: '东莞市鸿蒙场景供需对接会（教育专场）',
        location: '松山湖·东莞科创金融广场',
        image: '/images/research/教育专场.jpg',
        scene: '鸿蒙+智慧教育',
        description:
          '由东莞市"鸿蒙之城"建设攻坚工作专班、市教育局、市发改局联合主办。9 家鸿蒙生态企业轮流路演 + 学校需求发布 + 一对一供需对接，四大核心场景：智慧图书馆、物联平台、电子班牌、智能批阅。',
        highlights: [
          '市教育局"1+3+N"全域协同试点方案正式亮相',
          '华为/中软/拓维/联通/诚迈等9家企业同台路演',
          '学校端核心关切：价格 > 安全 > 易用性 > 兼容性',
          '对接会本质：弥合技术供给与学校需求的信息鸿沟',
        ],
      },
    ],
  },
  {
    id: 'day4',
    dayNumber: 4,
    date: '2026-07-31',
    theme: '数字经济 + 智慧政务',
    subtitle: '上午看产业如何集聚，下午看市民如何受益——两重视角理解鸿蒙之城',
    coverIcon: '🏛️',
    image: '/images/research/数字政务.jpg',
    observation:
      '上午在湾区数谷，听园区负责人讲鸿蒙生态大厦的规划和"数字经济十条"的扶持力度——产业侧在做顶层设计。下午在市民服务中心，亲眼看到一位市民用鸿蒙手机碰一碰闸机、3分钟完成社保查询打印——应用侧在解决真实问题。产业政策（供给）和政务服务（需求）是鸿蒙之城的"两条腿"，缺一不可。',
    reflection:
      '南城在东莞鸿蒙版图中的定位很清晰——不做制造（那是松山湖的事），做"总部+服务"。湾区数谷负责把企业聚起来，市民服务中心负责让市民用起来。从园区到大厅的动线，恰好是从"建生态"到"用生态"的完整叙事。',
    futureDirection:
      '当鸿蒙生态大厦建成入驻、50个高频政务事项全量上线鸿蒙AI智办区，南城将成为全国首个"鸿蒙全场景政务区"的样板。',
    stops: [
      {
        time: '10:00 — 11:00',
        title: '湾区数谷',
        location: '南城联科国际信息产业园',
        image: '/images/research/湾区数谷.jpg',
        scene: '鸿蒙+数字经济',
        description:
          '南城 CBD 规划中的数字经济产业集聚区。核心载体：联科国际信息产业园+宏远AI产业园。鸿蒙生态大厦规划落地中，"数字经济十条"真金白银扶持入驻企业。定位：与松山湖"研发+制造"错位，承担"总部+服务"功能。',
        highlights: [
          '鸿蒙生态大厦规划进展与招商方向',
          '"数字经济十条"的具体扶持条款与力度',
          '南城 vs 松山湖 vs 滨海湾的差异化产业定位',
          '已有入驻鸿蒙企业的规模与行业分布画像',
        ],
      },
      {
        time: '15:00 — 16:00',
        title: '东莞市民服务中心',
        location: '南城鸿福路',
        image: '/images/research/市民中心政务办.jpg',
        scene: '鸿蒙+智慧政务',
        description:
          '全省首个"鸿蒙AI智办体验区"。专员带领讲解+实地实测：鸿蒙手机进厅自动取号→NFC碰一碰办理→排队进度实时推送→营业执照一键同步至电脑。首批3个事项已上线，后续规划不少于50个。',
        highlights: [
          '首批上线：个体工商户设立登记/社保查询打印/不动产登记',
          '鸿蒙碰一碰对不同品牌手机的兼容性实测结果',
          '中老年群体操作门槛与现场引导措施的观察',
          '全流程耗时与传统人工窗口的对比数据',
        ],
      },
    ],
  },
]
