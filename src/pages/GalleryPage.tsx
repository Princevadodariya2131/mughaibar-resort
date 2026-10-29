import { useMemo, useState } from 'react'
import { AnimatePresence } from 'motion/react'
import PageTransition from '@/components/ui/PageTransition'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import PropertyImage from '@/components/ui/PropertyImage'
import Lightbox from '@/components/ui/Lightbox'
import EnquiryCTA from '@/components/sections/EnquiryCTA'
import { statusFor } from '@/components/ui/Figure'
import { usePageMeta } from '@/hooks/usePageMeta'
import { RESORT_IMAGES, PHOTO_STATUS, CATEGORY_LABELS, byId, type ImageCategory } from '@/data/images'

type Filter = 'all' | ImageCategory

function statusMessage() {
  if (PHOTO_STATUS.licensed === PHOTO_STATUS.total) return null
  if (PHOTO_STATUS.previewOnly > 0) {
    return `Design preview. ${PHOTO_STATUS.previewOnly} of ${PHOTO_STATUS.total} frames show photographs taken from third-party listings (Booking.com, Wondergifts UAE, Wego). Their licences are not verified, so they are shown only while the site is in development or staging.`
  }
  return `Photographs to come. No licensed photograph of the fort has been added yet, so each frame below shows an illustration in its place. Titles describe the photograph that will go there.`
}

export default function GalleryPage() {
  usePageMeta('Gallery', 'Photographs of Mughaibar Fort Resort in Hatta. Frames without a licensed photograph are shown as clearly labelled illustrations.')
  const [filter, setFilter] = useState<Filter>('all')
  const [open, setOpen] = useState<number | null>(null)

  const categories = useMemo(
    () => Array.from(new Set(RESORT_IMAGES.map((i) => i.category))),
    [],
  )
  const shown = useMemo(
    () => (filter === 'all' ? RESORT_IMAGES : RESORT_IMAGES.filter((i) => i.category === filter)),
    [filter],
  )
  const message = statusMessage()

  const chip = (active: boolean) =>
    `min-h-[44px] rounded-full border px-5 font-sans text-[14px] transition-colors ${
      active ? 'border-umber bg-umber text-limewash' : 'border-umber/35 text-umber hover:border-umber'
    }`

  return (
    <PageTransition>
      <PageHero
        eyebrow="Gallery"
        title="The fort in pictures."
        subtitle="Courtyard, terrace, dining room and bedroom."
        image={byId('courtyard-seating')}
        seed={37}
      />

      <section className="ground-ivory-deep" aria-labelledby="gallery-title">
        <div className="container-resort py-20 lg:py-28">
          <SectionHeading id="gallery-title" eyebrow="All frames" title="Browse the gallery." />

          {message && (
            <p role="note" className="mt-8 max-w-3xl border-l-2 border-dam py-1 pl-5 font-sans text-[15px] leading-relaxed text-umber/85">
              {message}
            </p>
          )}

          <div className="mt-10 flex flex-wrap gap-3" role="group" aria-label="Filter by area">
            <button type="button" className={chip(filter === 'all')} aria-pressed={filter === 'all'} onClick={() => setFilter('all')}>
              All ({RESORT_IMAGES.length})
            </button>
            {categories.map((c) => (
              <button key={c} type="button" className={chip(filter === c)} aria-pressed={filter === c} onClick={() => setFilter(c)}>
                {CATEGORY_LABELS[c]} ({RESORT_IMAGES.filter((i) => i.category === c).length})
              </button>
            ))}
          </div>

          {/* One ratio for every tile keeps the grid calm; the crop follows each image's recorded focal point. */}
          <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {shown.map((image, i) => (
              <li key={image.id}>
                <SectionReveal delay={Math.min(i, 5) * 0.05}>
                  <button
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-haspopup="dialog"
                    className="group block w-full text-left"
                  >
                    <span className="img-zoom relative block aspect-[4/3] w-full overflow-hidden bg-dawn">
                      <PropertyImage image={image} seed={110 + RESORT_IMAGES.indexOf(image) * 7} decorative />
                    </span>
                    <span className="mt-3 block font-sans text-[16px] text-umber">
                      {image.title}
                      <span className="sr-only">, open larger view</span>
                    </span>
                    <span className="caption block text-hajar">
                      {CATEGORY_LABELS[image.category]}
                      {statusFor(image) ? ` · ${statusFor(image)}` : ''}
                    </span>
                  </button>
                </SectionReveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquiryCTA />

      <AnimatePresence>
        {open !== null && (
          <Lightbox images={shown} index={open} onIndexChange={setOpen} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </PageTransition>
  )
}
