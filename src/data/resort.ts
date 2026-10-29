// Verified resort data. Only publish what a source confirms, and say which source.
//
// Sources checked on 2026-10-26:
//   [VH]  Visit Hatta listing        https://www.visithatta.com/en/stay/mughaibar-fort
//   [BK]  Booking.com listing         https://www.booking.com/hotel/ae/fort-mughaibar-resort.html  (summarised in hotel-assets/)
//   [OFF] Official website            https://mughaibarfortresort.com/  (could not be fetched from the build sandbox;
//                                      contact details below come from the project research notes)
// Anything not in a source is listed under UNCONFIRMED so the site can ask the resort instead of guessing.

export const SOURCES = {
  visitHatta: 'https://www.visithatta.com/en/stay/mughaibar-fort',
  booking: 'https://www.booking.com/hotel/ae/fort-mughaibar-resort.html',
  official: 'https://mughaibarfortresort.com/',
} as const

export const RESORT = {
  name: 'Mughaibar Fort Resort',
  tagline: 'A stone fort in the Hatta valleys',
  shortDescription:
    'A traditional stone house tucked away in the Hatta valleys of Dubai, in the Hajar Mountains.',
  location: {
    area: 'Hatta, Sufayri',
    city: 'Dubai',
    country: 'United Arab Emirates',
    nearbyLandmark: 'Near Hatta Wadi Hub',
    // [VH] "A traditional stone house is a tucked away resort in the Hatta valleys … embedded within farm lands"
    setting: 'Tucked away in the Hatta valleys, among farm land.',
    // Google Maps documented URL formats (https://developers.google.com/maps/documentation/urls)
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Mughaibar+Fort+Resort+Hatta+Dubai',
    directionsLink: 'https://www.google.com/maps/dir/?api=1&destination=Mughaibar+Fort+Resort+Hatta+Dubai',
    // Waze documented deep link (https://developers.google.com/waze/deeplinks)
    wazeLink: 'https://waze.com/ul?q=Mughaibar%20Fort%20Resort%20Hatta&navigate=yes',
    directionsNote:
      'Hatta is reached from Dubai on the E44 (Dubai–Hatta Road). Check the route and journey time in a maps app before you set out.',
  },
  contact: {
    // NEEDS CONFIRMATION: Visit Hatta [VH] links a different number for this property (+971 56 465 5504).
    // The number below came from the project research notes ("published on its official contact page").
    phone: '+971 56 149 7419',
    phoneHref: 'tel:+971561497419',
    email: 'mughaibarfortresort@gmail.com',
    emailHref: 'mailto:mughaibarfortresort@gmail.com',
    // WhatsApp uses the same number. Not verified as a WhatsApp account. Confirm with the owner.
    whatsappHref: 'https://wa.me/971561497419',
    officialWebsite: SOURCES.official,
    officialContact: 'https://mughaibarfortresort.com/contact/',
  },
  // Amenities named by [VH] ("Your stay in Mughaibar Fort comes with…"); [BK] agrees on the main ones.
  amenities: [
    { id: 'pool', label: 'Swimming pool', icon: 'Waves', detail: 'Access and opening arrangements to be confirmed with the resort.' },
    { id: 'bbq', label: 'BBQ area', icon: 'Flame', detail: 'For cooking and eating outdoors.' },
    { id: 'terrace', label: 'Terrace and outdoor seating', icon: 'Sun', detail: 'An outdoor seating area.' },
    { id: 'walkways', label: 'Shaded walkways', icon: 'Trees', detail: 'Shaded paths around the property.' },
    { id: 'majlis', label: 'Majlis', icon: 'Sofa', detail: 'A traditional Arabic sitting room.' },
    { id: 'wifi', label: 'Wi-Fi', icon: 'Wifi', detail: 'Coverage and speed not stated by the listing.' },
    { id: 'tv', label: 'TV system', icon: 'Tv', detail: 'Listed by Visit Hatta. Location within the property not stated.' },
  ],
  accommodation: {
    // [VH] "3 large bedrooms". Nothing else about rooms is published in the sources we could read.
    bedroomCount: 3,
    headline: 'Three large bedrooms',
    description:
      'Visit Hatta lists the fort with three large bedrooms in a traditional stone house. The sources do not describe the rooms one by one.',
  },
  // Things a guest will ask that NO source answers. The site presents these as questions for the resort.
  unconfirmed: [
    'Guest capacity and bed arrangements in each bedroom',
    'Bathrooms',
    'Rates, minimum stay and what is included',
    'Whether the whole property is let to one group at a time',
    'Pool access, size and opening arrangements',
    'Check-in and check-out times',
    'Policies on children, pets and events',
    'Meals and catering',
  ],
  // [VH] "All booking and queries are made between the guests and owners directly."
  bookingNote:
    'Visit Hatta notes that bookings and questions for its farm stays are handled directly between guests and owners. Availability, capacity and rates come from the resort.',
  demoDisclaimer:
    'This is an independent redesign concept. Mughaibar Fort Resort has an official website at mughaibarfortresort.com. This concept is not commissioned or endorsed by the property.',
} as const

