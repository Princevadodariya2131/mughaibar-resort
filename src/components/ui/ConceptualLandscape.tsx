import { useId, useMemo } from 'react'
import { buildRidges, ridgesToSvgPaths, LANDSCAPE } from '@/lib/ridges'

/**
 * Static, resolution-independent conceptual landscape.
 * Used (a) as the stand-in for any photograph that has no licensed file yet, and
 * (b) as the 3D section's fallback without WebGL or with reduced motion.
 * It is an illustration, never presented as a photograph of the resort.
 */
export default function ConceptualLandscape({
  className = '',
  seed = 11,
  label = 'Conceptual illustration of layered Hajar mountain ridgelines',
  decorative = false,
}: {
  className?: string
  seed?: number
  /** Accessible name. Say what the illustration stands in for. */
  label?: string
  /** True when a caption or heading beside it already says everything. */
  decorative?: boolean
}) {
  const layers = useMemo(() => ridgesToSvgPaths(buildRidges(seed)), [seed])
  // Unique per instance: a shared id breaks when the first SVG with it is hidden.
  const gradId = `cl-sky-${useId().replace(/:/g, '')}`
  return (
    <svg
      className={className}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={LANDSCAPE.skyTop} />
          <stop offset="1" stopColor={LANDSCAPE.skyHorizon} />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill={`url(#${gradId})`} />
      <circle cx="760" cy="250" r="64" fill={LANDSCAPE.sun} />
      {layers.map((l, i) => (
        <path key={i} d={l.d} fill={l.fill} />
      ))}
    </svg>
  )
}
