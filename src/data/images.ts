
// Property photography manifest.
//
// IMAGE POLICY
// 1. Licensed local images are used in development and production.
// 2. Unverified remote images are shown only in development,
//    with an explicit preview-only status.
// 3. Production builds use an illustration when no licensed local
//    photograph is available.
// 4. Never mark an image as licensed unless you have verified
//    permission to use it.
//
// To add an approved photograph:
//   - Place the file in public/images/
//   - Set localSrc to its public URL, e.g. '/images/courtyard.webp'
//   - Set licence: 'licensed' only after verifying usage rights.
//
// Optional private staging override:
//   VITE_ALLOW_UNLICENSED_IMAGES=true
//
// Source documentation:
//   hotel-assets/IMAGE_SOURCES_AND_USAGE.md
//   docs/photography-brief.md

export type LicenceStatus = 'unverified' | 'licensed'

export type ImageCategory =
  | 'exterior'
  | 'interior'
  | 'dining'
  | 'amenity'

export interface ResortImage {
  id: string
  src: string
  alt: string
  title: string
  category: ImageCategory
  source: string
  sourceUrl: string
  width?: number
  height?: number
  focal: string
  licence: LicenceStatus
  isPhoto: boolean
  isPreviewOnly: boolean
}

interface RawImage
  extends Omit<
    ResortImage,
    'src' | 'licence' | 'isPhoto' | 'isPreviewOnly' | 'focal'
  > {
  previewSrc: string
  localSrc?: string
  licence?: LicenceStatus
  focal?: string
}

const allowRemote =
  import.meta.env.DEV ||
  import.meta.env.VITE_ALLOW_UNLICENSED_IMAGES === 'true'

/**
 * Neutral landscape illustration used when an approved photograph
 * is not available.
 */
