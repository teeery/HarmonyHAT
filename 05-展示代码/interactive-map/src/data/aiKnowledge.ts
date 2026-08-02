/**
 * AI 知识库 — 基于团队调研数据的预设问答
 *
 * 当前为静态数据层。后续可替换为 RAG 后端。
 */
import type { KnowledgeEntry, KnowledgeSource } from '../types'

/** 预设问答对 */
export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: 'q1',
    question: '最大的发现是什么？',
    answer: `本次调研最大的发现是——城市中设备数量在快速增长，但设备之间的"连接"并未同步进化。具体表现在三个层面：

1. 市民层面：智能设备增加了使用门槛，而非降低。
2. 企业层面：系统孤岛导致数据资产闲置。
3. 政府层面：部门间信息壁垒影响服务效率。`,
    sources: [
      { type: 'report', title: '调研总结报告（7.31）', date: '2026-07-31', excerpt: '核心发现章节' },
      { type: 'note', title: '标签分布统计', date: '2026-07-31', excerpt: '#设备孤岛 ×12  #数字鸿沟 ×8' },
    ],
    tags: ['核心发现', '城市问题'],
  },
  {
    id: 'q2',
    question: '为什么选择南城？',
    answer: `根据我们前期调研，南城具有三个特点：

● 产业密集：有大量科技企业和制造业，适合观察产业数字化需求。
● 人口年轻：数字服务接受度高，智慧城市基础较好。
● 数字化基础好：政务数字化程度高，具备进一步升级的条件。

这使得南城成为观察"城市数字化转型"的理想样本。`,
    sources: [
      { type: 'note', title: '前期调研笔记', date: '2026-07-25', excerpt: '选点分析章节' },
    ],
    tags: ['调研方法', '选点分析'],
  },
  {
    id: 'q3',
    question: '鸿蒙解决了什么具体问题？',
    answer: `准确地说，我们不是证明"鸿蒙解决了一切"，而是发现鸿蒙的分布式理念恰好回应了调研中发现的核心矛盾——"设备多了，但连接没跟上"。

例如在社区场景：
现在：老人用 5 个 App 管理生活。
鸿蒙思路：一个入口，设备协同，服务主动触达。

这种从"人找服务"到"服务找人"的转变，是鸿蒙分布式能力的核心价值。`,
    sources: [
      { type: 'report', title: '鸿蒙生态分析笔记', date: '2026-07-30', excerpt: '社区场景分析' },
    ],
    tags: ['鸿蒙', '技术分析', '社区'],
  },
]

/**
 * 模拟 AI 响应生成。
 * 当前简单匹配预设问题，后续替换为 RAG + LLM。
 */
export async function generateResponse(
  query: string,
): Promise<{ answer: string; sources: KnowledgeSource[] }> {
  // 简单匹配：找到最相似的预设问题
  const match = KNOWLEDGE_BASE.find(
    (entry) =>
      entry.question.includes(query) ||
      query.includes(entry.question.slice(0, 4)),
  )

  if (match) {
    // 模拟延迟
    await new Promise((r) => setTimeout(r, 800))
    return { answer: match.answer, sources: match.sources }
  }

  // 未匹配到预设回答
  await new Promise((r) => setTimeout(r, 600))
  return {
    answer: '这个问题需要进一步分析。建议查看我们的调研报告获取更详细的信息。',
    sources: [],
  }
}
