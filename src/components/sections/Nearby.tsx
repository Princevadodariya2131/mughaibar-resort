import { NEARBY_ATTRACTIONS } from '@/data/resort'

/** Dusk section: a plain ruled index of places nearby. Typographic, not a card grid. */
export default function Nearby() {
  return (
    <section id="nearby" className="ground-charcoal" aria-labelledby="nearby-title">
      <div className="container-resort grid gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <h2 id="nearby-title" className="display-fraunces text-[clamp(2.4rem,5vw,4.4rem)] leading-[1.02]">
              Around Hatta
            </h2>
            <p className="mt-6 max-w-sm font-sans text-[16px] leading-relaxed text-limewash/75">
              Separate places in the area. They are not run by the resort, and each description cites where it comes from.
            </p>
          </div>
        </div>

        <ol className="border-t border-limewash/20 lg:col-span-8 lg:col-start-5">
          {NEARBY_ATTRACTIONS.map((a, i) => (
            <li key={a.name} className="group border-b border-limewash/20">
              <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-8 transition-transform duration-500 ease-out motion-safe:group-hover:translate-x-2 lg:grid-cols-[3.5rem_1fr_1.2fr] lg:gap-x-8 lg:py-10">
                <span className="pt-2 font-sans text-[13px] tabular-nums text-sandstone">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="display-fraunces text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.1]">{a.name}</h3>
                <div className="col-start-2 mt-3 lg:col-start-3 lg:mt-1.5">
                  <p className="font-sans text-[16px] leading-relaxed text-limewash/75">{a.description}</p>
                  <p className="mt-3 font-sans text-[13px] text-limewash/65">
                    Source:{' '}
                    <a href={a.sourceUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-sandstone">
                      {a.source}<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
