/**
 * 工具函数 — 缓动、格式化、ID 生成
 */

/** 缓出指数函数（用于动画） */
export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

/** 标准缓出 */
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

/** 线形插值 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

/** 数值映射到范围 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number,
): number {
  return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin)
}

/** 生成唯一 ID */
export function uid(): string {
  return crypto.randomUUID()
}
