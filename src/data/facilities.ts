import { RESORT_FACILITIES } from '@/data/resort'
import { byId, placeholderImage, type ResortImage } from '@/data/images'

export interface FacilityItem {
  id: string
  title: string
  summary: string
  detail: string
  image: ResortImage
}

/** Facilities with the image to show for each. No photograph of the pool or majlis exists yet, so those are illustrations. */
export const FACILITY_ITEMS: FacilityItem[] = RESORT_FACILITIES.map((f) => ({
  id: f.id,
  title: f.title,
  summary: f.summary,
  detail: f.detail,
  image: f.imageId ? byId(f.imageId) : placeholderImage(f.id, f.title),
}))
