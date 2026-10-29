import type { ResortImage } from '@/data/images'
import PropertyImage from '@/components/ui/PropertyImage'

/** What the viewer is looking at. Empty for a licensed photograph. */
export function statusFor(image: ResortImage) {
  if (image.isPhoto && image.licence === 'licensed') return ''
  if (image.isPreviewOnly) return `Preview from ${image.source}, not licensed for reuse`
  return 'Illustration, photograph to come'
}

/** The caption always says what the viewer is looking at: a licensed photo, a preview, or an illustration. */
export function captionFor(image: ResortImage, caption?: string) {
  const name = caption ?? image.title
  const status = statusFor(image)
  return status ? `${name} · ${status}` : name
}

export default function Figure({
  image,
  seed,
  ratio = 'aspect-[4/3]',
  className = '',
  frameClassName = '',
  captionClassName = 'text-hajar',
  position,
  eager,
  caption,
  hideCaption = false,
}: {
  image: ResortImage
  seed?: number
  /** Tailwind aspect-ratio class, e.g. aspect-[4/5]. Keeps the layout stable while images load. */
  ratio?: string
  className?: string
  frameClassName?: string
  captionClassName?: string
  position?: string
  eager?: boolean
  caption?: string
  hideCaption?: boolean
}) {
  return (
    <figure className={className}>
      <div className={`relative w-full overflow-hidden bg-dawn ${ratio} ${frameClassName}`}>
        <PropertyImage image={image} seed={seed} position={position} eager={eager} />
      </div>
      {!hideCaption && <figcaption className={`caption mt-3 ${captionClassName}`}>{captionFor(image, caption)}</figcaption>}
    </figure>
  )
}
