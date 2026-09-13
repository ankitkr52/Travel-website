import { Modal } from './modal'

export interface LightboxImage {
  src: string
  alt: string
}

export interface LightboxProps {
  images: LightboxImage[]
  currentIndex: number
  onClose: () => void
}

/**
 * Minimal shell for Phase 2 — shows the current image in a modal. Keyboard/swipe
 * navigation and captions are built out in the Gallery phase (docs/features/GALLERY.md).
 */
export function Lightbox({ images, currentIndex, onClose }: LightboxProps) {
  const image = images[currentIndex]
  if (!image) return null

  return (
    <Modal isOpen={!!image} onClose={onClose} size="lg">
      <img src={image.src} alt={image.alt} className="max-h-[80vh] w-full rounded object-contain" />
    </Modal>
  )
}
