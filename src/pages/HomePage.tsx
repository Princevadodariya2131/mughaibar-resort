import PageTransition from '@/components/ui/PageTransition'
import { usePageMeta } from '@/hooks/usePageMeta'
import CinematicHero from '@/components/sections/CinematicHero'
import Arrival from '@/components/sections/Arrival'
import StayPreview from '@/components/sections/StayPreview'
import ExperiencesPreview from '@/components/sections/ExperiencesPreview'
import LandscapeScene3D from '@/components/sections/LandscapeScene3D'
import GalleryPreview from '@/components/sections/GalleryPreview'
import LocationBrief from '@/components/sections/LocationBrief'
import Nearby from '@/components/sections/Nearby'
import EnquiryCTA from '@/components/sections/EnquiryCTA'

/**
 * Sequence: hero (ivory) → arrival (ivory) → stay (charcoal) → experiences (deep ivory) →
 * landscape (sand) → gallery (charcoal) → location (ivory) → nearby (charcoal) → enquiry (sand).
 * Grounds alternate and no two neighbouring sections share a layout.
 */
export default function HomePage() {
  usePageMeta('', 'A traditional stone house in the Hatta valleys, Dubai: three large bedrooms, a pool, BBQ area, terrace and majlis. An independent redesign concept.')
  return (
    <PageTransition>
      <CinematicHero />
      <Arrival />
      <StayPreview />
      <ExperiencesPreview />
      <LandscapeScene3D />
      <GalleryPreview />
      <LocationBrief />
      <Nearby />
      <EnquiryCTA tone="light" />
    </PageTransition>
  )
}
