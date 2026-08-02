/**
 * 加载页 — 鸿蒙紫色光点脉冲呼吸动画
 *
 * 时间线：
 *   0.0s  黑屏 + 光点出现
 *   0.3s  光点第一次脉冲
 *   1.0s  光点第二次脉冲
 *   1.8s  光点第三次脉冲，开始扩大
 *   2.0s  光晕扩散到全屏 → 过渡到序章
 *
 * 职责：预加载 Three.js 资源，完成后通知父组件
 */
export function Preloader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-bg-deep)]">
      {/* TODO: 光点脉冲动画 + 资源预加载逻辑 */}
    </div>
  )
}
