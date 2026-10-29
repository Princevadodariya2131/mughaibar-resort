import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionPreference } from '@/components/providers/MotionPreferenceProvider'
import PropertyImage from '@/components/ui/PropertyImage'
import { byId } from '@/data/images'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.2, 0.7, 0.2, 1] as const

/** Arch rectangle at rest, expressed as an inset() string in px. Mirrors the CSS fallback (.hero-arch). */
function archInset(w: number, h: number) {
  const mobile = w < 768
  const left = mobile ? w * 0.14 : w * 0.62
  const right = mobile ? w * 0.14 : w * 0.05
  const top = mobile ? h * 0.31 : h * 0.14
  const bottom = mobile ? h * 0.31 : h * 0.06
  const r = (w - left - right) / 2
  return `inset(${top}px ${right}px ${bottom}px ${left}px round ${r}px ${r}px 0px 0px)`
}
const FULL = 'inset(0px 0px 0px 0px round 0px 0px 0px 0px)'

function Line({ children, delay, reduced }: { children: string; delay: number; reduced: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: reduced ? 0 : '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : delay, ease: EASE }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function CinematicHero() {
  const { prefersReducedMotion: reduced } = useMotionPreference()
  const wrapRef = useRef<HTMLElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const archRef = useRef<HTMLDivElement>(null)
  const mediaRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const lowerRef = useRef<HTMLDivElement>(null)
  const image = byId('courtyard-seating')

  useEffect(() => {
    if (reduced || !wrapRef.current) return
    const ctx = gsap.context(() => {
      const w = () => window.innerWidth
      const h = () => window.innerHeight

      // Entrance: the frame is drawn open from the bottom (GSAP owns only the frame element)
      gsap.from(frameRef.current, { clipPath: 'inset(100% 0% 0% 0%)', duration: 1.5, ease: 'expo.out', delay: 0.1 })

      // Scroll: the arch opens to the full frame; the camera "pulls" through it
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.7,
          invalidateOnRefresh: true,
        },
      })
      tl.fromTo(archRef.current, { clipPath: () => archInset(w(), h()) }, { clipPath: FULL, ease: 'power2.inOut', duration: 0.72 }, 0)
        .fromTo(mediaRef.current, { scale: 1.22 }, { scale: 1, ease: 'none', duration: 1 }, 0)
        .to(titleRef.current, { yPercent: -14, xPercent: -4, opacity: 0, ease: 'power1.in', duration: 0.2 }, 0)
        .to(lowerRef.current, { autoAlpha: 0, ease: 'power1.in', duration: 0.14 }, 0)
        .to({}, { duration: 0.28 }) // hold on the open frame while the next section rises over it
    }, wrapRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={wrapRef}
      className={`relative bg-limewash ${reduced ? 'h-svh min-h-[640px]' : 'h-[250svh]'}`}
      aria-label="Mughaibar Fort Resort"
    >
      <div className="sticky top-0 h-svh min-h-[640px] overflow-hidden">
        <div ref={frameRef} className="absolute inset-0">
          <div ref={archRef} className="hero-arch absolute inset-0 overflow-hidden bg-dawn">
            <div ref={mediaRef} className="absolute inset-0 origin-center">
              <PropertyImage image={image} position="50% 62%" eager decorative />
            </div>
          </div>
        </div>

        {/* Title block */}
        <div className="container-resort pointer-events-none relative z-10 flex h-full flex-col justify-between pb-[7svh] pt-[16svh] md:pt-[18svh]">
          <div ref={titleRef}>
            <h1 className="font-display display-fraunces text-umber leading-[0.9] text-[clamp(4.5rem,12.2vw,12rem)]">
              <Line delay={0.55} reduced={reduced}>Mughaibar</Line>
              <span className="display-fraunces-sm mt-[0.2em] block text-[0.3em] leading-none text-hajar">
                <Line delay={0.75} reduced={reduced}>Fort Resort, Hatta</Line>
              </span>
            </h1>
          </div>

          <div ref={lowerRef} className="pointer-events-auto max-w-[30rem]">
            <motion.p
              className="mb-7 font-sans text-[17px] leading-[1.55] text-umber/85 md:text-lg"
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 1.35, duration: 0.9, ease: EASE }}
            >
              A stone fort in the mountain valleys of Hatta, Dubai.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center gap-x-7 gap-y-4"
              initial={{ opacity: 0, y: reduced ? 0 : 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduced ? 0 : 1.55, duration: 0.9, ease: EASE }}
            >
              <Link to="/contact" className="btn-bronze">Enquire about a stay</Link>
              <Link to="/stay" className="link-underline">See the accommodation</Link>
            </motion.div>
          </div>
        </div>

        {/* Caption sits under the arch so it never competes with the image */}
        <p className="pointer-events-none absolute bottom-[1.6svh] right-5 z-10 max-w-[16rem] text-right font-sans text-[12px] leading-snug text-hajar sm:right-8 lg:right-12 max-md:hidden">
          {image.isPreviewOnly ? 'Preview photograph, not licensed' : image.isPhoto ? 'The courtyard' : 'Illustration of the Hajar Mountains. Photograph to come'}
        </p>
      </div>
    </section>
  )
}
