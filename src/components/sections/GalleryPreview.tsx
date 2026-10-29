import { Link } from 'react-router-dom'
import SectionReveal from '@/components/ui/SectionReveal'
import SectionHeading from '@/components/ui/SectionHeading'
import Figure from '@/components/ui/Figure'
import { byId } from '@/data/images'

/** Editorial collage: one tall, one wide, one small, deliberately different shapes. */
export default function GalleryPreview() {
  const tall = byId('courtyard-seating')
  const wide = byId('dining-room')
  const small = byId('evening-retreat')

  return (
    <section className="ground-charcoal border-t border-limewash/10" aria-labelledby="gallery-preview-title">
      <div className="container-resort py-24 lg:py-36">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionReveal>
            <SectionHeading id="gallery-preview-title" tone="dark" eyebrow="Gallery" title="The fort, room by room." />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <Link to="/gallery" className="btn-line-light">Open the gallery</Link>
          </SectionReveal>
        </div>

        <div className="mt-16 grid gap-x-6 gap-y-12 lg:mt-20 lg:grid-cols-12">
          <SectionReveal className="lg:col-span-4">
            <Figure image={tall} seed={61} ratio="aspect-[3/4]" captionClassName="text-limewash/70" />
          </SectionReveal>
          <SectionReveal delay={0.1} className="lg:col-span-5 lg:mt-24">
            <Figure image={wide} seed={67} ratio="aspect-[4/3]" captionClassName="text-limewash/70" />
          </SectionReveal>
          <SectionReveal delay={0.2} className="lg:col-span-3 lg:mt-52">
            <Figure image={small} seed={73} ratio="aspect-square" captionClassName="text-limewash/70" />
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
