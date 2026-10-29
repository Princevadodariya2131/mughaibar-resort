import { Link } from 'react-router-dom'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Figure from '@/components/ui/Figure'
import { byId } from '@/data/images'
import { RESORT } from '@/data/resort'

/** Dusk panel: one wide image on the left, a short ruled list on the right. */
export default function StayPreview() {
  const room = byId('room-interior')
  const highlights = RESORT.amenities.filter((a) => ['pool', 'bbq', 'terrace', 'majlis', 'wifi'].includes(a.id))

  return (
    <section className="ground-charcoal" aria-labelledby="stay-preview-title">
      <div className="container-resort grid items-center gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
        <SectionReveal className="lg:col-span-7">
          <Figure
            image={room}
            seed={41}
            ratio="aspect-[5/4]"
            captionClassName="text-limewash/70"
          />
        </SectionReveal>

        <div className="lg:col-span-4 lg:col-start-9">
          <SectionReveal>
            <SectionHeading
              id="stay-preview-title"
              tone="dark"
              eyebrow="Stay"
              title={RESORT.accommodation.headline + '.'}
              lede="A traditional stone house in the Hatta valleys. The sources do not describe each room, so details are confirmed with the resort."
            />
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <ul className="mt-10 border-t border-limewash/20 font-sans text-[16px]">
              {highlights.map((a) => (
                <li key={a.id} className="border-b border-limewash/20 py-3.5 text-limewash/90">
                  {a.label}
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link to="/stay" className="btn-sand">The accommodation</Link>
              <Link to="/contact" className="link-underline">Ask about availability</Link>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
