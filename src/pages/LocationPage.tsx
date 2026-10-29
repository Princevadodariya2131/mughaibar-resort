import { ExternalLink } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import ConceptualLandscape from '@/components/ui/ConceptualLandscape'
import Nearby from '@/components/sections/Nearby'
import EnquiryCTA from '@/components/sections/EnquiryCTA'
import { usePageMeta } from '@/hooks/usePageMeta'
import { placeholderImage } from '@/data/images'
import { RESORT, SOURCES } from '@/data/resort'

const STEPS = [
  { t: 'Set the destination', d: 'Use the directions button. It opens Google Maps with the fort as the destination. Waze is offered too.' },
  { t: 'Take the road to Hatta', d: 'From Dubai, Hatta is reached on the E44 (Dubai–Hatta Road). Other routes exist; follow your maps app.' },
  { t: 'Allow for the journey', d: 'Journey time depends on where you start and on traffic. Check it in your maps app before you set out. This site does not quote one.' },
  { t: 'Confirm the final approach', d: 'The fort is tucked away among farm land near Hatta Wadi Hub. Ask the resort for the final approach when you enquire.' },
]

const NEW_TAB = <span className="sr-only"> (opens in a new tab)</span>

export default function LocationPage() {
  usePageMeta('Location', 'Mughaibar Fort Resort is in Sufayri, Hatta, Dubai, near Hatta Wadi Hub. Directions links for Google Maps and Waze.')

  return (
    <PageTransition>
      <PageHero
        eyebrow="Location"
        title="Hatta, Sufayri."
        subtitle="Tucked away in the Hatta valleys among farm land, in the Hajar Mountains of Dubai."
        image={placeholderImage('location', 'Hajar Mountains')}
        seed={19}
        captionOverride="Conceptual illustration of the Hajar Mountains. It is not a map."
        actions={
          <>
            <a href={RESORT.location.directionsLink} target="_blank" rel="noopener noreferrer" className="btn-bronze">
              Get directions <ExternalLink size={15} aria-hidden="true" />{NEW_TAB}
            </a>
            <a href={RESORT.location.mapLink} target="_blank" rel="noopener noreferrer" className="link-underline">
              View on Google Maps{NEW_TAB}
            </a>
          </>
        }
      />

      <section className="ground-ivory-deep" aria-labelledby="loc-glance-title">
        <div className="container-resort grid items-center gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
          <SectionReveal className="lg:col-span-6">
            <SectionHeading id="loc-glance-title" eyebrow="At a glance" title="Where the fort is." />
            <dl className="mt-10 max-w-[34rem] border-t border-umber/25 font-sans text-[16px]">
              {[
                { t: 'Area', d: RESORT.location.area },
                { t: 'City', d: `${RESORT.location.city}, ${RESORT.location.country}` },
                { t: 'Landmark', d: RESORT.location.nearbyLandmark },
                { t: 'Setting', d: RESORT.location.setting },
              ].map((r) => (
                <div key={r.t} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-umber/15 py-4">
                  <dt className="text-hajar">{r.t}</dt>
                  <dd>{r.d}</dd>
                </div>
              ))}
            </dl>
            <p className="caption mt-5 max-w-[34rem] text-hajar">
              From the{' '}
              <a href={SOURCES.visitHatta} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">Visit Hatta listing{NEW_TAB}</a>
              {' '}and project research notes. No street address or coordinates are published in the sources, so none is shown.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.1} className="lg:col-span-4 lg:col-start-8">
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-dawn">
                <ConceptualLandscape seed={23} className="h-full w-full" decorative />
              </div>
              <figcaption className="caption mt-3 text-hajar">Illustration only.</figcaption>
            </figure>
          </SectionReveal>
        </div>
      </section>

      <section className="ground-sand" aria-labelledby="loc-steps-title">
        <div className="container-resort grid gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
          <SectionReveal className="lg:col-span-5">
            <SectionHeading id="loc-steps-title" eyebrow="Getting here" title="Reaching the fort." lede={RESORT.location.directionsNote} />
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={RESORT.location.directionsLink} target="_blank" rel="noopener noreferrer" className="btn-bronze">Google Maps directions{NEW_TAB}</a>
              <a href={RESORT.location.wazeLink} target="_blank" rel="noopener noreferrer" className="link-underline">Open in Waze{NEW_TAB}</a>
              <a href={RESORT.contact.phoneHref} className="link-underline">Call {RESORT.contact.phone}</a>
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <ol className="border-t border-umber/25">
              {STEPS.map((s, i) => (
                <li key={s.t} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-umber/15 py-6">
                  <span className="pt-1 font-sans text-[13px] tabular-nums text-umber/70">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="display-fraunces-sm text-[1.5rem] leading-tight">{s.t}</h3>
                    <p className="body-copy mt-2 text-umber/85">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionReveal>
        </div>
      </section>

      <Nearby />
      <EnquiryCTA tone="light" />
    </PageTransition>
  )
}
