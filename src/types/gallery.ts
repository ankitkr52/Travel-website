export type GalleryCategory =
  | 'destinations'
  | 'hotels'
  | 'food'
  | 'culture'
  | 'adventure'
  | 'wildlife'

export interface GalleryImage {
  id: string
  url: string
  caption: string
  category: GalleryCategory
  destinationId?: string
}
