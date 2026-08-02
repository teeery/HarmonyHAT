import type { ChatMessage } from '../../types'

/**
 * 对话气泡 — 第六幕 AI 调研员用
 *
 * 机器人消息：星云蓝背景 + 可附带引用卡片
 * 用户消息：鸿蒙紫背景
 */
export function ChatBubble({ message }: { message: ChatMessage }) {
  const isAssistant = message.role === 'assistant'

  return (
    <div className={`flex ${isAssistant ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[75%] rounded-xl p-4 ${
          isAssistant
            ? 'bg-[var(--color-bg-card)] text-white/80'
            : 'bg-[var(--color-accent)]/30 text-white'
        }`}
      >
        <p className="text-base leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {/* 引用卡片 */}
        {message.sources && message.sources.length > 0 && (
          <div className="mt-3 pt-3 border-t border-white/10">
            {message.sources.map((src) => (
              <button
                key={`${src.title}-${src.date}`}
                className="flex items-center gap-2 text-sm text-white/50
                           hover:text-[var(--color-accent)] transition-colors
                           cursor-pointer"
              >
                <span>
                  {src.type === 'photo' ? '📸' : '📎'}
                </span>
                <span>{src.title}</span>
                <span className="text-white/30">({src.date})</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
