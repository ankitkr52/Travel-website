import { cn } from '@/lib/utils'

export interface SkeletonProps {
  width?: string | number
  height?: string | number
  variant?: 'text' | 'circle' | 'rect'
  className?: string
}

export function Skeleton({ width, height, variant = 'rect', className }: SkeletonProps) {
  return (
    <div
      aria-hidden
      style={{ width, height }}
      className={cn(
        'relative overflow-hidden bg-border/60',
        variant === 'circle' ? 'rounded-full' : 'rounded',
        variant === 'text' && 'h-4 w-full',
        className,
      )}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-surface/40 to-transparent motion-safe:[animation:shimmer_1.5s_infinite]" />
    </div>
  )
}
