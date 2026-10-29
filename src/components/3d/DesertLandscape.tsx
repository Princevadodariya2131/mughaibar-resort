import { useMemo, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { buildRidges, ridgeColor, mix, LANDSCAPE, SAMPLES } from '@/lib/ridges'

/**
 * Conceptual Hajar wadi corridor — layered ridgelines, haze and a low sun.
 * It is an atmosphere piece. It is NOT a model of the resort or its real surroundings.
 */

const Z0 = -8          // first layer z
const Z_STEP = -13     // spacing between layers
const CAM_START = 16
const CAM_END = -50

function RidgeLayer({ index, heights, depth }: { index: number; heights: number[]; depth: number }) {
  const geometry = useMemo(() => {
    const width = 80 + index * 34
    const amp = 20 + depth * 14
    const pos = new Float32Array((SAMPLES + 1) * 2 * 3)
    const idx: number[] = []
    for (let i = 0; i <= SAMPLES; i++) {
      const x = (i / SAMPLES - 0.5) * width
      pos.set([x, heights[i] * amp, 0], i * 6)
      pos.set([x, -45, 0], i * 6 + 3)
      if (i < SAMPLES) {
        const a = i * 2
        idx.push(a, a + 1, a + 2, a + 1, a + 3, a + 2)
      }
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    g.setIndex(idx)
    return g
  }, [index, heights, depth])

  // fog supplies most of the distance haze; keep per-layer colour only slightly lighter
  const color = useMemo(() => mix(ridgeColor(0), ridgeColor(depth), 0.45), [depth])

  return (
    <mesh geometry={geometry} position={[0, 0, Z0 + index * Z_STEP]}>
      <meshBasicMaterial color={color} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Rig({
  progressRef,
  pointerRef,
}: {
  progressRef: MutableRefObject<number>
  pointerRef: MutableRefObject<number>
}) {
  const { camera } = useThree()
  const cur = useMemo(() => ({ p: progressRef.current, x: 0 }), [progressRef])
  useFrame(() => {
    cur.p += (progressRef.current - cur.p) * 0.08
    cur.x += (pointerRef.current * 1.4 - cur.x) * 0.05
    const p = cur.p
    camera.position.set(cur.x, 11 - p * 3.2, CAM_START + (CAM_END - CAM_START) * p)
    camera.lookAt(cur.x * 0.4, 3.5 + p * p * 10, camera.position.z - 40)
  })
  return null
}

export default function DesertLandscape({
  progressRef,
  pointerRef,
  active,
  lowPower,
  onContextLost,
}: {
  progressRef: MutableRefObject<number>
  pointerRef: MutableRefObject<number>
  active: boolean
  lowPower: boolean
  /** Called if the browser drops the WebGL context, so the page can fall back to the static landscape. */
  onContextLost?: () => void
}) {
  const ridges = useMemo(() => buildRidges(11), [])
  return (
    <Canvas
      dpr={lowPower ? [1, 1.25] : [1, 1.75]}
      flat
      frameloop={active ? 'always' : 'never'}
      camera={{ fov: 42, near: 0.1, far: 320, position: [0, 11, CAM_START] }}
      gl={{ antialias: !lowPower, alpha: true, powerPreference: lowPower ? 'low-power' : 'high-performance' }}
      aria-hidden="true"
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
          onContextLost?.()
        })
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <fog attach="fog" args={[LANDSCAPE.haze, 18, 115]} />
      {/* sun sits beyond the fog range so it stays crisp */}
      <mesh position={[16, 22, -140]}>
        <circleGeometry args={[15, 48]} />
        <meshBasicMaterial color={LANDSCAPE.sun} fog={false} />
      </mesh>
      {ridges.map((r, i) => (
        <RidgeLayer key={i} index={i} heights={r.heights} depth={r.depth} />
      ))}
      <Rig progressRef={progressRef} pointerRef={pointerRef} />
    </Canvas>
  )
}
