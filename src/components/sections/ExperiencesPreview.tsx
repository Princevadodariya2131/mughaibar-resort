import { Link } from 'react-router-dom'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Figure, { statusFor } from '@/components/ui/Figure'
import { FACILITY_ITEMS } from '@/data/facilities'

/** Staggered four-column strip. The columns step down so the row does not read as a card grid. */
export default function ExperiencesPreview() {
  return (
    <section className="ground-ivory-deep" aria-labelledby="exp-preview-title">
      <div className="container-resort py-24 lg:py-36">
        <div className="grid items-end gap-8 lg:grid-cols-12">
          <SectionReveal className="lg:col-span-7">
            <SectionHeading id="exp-preview-title" eyebrow="At the fort" title="Pool, terrace, BBQ and majlis." />
          </SectionReveal>
          <SectionReveal delay={0.1} className="lg:col-span-4 lg:col-start-9">
            <p className="body-copy text-umber/80">
              What the property lists for guests. Nothing here is a programme of activities. Ask the resort what is available.
            </p>
            <p className="mt-6"><Link to="/experiences" className="link-underline">All experiences</Link></p>
          </SectionReveal>
        </div>

        <ol className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {FACILITY_ITEMS.map((f, i) => (
            <li key={f.id} className={i % 2 === 1 ? 'lg:mt-20' : ''}>
              <SectionReveal delay={i * 0.08}>
                <Figure
                  image={f.image}
                  seed={50 + i * 7}
                  ratio="aspect-[3/4]"
                  caption={f.title}
                  hideCaption
                />
                {statusFor(f.image) && <p className="caption mt-3 text-hajar">{statusFor(f.image)}</p>}
                <p className="mt-5 font-sans text-[12px] tabular-nums text-dam">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="display-fraunces mt-1 text-[1.6rem] leading-[1.1]">{f.title}</h3>
                <p className="body-copy mt-3 text-[15px] text-umber/80">{f.summary}</p>
              </SectionReveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
