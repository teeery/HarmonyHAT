import { useState, useCallback, useRef, useEffect } from 'react'
import type { ChatMessage } from '../types'
import { generateResponse } from '../data/aiKnowledge'

/**
 * AI 调研员对话 hook。
 *
 * 管理聊天状态 + 流式响应。
 * generateResponse 在上层 data 层实现，便于替换后端方案。
 */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const sendMessage = useCallback(async (content: string) => {
    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      content,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMsg])

    setIsStreaming(true)
    abortRef.current = new AbortController()

    try {
      const response = await generateResponse(content)
      const assistantMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
        timestamp: Date.now(),
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch {
      // 用户取消或网络错误
    } finally {
      setIsStreaming(false)
    }
  }, [])

  const stopGeneration = useCallback(() => {
    abortRef.current?.abort()
  }, [])

  // 清理
  useEffect(() => {
    return () => { abortRef.current?.abort() }
  }, [])

  return { messages, isStreaming, sendMessage, stopGeneration }
}
