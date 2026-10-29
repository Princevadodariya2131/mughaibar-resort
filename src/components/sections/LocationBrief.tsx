import { ExternalLink } from 'lucide-react'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import ConceptualLandscape from '@/components/ui/ConceptualLandscape'
import { RESORT } from '@/data/resort'

/** Where it is, how to get map directions, and what is deliberately not claimed. */
export default function LocationBrief() {
  const rows = [
    { term: 'Area', detail: `${RESORT.location.area}, ${RESORT.location.city}` },
    { term: 'Landmark', detail: RESORT.location.nearbyLandmark },
    { term: 'Setting', detail: RESORT.location.setting },
    { term: 'From Dubai', detail: 'On the E44 (Dubai–Hatta Road)' },
  ]
  return (
    <section className="ground-ivory" aria-labelledby="location-brief-title">
      <div className="container-resort grid gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
        <div className="lg:col-span-6">
          <SectionReveal>
            <SectionHeading
              id="location-brief-title"
              eyebrow="Location"
              title="Hatta, Sufayri, Dubai."
              lede="Journey times depend on your starting point and the traffic, so they are not quoted here. Set your route in a maps app."
            />
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <dl className="mt-10 max-w-[34rem] border-t border-umber/25 font-sans text-[16px]">
              {rows.map((r) => (
                <div key={r.term} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-umber/15 py-4">
                  <dt className="text-hajar">{r.term}</dt>
                  <dd>{r.detail}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a href={RESORT.location.directionsLink} target="_blank" rel="noopener noreferrer" className="btn-bronze">
                Get directions <ExternalLink size={15} aria-hidden="true" />
                <span className="sr-only"> (opens Google Maps in a new tab)</span>
              </a>
              <a href={RESORT.location.mapLink} target="_blank" rel="noopener noreferrer" className="link-underline">
                View on Google Maps<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={RESORT.location.wazeLink} target="_blank" rel="noopener noreferrer" className="link-underline">
                Open in Waze<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </SectionReveal>
        </div>

        <SectionReveal delay={0.15} className="lg:col-span-5 lg:col-start-8">
          <figure>
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-dawn">
              <ConceptualLandscape seed={19} className="h-full w-full" decorative />
            </div>
            <figcaption className="caption mt-3 text-hajar">
              Conceptual illustration of the Hajar Mountains. It is not a map or a model of the resort.
            </figcaption>
          </figure>
        </SectionReveal>
      </div>
    </section>
  )
}
