import { Link } from 'react-router-dom'
import PageTransition from '@/components/ui/PageTransition'
import ConceptualLandscape from '@/components/ui/ConceptualLandscape'
import { usePageMeta } from '@/hooks/usePageMeta'

const LINKS = [
  { to: '/stay', label: 'Stay' },
  { to: '/experiences', label: 'Experiences' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/location', label: 'Location' },
  { to: '/contact', label: 'Contact' },
]

export default function NotFoundPage() {
  usePageMeta('Page not found')
  return (
    <PageTransition>
      <section className="ground-ivory">
        <div className="container-resort grid min-h-[100svh] items-center gap-12 pb-20 pt-32 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-6">Error 404</p>
            <h1 className="display-fraunces text-balance text-[clamp(3.2rem,8vw,7rem)] leading-[0.94]">This path leads nowhere.</h1>
            <p className="lede mt-8 max-w-[28rem] text-umber/80">The page you asked for does not exist. These do.</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {LINKS.map((l) => (
                <li key={l.to}><Link to={l.to} className="link-underline">{l.label}</Link></li>
              ))}
            </ul>
            <Link to="/" className="btn-bronze mt-10">Back to the home page</Link>
          </div>
          <div className="mx-auto w-full max-w-[22rem] lg:col-span-4 lg:col-start-9 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-dawn">
              <ConceptualLandscape seed={5} className="h-full w-full" decorative />
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  )
}
