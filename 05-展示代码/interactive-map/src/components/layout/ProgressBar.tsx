/**
 * 顶部进度条
 *
 * 固定在页面顶部，2px 高度
 * 宽度 = 当前场景索引 / 总场景数 × 100%
 * 颜色：鸿蒙紫
 */
export function ProgressBar() {
  // TODO: 根据滚动位置计算进度

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[1001] transition-[width] duration-300"
      style={{
        width: '0%',
        background: 'var(--color-accent)',
      }}
      role="progressbar"
      aria-label="页面阅读进度"
    />
  )
}
