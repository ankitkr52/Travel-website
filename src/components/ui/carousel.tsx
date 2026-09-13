import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CarouselProps {
  items: ReactNode[]
  autoPlay?: boolean
  dots?: boolean
  arrows?: boolean
  interval?: number
}

export function Carousel({
  items,
  autoPlay,
  dots = true,
  arrows = true,
  interval = 4000,
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const slideRefs = useRef<(HTMLDivElement | null)[]>([])
  const [active, setActive] = useState(0)

  const scrollToIndex = (index: number) => {
    slideRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
      block: 'nearest',
    })
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActive(slideRefs.current.indexOf(visible.target as HTMLDivElement))
      },
      { root: track, threshold: 0.6 },
    )
    slideRefs.current.forEach((slide) => slide && observer.observe(slide))
    return () => observer.disconnect()
  }, [items.length])

  useEffect(() => {
    if (!autoPlay) return
    const id = setInterval(() => scrollToIndex((active + 1) % items.length), interval)
    return () => clearInterval(id)
  }, [autoPlay, active, items.length, interval])

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth [scrollbar-width:none]"
      >
        {items.map((item, index) => (
          <div
            key={index}
            ref={(el) => {
              slideRefs.current[index] = el
            }}
            className="w-full shrink-0 snap-start"
          >
            {item}
          </div>
        ))}
      </div>

      {arrows && items.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => scrollToIndex((active - 1 + items.length) % items.length)}
            className="absolute top-1/2 left-2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-surface text-text-primary shadow-md hover:bg-border/40"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => scrollToIndex((active + 1) % items.length)}
            className="absolute top-1/2 right-2 -translate-y-1/2 flex size-9 items-center justify-center rounded-full bg-surface text-text-primary shadow-md hover:bg-border/40"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      )}

      {dots && items.length > 1 && (
        <div className="mt-3 flex justify-center gap-1.5">
          {items.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              onClick={() => scrollToIndex(index)}
              className={cn(
                'h-1.5 rounded-full transition-all',
                index === active ? 'w-5 bg-primary' : 'w-1.5 bg-border',
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
