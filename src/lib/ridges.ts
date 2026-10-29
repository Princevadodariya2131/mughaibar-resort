/**
 * Deterministic ridgeline generator shared by the WebGL scene and the static SVG fallback,
 * so both render the *same* conceptual landscape.
 *
 * This is an abstract impression of Hajar-mountain terrain with a wadi corridor down the middle.
 * It is NOT a survey or model of the resort site.
 */

function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function valueNoise(rand: () => number, n: number) {
  const pts = Array.from({ length: n + 2 }, () => rand())
  return (x: number) => {
    const f = x * n, i = Math.floor(f), t = f - i
    const s = t * t * (3 - 2 * t)
    return pts[i] * (1 - s) + pts[i + 1] * s
  }
}

export interface Ridge {
  /** 0 = nearest, 1 = furthest */
  depth: number
  /** Heights 0..1 sampled evenly across x 0..1 */
  heights: number[]
}

export const RIDGE_COUNT = 7
export const SAMPLES = 120

export function buildRidges(seed = 11): Ridge[] {
  const rand = mulberry32(seed)
  return Array.from({ length: RIDGE_COUNT }, (_, k) => {
    const depth = k / (RIDGE_COUNT - 1)
    const big = valueNoise(rand, 4 + k)
    const small = valueNoise(rand, 18 + k * 3)
    const heights = Array.from({ length: SAMPLES + 1 }, (_, i) => {
      const x = i / SAMPLES
      const edge = Math.abs(x - 0.5) * 2 // 0 centre → 1 edges
      // wadi corridor: low in the middle, rising toward both walls; far layers fill in more
      const wall = 0.12 + 0.88 * Math.pow(edge, 1.35)
      const corridor = wall * (1 - depth * 0.55) + depth * 0.35
      const rough = big(x) * 0.7 + small(x) * 0.3
      return Math.min(1, corridor * (0.55 + rough * 0.75))
    })
    return { depth, heights }
  })
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const toHex = (c: number[]) => '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
export const mix = (a: string, b: string, t: number) => {
  const A = hex(a), B = hex(b)
  return toHex(A.map((v, i) => lerp(v, B[i], t)))
}

export const LANDSCAPE = {
  skyTop: '#E1D2AE',
  skyHorizon: '#F3E3C2',
  haze: '#E6D8BC',
  sun: '#F8E9C8',
  nearColor: '#3A3027',
  farColor: '#B9A885',
} as const

/** Flat-colour silhouette per layer, hazier with distance. */
export const ridgeColor = (depth: number) =>
  mix(LANDSCAPE.nearColor, LANDSCAPE.farColor, Math.pow(depth, 0.8))

/** SVG fallback — viewBox 0 0 1200 800 */
export function ridgesToSvgPaths(ridges: Ridge[], w = 1200, h = 800) {
  return [...ridges].reverse().map((r) => {
    // far layers sit higher (horizon), near layers lower and taller
    const base = h * (0.58 + (1 - r.depth) * 0.3)
    const amp = h * (0.2 + (1 - r.depth) * 0.28)
    const pts = r.heights.map((v, i) => `${((i / SAMPLES) * w).toFixed(1)},${(base - v * amp).toFixed(1)}`)
    return { d: `M0,${h} L${pts.join(' L')} L${w},${h} Z`, fill: ridgeColor(r.depth), depth: r.depth }
  })
}
