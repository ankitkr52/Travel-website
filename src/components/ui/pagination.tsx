import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface PaginationProps {
  totalPages: number
  current: number
  onChange: (page: number) => void
}

function pageList(totalPages: number, current: number): (number | 'ellipsis')[] {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

  const pages = new Set([1, totalPages, current, current - 1, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)

  const result: (number | 'ellipsis')[] = []
  sorted.forEach((page, i) => {
    if (i > 0 && page - (sorted[i - 1] as number) > 1) result.push('ellipsis')
    result.push(page)
  })
  return result
}

export function Pagination({ totalPages, current, onChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1">
      <button
        type="button"
        aria-label="Previous page"
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="flex size-9 items-center justify-center rounded text-text-primary hover:bg-border/40 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="size-4" />
      </button>

      {pageList(totalPages, current).map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`ellipsis-${i}`} className="px-2 text-text-muted">
            …
          </span>
        ) : (
          <button
            key={page}
            type="button"
            aria-current={page === current ? 'page' : undefined}
            onClick={() => onChange(page)}
            className={cn(
              'flex size-9 items-center justify-center rounded text-sm font-medium',
              page === current
                ? 'bg-primary text-on-primary'
                : 'text-text-primary hover:bg-border/40',
            )}
          >
            {page}
          </button>
        ),
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={current === totalPages}
        onClick={() => onChange(current + 1)}
        className="flex size-9 items-center justify-center rounded text-text-primary hover:bg-border/40 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="size-4" />
      </button>
    </nav>
  )
}
