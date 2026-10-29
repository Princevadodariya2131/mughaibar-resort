import { Component, Suspense, lazy, useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionPreference } from '@/components/providers/MotionPreferenceProvider'
import { useWebGL, useRenderTier } from '@/hooks/useWebGL'
import ConceptualLandscape from '@/components/ui/ConceptualLandscape'
import { RESORT } from '@/data/resort'

gsap.registerPlugin(ScrollTrigger)

const DesertLandscape = lazy(() => import('@/components/3d/DesertLandscape'))

const BEATS = [
  'From Dubai, the E44 leads to Hatta.',
  'The road climbs into the Hajar Mountains.',
  `The fort is in ${RESORT.location.area}.`,
]

class CanvasBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

/** Static version: used without WebGL, with reduced motion, or if the canvas throws. */
function StaticValley() {
  return (
    <section className="relative bg-limewash text-umber" aria-labelledby="valley-title">
      <div className="relative h-[70svh] min-h-[420px] overflow-hidden">
        <ConceptualLandscape className="absolute inset-0 h-full w-full" decorative />
      </div>
      <div className="container-resort py-16 lg:py-24 grid lg:grid-cols-12 gap-10">
        <h2 id="valley-title" className="lg:col-span-5 font-display display-fraunces text-4xl lg:text-5xl leading-[1.05]">
          The way in runs up a mountain valley.
        </h2>
        <div className="lg:col-span-6 lg:col-start-7 space-y-4 font-sans text-lg leading-relaxed text-umber/80">
          {BEATS.map((b) => <p key={b}>{b}</p>)}
          <p className="pt-4"><Link to="/location" className="link-underline">Directions and map</Link></p>
          <p className="text-sm text-hajar">Conceptual illustration. It is not a model of the resort or its surroundings.</p>
        </div>
      </div>
    </section>
  )
}

export default function LandscapeScene3D() {
  const { prefersReducedMotion } = useMotionPreference()
  const webgl = useWebGL()
  const tier = useRenderTier()
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const beatRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)
  const pointerRef = useRef(0)
  const [near, setNear] = useState(false)      // mount the canvas shortly before it is needed
  const [active, setActive] = useState(false)  // render frames only while visible
  const [failed, setFailed] = useState(false)

  const useStatic = prefersReducedMotion || !webgl || tier === 'static' || failed

  // load three.js only when the section is close
  useEffect(() => {
    if (useStatic || !sectionRef.current) return
    const el = sectionRef.current
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setNear(true); setActive(e.isIntersecting) },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [useStatic])

  // scroll choreography: camera progress + caption beats (GSAP only touches these elements)
  useEffect(() => {
    if (useStatic || !sectionRef.current) return
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => { progressRef.current = self.progress },
      })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
      })
      const beats = beatRefs.current.filter(Boolean) as HTMLElement[]
      beats.forEach((b, i) => {
        tl.fromTo(b, { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, i * 1.6)
        if (i < beats.length - 1) tl.to(b, { autoAlpha: 0, y: -28, duration: 0.5, ease: 'power2.in' }, i * 1.6 + 1.1)
      })
      if (ctaRef.current) tl.fromTo(ctaRef.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4 }, (beats.length - 1) * 1.6 + 0.4)
      tl.to({}, { duration: 0.6 }) // hold the last frame
    }, sectionRef)
    return () => ctx.revert()
  }, [useStatic, near])

  // gentle pointer parallax (fine pointers only)
  useEffect(() => {
    if (useStatic || !window.matchMedia('(pointer: fine)').matches) return
    const move = (e: PointerEvent) => { pointerRef.current = (e.clientX / window.innerWidth - 0.5) * 2 }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [useStatic])

  if (useStatic) return <StaticValley />

  const lowPower = tier === 'low'

  return (
    <section ref={sectionRef} className="relative h-[280svh] bg-limewash" aria-labelledby="valley-title">
      <h2 id="valley-title" className="sr-only">The way in runs up a mountain valley</h2>
      {/* The scroll-driven scene never traps a keyboard or screen-reader user: this jumps past it. */}
      <a
        href="#nearby"
        className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-24 focus:z-30 focus:rounded-full focus:bg-limewash focus:px-5 focus:py-3 focus:text-umber"
      >
        Skip the animated landscape
      </a>
      <div ref={stageRef} className="sticky top-0 h-svh overflow-hidden"
        style={{ background: 'linear-gradient(to bottom, #E1D2AE 0%, #F3E3C2 62%, #EBD8B0 100%)' }}>
        {/* static first frame behind the canvas: visible instantly, and if the canvas never paints */}
        <ConceptualLandscape className="absolute inset-0 h-full w-full" decorative />
        {near && (
          <CanvasBoundary fallback={<FailNotice onFail={() => setFailed(true)} />}>
            <Suspense fallback={null}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #E1D2AE 0%, #F3E3C2 62%, #EBD8B0 100%)' }}>
                <DesertLandscape progressRef={progressRef} pointerRef={pointerRef} active={active} lowPower={lowPower} onContextLost={() => setFailed(true)} />
              </div>
            </Suspense>
          </CanvasBoundary>
        )}

        <div className="pointer-events-none absolute inset-x-0 top-[14svh] px-6 text-center" aria-live="polite">
          <div className="relative mx-auto h-28 max-w-3xl">
            {BEATS.map((b, i) => (
              <p
                key={b}
                ref={(el) => { beatRefs.current[i] = el }}
                className="absolute inset-0 font-display display-fraunces text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.08] text-umber opacity-0"
              >
                {b}
              </p>
            ))}
          </div>
        </div>
        <div ref={ctaRef} className="absolute bottom-[8svh] left-1/2 -translate-x-1/2 opacity-0">
          <Link to="/location" className="btn-bronze">Directions and map</Link>
        </div>
        <p className="absolute bottom-4 left-5 right-5 text-[12px] font-sans text-limewash/80 sm:left-8">
          Conceptual landscape. Not a model of the resort or its surroundings.
        </p>
      </div>
    </section>
  )
}

function FailNotice({ onFail }: { onFail: () => void }) {
  useEffect(() => { onFail() }, [onFail])
  return null
}
