import { useState } from 'react'
import type { ResortImage } from '@/data/images'
import ConceptualLandscape from '@/components/ui/ConceptualLandscape'

/**
 * Renders a property photograph when one may be shown. Otherwise renders an honestly
 * labelled illustration, never a fake "photo". The caller sizes the frame; this fills it.
 */
export default function PropertyImage({
  image,
  seed = 11,
  className = '',
  position,
  eager = false,
  fit = 'cover',
  decorative = false,
}: {
  image: ResortImage
  seed?: number
  className?: string
  /** CSS object-position. Defaults to the focal point recorded in the image manifest. */
  position?: string
  eager?: boolean
  fit?: 'cover' | 'contain'
  /** Decorative images carry no accessible name (a caption beside them says it all). */
  decorative?: boolean
}) {
  // If the photo URL fails (blocked host, expired token, offline), show the illustration, not an empty frame.
  const [failed, setFailed] = useState(false)
  if (image.isPhoto && !failed) {
    return (
      <img
        src={image.src}
        alt={decorative ? '' : image.alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`h-full w-full ${className}`}
        style={{ objectFit: fit, objectPosition: position ?? image.focal }}
      />
    )
  }
  return (
    <ConceptualLandscape
      seed={seed}
      className={`h-full w-full ${className}`}
      label={`Illustration standing in for a photograph: ${image.title}`}
      decorative={decorative}
    />
  )
}
