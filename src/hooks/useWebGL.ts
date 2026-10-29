import { useState } from 'react'

/** True when a WebGL context can be created. The probe context is released straight away. */
function detect(): boolean {
  if (typeof document === 'undefined') return false
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl')
    if (!gl) return false
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

/** Synchronous detection (no false→true flash on first paint). */
export function useWebGL(): boolean {
  const [supported] = useState<boolean>(detect)
  return supported
}

/**
 * How much 3D this device should be asked to do.
 *   static  no canvas at all (data saver on, or a very low-powered device)
 *   low     canvas with reduced pixel ratio and no antialiasing (phones, small or modest computers)
 *   full    canvas at full quality
 * QA override: add ?scene=static or ?scene=full to the URL.
 */
export type RenderTier = 'static' | 'low' | 'full'

type NavigatorHints = Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } }

function detectTier(): RenderTier {
  if (typeof window === 'undefined') return 'static'
  const override = new URLSearchParams(window.location.search).get('scene')
  if (override === 'static' || override === 'full') return override

  const nav = navigator as NavigatorHints
  if (nav.connection?.saveData) return 'static'
  const cores = nav.hardwareConcurrency ?? 8
  const memory = nav.deviceMemory ?? 8
  if (cores <= 2 || memory <= 2) return 'static'
  const small = window.matchMedia('(max-width: 768px)').matches
  if (small || cores <= 4 || memory <= 4) return 'low'
  return 'full'
}

export function useRenderTier(): RenderTier {
  const [tier] = useState<RenderTier>(detectTier)
  return tier
}