/** What the resort itself has, in the order it is presented on the site. Every entry traces to [VH]. */
export const RESORT_FACILITIES = [
  {
    id: 'pool',
    title: 'Swimming pool',
    summary: 'Listed by Visit Hatta among what the stay comes with.',
    detail: 'Ask the resort about access, size and opening arrangements.',
    imageId: null, // no photograph of the pool exists in the project. See docs/photography-brief.md
  },
  {
    id: 'terrace',
    title: 'Terrace and outdoor seating',
    summary: 'An outdoor seating area, with shaded walkways around the property.',
    detail: 'Listing photographs show seating outside; none has a verified licence yet.',
    imageId: 'terrace-seating',
  },
  {
    id: 'bbq',
    title: 'BBQ area',
    summary: 'A BBQ area for cooking and eating outdoors.',
    detail: 'Ask the resort what is provided and what guests bring.',
    imageId: 'outdoor-terrace',
  },
  {
    id: 'majlis',
    title: 'Majlis',
    summary: 'A traditional majlis, the Arabic sitting room.',
    detail: 'No photograph of the majlis exists in the project yet.',
    imageId: null,
  },
] as const

/** Places in Hatta that are NOT run by the resort. Each line says what the cited page supports. */
export const NEARBY_ATTRACTIONS = [
  {
    name: 'Hatta Wadi Hub',
    description:
      'An adventure park. Guides list mountain biking, a twin zipline, kayaking, archery and axe throwing among its activities. It is the nearest landmark to the fort.',
    source: 'Bayut guide',
    sourceUrl: 'https://www.bayut.com/mybayut/hatta-wadi-hub-guide',
  },
  {
    name: 'Hatta Heritage Village',
    description:
      'A reconstruction of a traditional mountain village in the Hajar Mountains, opened to the public in 2001. Its 30 buildings include houses and a mosque.',
    source: 'Wikipedia',
    sourceUrl: 'https://en.wikipedia.org/wiki/Hatta_Heritage_Village',
  },
  {
    name: 'Hatta Dam and lake',
    description:
      'A reservoir in the Hajar Mountains near Hatta. Kayaking in Hatta is a listed activity. Check current access with the operator.',
    source: 'Bayut guide',
    sourceUrl: 'https://www.bayut.com/mybayut/hatta-wadi-hub-guide',
  },
  {
    name: 'Hatta hiking trails',
    description:
      'The Hatta Hiking Track is listed among the activities in the area. Check conditions and difficulty locally before you set out.',
    source: 'Bayut guide',
    sourceUrl: 'https://www.bayut.com/mybayut/hatta-wadi-hub-guide',
  },
] as const

export type Attraction = (typeof NEARBY_ATTRACTIONS)[number]
