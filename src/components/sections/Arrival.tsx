import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMotionPreference } from '@/components/providers/MotionPreferenceProvider'
import { Link } from 'react-router-dom'
import PropertyImage from '@/components/ui/PropertyImage'
import { captionFor } from '@/components/ui/Figure'
import { byId } from '@/data/images'
import { RESORT } from '@/data/resort'

gsap.registerPlugin(ScrollTrigger)

// Facts come from data/resort.ts, which records only what public listings confirm.
const FACTS: { term: string; detail: string }[] = [
  { term: 'Where', detail: `${RESORT.location.area}, ${RESORT.location.city}` },
  { term: 'Bedrooms', detail: 'Three large bedrooms' },
  { term: 'Outside', detail: 'Swimming pool, BBQ area, terrace and outdoor seating, shaded walkways' },
  { term: 'Inside', detail: 'Majlis, Wi-Fi, TV system' },
]

export default function Arrival() {
  const { prefersReducedMotion: reduced } = useMotionPreference()
  const rootRef = useRef<HTMLElement>(null)
  const a = byId('terrace-seating')
  const b = byId('room-interior')

  useEffect(() => {
    if (reduced || !rootRef.current) return
    const ctx = gsap.context(() => {
      // Photographs are uncovered like a shutter lifting, once, as they enter
      gsap.utils.toArray<HTMLElement>('[data-uncover]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 82%', once: true } },
        )
        const img = el.querySelector('[data-drift]')
        if (img) gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id="arrival"
      ref={rootRef}
      className={`relative z-20 bg-limewash text-umber ${reduced ? '' : '-mt-[34svh]'}`}
      aria-labelledby="arrival-title"
    >
      <div className="container-resort grid gap-y-16 pb-28 pt-24 lg:grid-cols-12 lg:gap-x-10 lg:pb-44 lg:pt-36">
        <div className="lg:col-span-5">
          <h2
            id="arrival-title"
            className="display-fraunces text-[clamp(2.4rem,5.2vw,4.8rem)] leading-[1.02]"
          >
            A stone house in the valleys of Hatta.
          </h2>
          <p className="mt-9 max-w-[34rem] font-sans text-[18px] leading-[1.65] text-umber/85">
            Mughaibar Fort is a traditional stone house in Sufayri, tucked away in the Hatta valleys among farm land.
            It is listed with three large bedrooms, a swimming pool, a BBQ area, a terrace and a majlis.
          </p>

          <dl className="mt-14 max-w-[34rem] border-t border-umber/25">
            {FACTS.map((f) => (
              <div key={f.term} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-umber/15 py-4 font-sans text-[16px]">
                <dt className="text-hajar">{f.term}</dt>
                <dd>{f.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 max-w-[34rem] font-sans text-[13px] leading-relaxed text-hajar">
            Taken from the Visit Hatta listing. Capacity, rates and availability are for the resort to confirm.
          </p>
          <p className="mt-9">
            <Link to="/stay" className="link-underline">The accommodation</Link>
          </p>
        </div>

        <div className="relative lg:col-span-6 lg:col-start-7">
          <figure data-uncover className="relative aspect-[4/5] w-[86%] overflow-hidden bg-dawn">
            <div data-drift className="absolute inset-x-0 -top-[10%] h-[120%]">
              <PropertyImage image={a} seed={23} decorative />
            </div>
          </figure>
          <p className="mt-3 w-[86%] font-sans text-[12px] text-hajar">
            {captionFor(a)}
          </p>

          <figure data-uncover className="relative -mt-10 ml-auto aspect-[4/3] w-[68%] overflow-hidden border-[10px] border-limewash bg-dawn lg:-mt-28 lg:translate-x-[8%]">
            <div data-drift className="absolute inset-x-0 -top-[10%] h-[120%]">
              <PropertyImage image={b} seed={37} decorative />
            </div>
          </figure>
          <p className="mt-3 ml-auto w-[68%] font-sans text-[12px] text-hajar lg:translate-x-[8%]">
            {captionFor(b)}
          </p>
        </div>
      </div>
    </section>
  )
}
