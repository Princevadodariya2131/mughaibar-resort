import PageTransition from '@/components/ui/PageTransition'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/ui/SectionReveal'
import Figure, { captionFor } from '@/components/ui/Figure'
import PropertyImage from '@/components/ui/PropertyImage'
import Nearby from '@/components/sections/Nearby'
import EnquiryCTA from '@/components/sections/EnquiryCTA'
import { usePageMeta } from '@/hooks/usePageMeta'
import { byId } from '@/data/images'
import { FACILITY_ITEMS, type FacilityItem } from '@/data/facilities'

/**
 * Four chapters, four compositions: wide, tall-left, tall-right, arched.
 * Only what the property lists is described. Anything beyond that is a question for the resort.
 */
function Chapter({ item, index }: { item: FacilityItem; index: number }) {
  const num = String(index + 1).padStart(2, '0')
  const text = (
    <>
      <p className="font-sans text-[13px] tabular-nums text-dam">{num}</p>
      <h3 className="display-fraunces mt-2 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.05]">{item.title}</h3>
      <p className="lede mt-6 max-w-[30rem] text-umber/85">{item.summary}</p>
      <p className="body-copy mt-4 max-w-[30rem] text-hajar">{item.detail}</p>
    </>
  )

  switch (index % 4) {
    case 0: // wide image, text beneath in two columns
      return (
        <SectionReveal>
          <Figure image={item.image} seed={90 + index} ratio="aspect-[21/9]" frameClassName="max-md:aspect-[4/3]" />
          <div className="mt-10 grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-6">{text}</div>
          </div>
        </SectionReveal>
      )
    case 1: // tall image left, text right
      return (
        <SectionReveal className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <Figure image={item.image} seed={90 + index} ratio="aspect-[4/5]" className="lg:col-span-6" />
          <div className="lg:col-span-5 lg:col-start-8">{text}</div>
        </SectionReveal>
      )
    case 2: // text left, wide image right, pushed down
      return (
        <SectionReveal className="grid items-end gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4 lg:pb-8">{text}</div>
          <Figure image={item.image} seed={90 + index} ratio="aspect-[4/3]" className="lg:col-span-7 lg:col-start-6" />
        </SectionReveal>
      )
    default: // arched frame, centred, text to one side
      return (
        <SectionReveal className="grid items-center gap-10 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:col-start-2 lg:order-1">{text}</div>
          <figure className="mx-auto w-full max-w-[26rem] lg:col-span-4 lg:col-start-8 lg:order-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-dawn">
              <PropertyImage image={item.image} seed={90 + index} />
            </div>
            <figcaption className="caption mt-3 text-hajar">{captionFor(item.image)}</figcaption>
          </figure>
        </SectionReveal>
      )
  }
}

export default function ExperiencesPage() {
  usePageMeta('Experiences', 'What Mughaibar Fort Resort lists for guests (pool, terrace, BBQ area, majlis) and independent places to visit around Hatta.')

  return (
    <PageTransition>
      <PageHero
        eyebrow="Experiences"
        title="Life at the fort."
        subtitle="What the property lists for guests, and what lies around Hatta."
        image={byId('terrace-seating')}
        seed={33}
      />

      <section className="ground-ivory-deep" aria-labelledby="exp-intro-title">
        <div className="container-resort grid gap-10 py-24 lg:grid-cols-12 lg:py-36">
          <SectionReveal className="lg:col-span-7">
            <h2 id="exp-intro-title" className="display-fraunces text-balance text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.08]">
              A pool, a terrace, a BBQ area and a majlis, in a stone house among farm land.
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="body-copy text-umber/85">
              That is what Visit Hatta lists for the fort. No programme of guided activities, tours or classes is published,
              so none is described here. Ask the resort what can be arranged.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="ground-ivory" aria-label="Facilities at the fort">
        <div className="container-resort flex flex-col gap-28 py-24 lg:gap-40 lg:py-36">
          {FACILITY_ITEMS.map((item, i) => (
            <Chapter key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      <Nearby />
      <EnquiryCTA tone="light" />
    </PageTransition>
  )
}
