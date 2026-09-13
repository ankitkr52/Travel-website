import { useQuery } from '@tanstack/react-query'
import { galleryService } from '@/services/galleryService'
import type { GalleryImage } from '@/types/gallery'

export function useGallery(category?: GalleryImage['category']) {
  return useQuery({
    queryKey: ['gallery', category],
    queryFn: () => (category ? galleryService.getByCategory(category) : galleryService.getAll()),
  })
}
