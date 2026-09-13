import galleryData from '@/data/gallery.json'
import type { GalleryImage } from '@/types/gallery'

const images = galleryData as unknown as GalleryImage[]

export const galleryService = {
  getAll: (): GalleryImage[] => images,

  getByCategory: (category: GalleryImage['category']): GalleryImage[] =>
    images.filter((img) => img.category === category),
}
