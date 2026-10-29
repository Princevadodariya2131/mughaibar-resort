import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { useMotionPreference } from '@/components/providers/MotionPreferenceProvider'
import PropertyImage from '@/components/ui/PropertyImage'
import { captionFor } from '@/components/ui/Figure'
import type { ResortImage } from '@/data/images'

const EASE = [0.2, 0.7, 0.2, 1] as const

interface PageHeroProps {
  eyebrow: string
  title: string
  subtitle?: string
  image: ResortImage
  seed?: number
  imageCaption?: string
  /** Replaces the automatic caption entirely (for illustrations that are not stand-ins for a photograph). */
  captionOverride?: string
  /** Optional row of buttons/links under the subtitle. */
  actions?: ReactNode
}

/**
 * Inner-page hero: the home hero's arch motif, scaled down. Ivory ground, large serif title,
 * one arched frame. No scroll-linked effects: the page stays readable the moment it loads.
 */
export default function PageHero({ eyebrow, title, subtitle, image, seed = 11, imageCaption, captionOverride, actions }: PageHeroProps) {
  const { prefersReducedMotion: reduced } = useMotionPreference()
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: EASE },
  })

  return (
    <section className="ground-ivory pb-20 pt-32 lg:pb-28 lg:pt-44">
      <div className="container-resort grid items-end gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.p className="eyebrow mb-6" {...rise(0.05)}>{eyebrow}</motion.p>
          <motion.h1
            className="display-fraunces text-balance text-[clamp(3.2rem,8vw,7.2rem)] leading-[0.94]"
            {...rise(0.15)}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p className="lede mt-9 max-w-[30rem] text-umber/80" {...rise(0.3)}>
              {subtitle}
            </motion.p>
          )}
          {actions && (
            <motion.div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4" {...rise(0.42)}>
              {actions}
            </motion.div>
          )}
        </div>

        <motion.figure className="mx-auto w-full max-w-[26rem] lg:col-span-4 lg:col-start-9 lg:max-w-none" {...rise(0.25)}>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full bg-dawn">
            <PropertyImage image={image} seed={seed} eager />
          </div>
          <figcaption className="caption mt-3 text-hajar">{captionOverride ?? captionFor(image, imageCaption)}</figcaption>
        </motion.figure>
      </div>
    </section>
  )
}
