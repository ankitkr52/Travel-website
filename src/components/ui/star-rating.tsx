import { useState } from 'react'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface StarRatingProps {
  value: number
  onChange?: (value: number) => void
  readOnly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

export function StarRating({ value, onChange, readOnly, size = 'md' }: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null)
  const displayValue = hovered ?? value

  return (
    <div
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`Rating: ${value} out of 5 stars`}
      className="inline-flex gap-0.5"
      onMouseLeave={() => setHovered(null)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          role={readOnly ? undefined : 'radio'}
          aria-checked={!readOnly && value === star}
          aria-label={`${star} star${star > 1 ? 's' : ''}`}
          onMouseEnter={() => !readOnly && setHovered(star)}
          onClick={() => !readOnly && onChange?.(star)}
          className={cn(
            'transition-colors',
            readOnly
              ? 'cursor-default'
              : 'cursor-pointer focus-visible:ring-2 focus-visible:ring-primary rounded',
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= displayValue ? 'fill-warning text-warning' : 'fill-none text-border',
            )}
          />
        </button>
      ))}
    </div>
  )
}