const PLATE =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#E8DCC4"/>
          <stop offset="100%" stop-color="#C9B792"/>
        </linearGradient>
      </defs>

      <rect width="1200" height="900" fill="url(#sky)"/>

      <circle cx="900" cy="170" r="76" fill="#F6E9C9"/>

      <path
        d="M0 500 L150 400 L270 470 L420 340
           L590 450 L760 350 L950 460 L1200 380
           L1200 900 L0 900Z"
        fill="#C2B18F"
      />

      <path
        d="M0 630 L180 520 L340 610 L520 480
           L700 600 L900 500 L1050 570 L1200 520
           L1200 900 L0 900Z"
        fill="#98886F"
      />

      <path
        d="M0 760 L220 670 L420 730 L650 640
           L860 730 L1050 670 L1200 720
           L1200 900 L0 900Z"
        fill="#70604D"
      />

      <path
        d="M0 820 L300 760 L520 800 L780 750
           L1000 810 L1200 770 L1200 900 L0 900Z"
        fill="#44372D"
      />
    </svg>
  `)

/**
 * Resolves an image without bypassing the licensing policy.
 *
 * Priority:
 * 1. Verified licensed local photograph.
 * 2. Remote preview in development/private staging.
 * 3. Local SVG illustration.
 */
function resolve(raw: RawImage): ResortImage {
  const {
    previewSrc,
    localSrc,
    licence,
    focal,
    ...rest
  } = raw

  const base = {
    ...rest,
    focal: focal ?? '50% 50%',
  }

  // A local photograph is considered licensed only when explicitly
  // marked licensed. Do not assume every local file has permission.
  if (localSrc && licence === 'licensed') {
    return {
      ...base,
      src: localSrc,
      licence: 'licensed',
      isPhoto: true,
      isPreviewOnly: false,
    }
  }

  // Unverified remote photographs are allowed only in development
  // or when the private staging override is explicitly enabled.
  if (allowRemote && previewSrc) {
    return {
      ...base,
      src: previewSrc,
      licence: 'unverified',
      isPhoto: true,
      isPreviewOnly: true,
    }
  }

  // Safe production fallback.
  return {
    ...base,
    src: PLATE,
    licence: 'unverified',
    isPhoto: false,
    isPreviewOnly: false,
  }
}

const RAW: RawImage[] = [
  {
    id: 'courtyard-seating',
    title: 'Courtyard seating',
    previewSrc:
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/525758372.jpg?k=d0791057c7807b28e0a9d10b8f4923a10b4b70d9fa4f6742bd972f8ee78a8c57&o=',
    // Add after obtaining permission to use the photograph:
    // localSrc: '/images/courtyard-seating.webp',
    // licence: 'licensed',
    alt: 'Tranquil stone courtyard with traditional seating arrangements',
    category: 'exterior',
    source: 'Booking.com',
    sourceUrl:
      'https://www.booking.com/hotel/ae/fort-mughaibar-resort.html',
    width: 1024,
    height: 768,
  },
  {
    id: 'dining-room',
    title: 'Dining room',
    previewSrc:
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/817427277.jpg?k=8c45a3bbe5a2063dcbc7989a1a735e77e9184149787c617d2436af9d6dabb49e&o=',
    // localSrc: '/images/dining-room.webp',
    // licence: 'licensed',
    alt: 'Bamboo and stone dining room with traditional furnishings',
    category: 'dining',
    source: 'Booking.com',
    sourceUrl:
      'https://www.booking.com/hotel/ae/fort-mughaibar-resort.html',
    width: 1024,
    height: 768,
  },
  {
    id: 'kitchen',
    title: 'Stone-arched kitchen',
    previewSrc:
      'https://cf.bstatic.com/xdata/images/hotel/max1024x768/511153231.jpg?k=17b1ee87df3db1847ed1625621c59710b51e9c411ccb3a941489da6b0143534b&o=',
    // localSrc: '/images/kitchen.webp',
    // licence: 'licensed',
    alt: 'Rustic stone-arched kitchen interior',
    category: 'interior',
    source: 'Booking.com',
    sourceUrl:
      'https://www.booking.com/hotel/ae/fort-mughaibar-resort.html',
    width: 1024,
    height: 768,
  },
  {
    id: 'terrace-seating',
    title: 'Terrace seating',
    previewSrc:
      'https://www.wondergifts.ae/cdn/shop/files/5_bbfe03ec-62cd-47ab-8ebd-8782e3600999_700x.jpg?v=1752040428',
    // localSrc: '/images/terrace-seating.webp',
    // licence: 'licensed',
    alt: 'Fort Mughaibar outdoor terrace with comfortable seating',
    category: 'amenity',
    source: 'Wondergifts UAE',
    sourceUrl:
      'https://www.wondergifts.ae/products/exquisite-1-night-stay-with-breakfast-for-two-at-fort-mughaibar',
    width: 700,
    height: 700,
  },
  {
    id: 'evening-retreat',
    title: 'Evening at the fort',
    previewSrc:
      'https://www.wondergifts.ae/cdn/shop/files/s_700x.jpg?v=1752040428',
    // localSrc: '/images/evening-retreat.webp',
    // licence: 'licensed',
    alt: 'Fort Mughaibar in the evening',
    category: 'exterior',
    source: 'Wondergifts UAE',
    sourceUrl:
      'https://www.wondergifts.ae/products/exquisite-1-night-stay-with-breakfast-for-two-at-fort-mughaibar',
    width: 700,
    height: 700,
  },
  {
    id: 'outdoor-terrace',
    title: 'Outdoor terrace',
    previewSrc:
      'https://www.wondergifts.ae/cdn/shop/files/4_80c4564d-47e5-4639-a89c-650a3dbaac14_700x.jpg?v=1752040428',
    // localSrc: '/images/outdoor-terrace.webp',
    // licence: 'licensed',
    alt: 'Fort Mughaibar outdoor terrace',
    category: 'amenity',
    source: 'Wondergifts UAE',
    sourceUrl:
      'https://www.wondergifts.ae/products/exquisite-1-night-stay-with-breakfast-for-two-at-fort-mughaibar',
    width: 700,
    height: 700,
  },
  {
    id: 'room-interior',
    title: 'Bedroom',
    previewSrc: 'https://zen.wego.com/hotelz/s/106280993/1341057403.jpeg',
    // localSrc: '/images/room-interior.webp',
    // licence: 'licensed',
    alt: 'Rustic hotel room interior with traditional stone walls',
    category: 'interior',
    source: 'Wego',
    sourceUrl:
      'https://www.wego.ae/en/hotels/united-arab-emirates/hatta/mughaibar-fort-resort-3093507',
    width: 800,
    height: 600,
  },
]

export const RESORT_IMAGES: ResortImage[] = RAW.map(resolve)

export const byId = (id: string): ResortImage =>
  RESORT_IMAGES.find((image) => image.id === id) ??
  RESORT_IMAGES[0]

/**
 * Image counts used by the gallery and diagnostic UI.
 */
export const PHOTO_STATUS = {
  total: RESORT_IMAGES.length,

  licensed: RESORT_IMAGES.filter(
    (image) => image.isPhoto && image.licence === 'licensed',
  ).length,

  previewOnly: RESORT_IMAGES.filter(
    (image) => image.isPreviewOnly,
  ).length,

  illustrations: RESORT_IMAGES.filter(
    (image) => !image.isPhoto,
  ).length,
}

export const CATEGORY_LABELS: Record<ImageCategory, string> = {
  exterior: 'Outside',
  interior: 'Inside',
  dining: 'Dining',
  amenity: 'Terrace & leisure',
}

/**
 * Creates an illustration for a location or facility without
 * an available approved photograph.
 */
export function placeholderImage(
  id: string,
  title: string,
  category: ImageCategory = 'amenity',
): ResortImage {
  return {
    id,
    src: PLATE,
    alt: title,
    title,
    category,
    source: 'None',
    sourceUrl: '',
    focal: '50% 50%',
    licence: 'unverified',
    isPhoto: false,
    isPreviewOnly: false,
  }
}
