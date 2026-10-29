import { Link } from 'react-router-dom'
import PageTransition from '@/components/ui/PageTransition'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Figure from '@/components/ui/Figure'
import EnquiryCTA from '@/components/sections/EnquiryCTA'
import { usePageMeta } from '@/hooks/usePageMeta'
import { byId } from '@/data/images'
import { RESORT, SOURCES } from '@/data/resort'

const SPACES = ['courtyard-seating', 'dining-room', 'kitchen'] as const

export default function StayPage() {
  usePageMeta('Stay', 'Mughaibar Fort Resort lists three large bedrooms in a traditional stone house in Hatta, with a pool, BBQ area, terrace and majlis. Ask the resort for rates and availability.')

  return (
    <PageTransition>
      <PageHero
        eyebrow="Stay"
        title="Three large bedrooms."
        subtitle="A traditional stone house in the Hatta valleys. Capacity, rates and availability are confirmed by the resort."
        image={byId('room-interior')}
        seed={29}
        actions={
          <>
            <Link to="/contact" className="btn-bronze">Enquire about availability</Link>
            <a href={RESORT.contact.whatsappHref} target="_blank" rel="noopener noreferrer" className="link-underline">
              WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </>
        }
      />

      {/* The house */}
      <section className="ground-ivory-deep" aria-labelledby="stay-house-title">
        <div className="container-resort grid items-center gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
          <div className="lg:col-span-5">
            <SectionReveal>
              <SectionHeading
                id="stay-house-title"
                eyebrow="The house"
                title="A stone house among farm land."
                lede="Visit Hatta describes the fort as a traditional stone house, tucked away in the Hatta valleys and embedded within farm land."
              />
              <dl className="mt-10 max-w-[34rem] border-t border-umber/25 font-sans text-[16px]">
                {[
                  { t: 'Bedrooms', d: `${RESORT.accommodation.headline}, as listed` },
                  { t: 'Setting', d: RESORT.location.setting },
                  { t: 'Capacity', d: 'Not published. Ask the resort.' },
                  { t: 'Rates', d: 'Not published. Ask the resort.' },
                ].map((r) => (
                  <div key={r.t} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-umber/15 py-4">
                    <dt className="text-hajar">{r.t}</dt>
                    <dd>{r.d}</dd>
                  </div>
                ))}
              </dl>
            </SectionReveal>
          </div>
          <SectionReveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <Figure image={byId('courtyard-seating')} seed={31} ratio="aspect-[4/3]" />
          </SectionReveal>
        </div>
      </section>

      {/* What the stay comes with */}
      <section className="ground-charcoal" aria-labelledby="stay-amenities-title">
        <div className="container-resort grid gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
          <SectionReveal className="lg:col-span-4">
            <SectionHeading
              id="stay-amenities-title"
              tone="dark"
              eyebrow="Included in the listing"
              title="What the stay comes with."
              lede={
                <>
                  As listed by{' '}
                  <a href={SOURCES.visitHatta} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-sandstone">
                    Visit Hatta<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  . Booking.com agrees on the main features.
                </>
              }
            />
          </SectionReveal>
          <SectionReveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <ul className="border-t border-limewash/20">
              {RESORT.amenities.map((a) => (
                <li key={a.id} className="grid gap-1 border-b border-limewash/20 py-5 sm:grid-cols-[minmax(0,16rem)_1fr] sm:gap-8">
                  <span className="display-fraunces-sm text-[1.4rem] leading-tight">{a.label}</span>
                  <span className="font-sans text-[15px] leading-relaxed text-limewash/75">{a.detail}</span>
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      {/* What we know / what to ask */}
      <section className="ground-sand" aria-labelledby="stay-ask-title">
        <div className="container-resort grid gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
          <SectionReveal className="lg:col-span-5">
            <SectionHeading
              id="stay-ask-title"
              eyebrow="Before you book"
              title="Ask the resort."
              lede="The listings do not publish these details, so this site does not guess at them."
            />
            <p className="body-copy mt-8 max-w-[34rem] text-umber/85">{RESORT.bookingNote}</p>
          </SectionReveal>
          <SectionReveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ul className="border-t border-umber/25 font-sans text-[17px]">
              {RESORT.unconfirmed.map((q) => (
                <li key={q} className="flex gap-4 border-b border-umber/15 py-4">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-5 shrink-0 bg-umber/60" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Link to="/contact" className="btn-bronze">Send an enquiry</Link>
              <a href={RESORT.contact.phoneHref} className="link-underline">{RESORT.contact.phone}</a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Spaces */}
      <section className="ground-ivory" aria-labelledby="stay-spaces-title">
        <div className="container-resort py-24 lg:py-36">
          <SectionReveal>
            <SectionHeading id="stay-spaces-title" eyebrow="Spaces" title="Around the house." lede="Spaces seen in listing photographs. Their use and availability to guests are for the resort to confirm." />
          </SectionReveal>
          <ul className="mt-16 grid gap-x-6 gap-y-12 md:grid-cols-3">
            {SPACES.map((id, i) => (
              <li key={id} className={i === 1 ? 'md:mt-16' : i === 2 ? 'md:mt-32' : ''}>
                <SectionReveal delay={i * 0.1}>
                  <Figure image={byId(id)} seed={80 + i * 9} ratio={i === 1 ? 'aspect-[4/5]' : 'aspect-[4/3]'} />
                </SectionReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryCTA />
    </PageTransition>
  )
}
