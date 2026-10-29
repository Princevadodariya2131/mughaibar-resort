import { Link } from 'react-router-dom'
import { RESORT } from '@/data/resort'

/**
 * Closing enquiry, used on every page. It states contact routes only, never availability or rates.
 * tone="light" is for pages that end on a dark section; "dark" (default) for pages that end on ivory.
 */
export default function EnquiryCTA({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const light = tone === 'light'
  return (
    <section className={light ? 'ground-sand' : 'ground-charcoal'} aria-labelledby="enquiry-cta-heading">
      <div className="container-resort py-24 lg:py-40">
        <p className="eyebrow mb-6">Enquiries</p>
        <h2 id="enquiry-cta-heading" className="display-fraunces max-w-[14ch] text-[clamp(3rem,9vw,8.5rem)] leading-[0.95]">
          Ask about a stay.
        </h2>
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <p className={`max-w-md font-sans text-[18px] leading-relaxed lg:col-span-5 ${light ? 'text-umber/85' : 'text-limewash/80'}`}>
            Availability, capacity and rates are confirmed by the resort directly. Send an enquiry, call, or message on WhatsApp.
          </p>
          <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
            <div>
              <Link to="/contact" className={light ? 'btn-bronze' : 'btn-sand'}>
                Send an enquiry
              </Link>
            </div>
            <dl className={`border-t font-sans text-[16px] ${light ? 'border-umber/25' : 'border-limewash/20'}`}>
              {[
                { t: 'Phone', v: RESORT.contact.phone, h: RESORT.contact.phoneHref, ext: false },
                { t: 'WhatsApp', v: 'Message the resort', h: RESORT.contact.whatsappHref, ext: true },
                { t: 'Email', v: RESORT.contact.email, h: RESORT.contact.emailHref, ext: false },
              ].map((r) => (
                <div key={r.t} className={`grid grid-cols-[6rem_1fr] gap-4 border-b py-4 ${light ? 'border-umber/20' : 'border-limewash/20'}`}>
                  <dt className={light ? 'text-umber/75' : 'text-limewash/70'}>{r.t}</dt>
                  <dd>
                    <a
                      href={r.h}
                      {...(r.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className={`break-all underline underline-offset-4 transition-colors ${light ? 'decoration-umber/40 hover:decoration-umber' : 'decoration-limewash/40 hover:decoration-limewash'}`}
                    >
                      {r.v}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
