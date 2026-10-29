import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { RESORT } from '@/data/resort'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/stay', label: 'Stay' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/location', label: 'Location' },
  { to: '/contact', label: 'Contact' },
]

const CONTACT_ROWS = [
  { term: 'Phone', label: RESORT.contact.phone, href: RESORT.contact.phoneHref, external: false },
  { term: 'Email', label: RESORT.contact.email, href: RESORT.contact.emailHref, external: false },
  { term: 'WhatsApp', label: 'Message the resort', href: RESORT.contact.whatsappHref, external: true },
  { term: 'Map', label: `${RESORT.location.area}, ${RESORT.location.city}`, href: RESORT.location.mapLink, external: true },
]

export default function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="ground-charcoal" role="contentinfo">
      <div className="container-resort py-20 lg:py-28">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link to="/" aria-label="Mughaibar Fort Resort, home" className="inline-block">
              <span className="display-fraunces block text-[clamp(2.6rem,6vw,4.6rem)] leading-none">Mughaibar</span>
              <span className="mt-3 block font-sans text-[13px] tracking-[0.2em] text-sandstone uppercase">Fort Resort · Hatta · Dubai</span>
            </Link>
            <p className="body-copy mt-8 max-w-sm text-limewash/75">
              {RESORT.shortDescription}
            </p>
            <Link to="/contact" className="btn-sand mt-8">
              Plan your stay <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <nav className="lg:col-span-3 lg:col-start-7" aria-label="Footer navigation">
            <h2 className="eyebrow mb-6 font-sans">Explore</h2>
            <ul className="space-y-1">
              {NAV_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-flex min-h-[40px] items-center font-sans text-[16px] text-limewash/85 transition-colors hover:text-sandstone">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="eyebrow mb-6 font-sans">Contact</h2>
            <dl className="font-sans text-[15px]">
              {CONTACT_ROWS.map((r) => (
                <div key={r.term} className="grid grid-cols-[5.5rem_1fr] gap-3 border-b border-limewash/15 py-3">
                  <dt className="text-limewash/65">{r.term}</dt>
                  <dd>
                    <a
                      href={r.href}
                      {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="break-words text-limewash/90 underline decoration-limewash/30 underline-offset-4 transition-colors hover:text-sandstone hover:decoration-sandstone"
                    >
                      {r.label}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="mt-16 border-t border-limewash/15 pt-8 font-sans text-[13px] leading-relaxed text-limewash/65">
          <p className="max-w-3xl">
            {RESORT.demoDisclaimer}{' '}
            <a
              href={RESORT.contact.officialWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 transition-colors hover:text-sandstone"
            >
              Official website ↗
            </a>
          </p>
          <p className="mt-4">© {year} Redesign concept. Hatta, Dubai, United Arab Emirates.</p>
        </div>
      </div>
    </footer>
  )
}
