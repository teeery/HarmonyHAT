/**
 * Three.js 城市场景容器
 *
 * 用于：序章（线框城市 + 粒子数据流）、未来南城 2035
 *
 * 接受子场景通过 props 控制：
 *   - wireframe / textured 模式切换
 *   - 粒子密度
 *   - 时间线进度（ScrollTrigger 驱动）
 */
export function CityScene() {
  return (
    <div className="absolute inset-0">
      {/* TODO: Three.js Canvas — 城市模型 + 粒子系统 + 后处理 */}
      <canvas id="city-canvas" className="w-full h-full" />
    </div>
  )
}
