import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded px-2 py-0.5 text-xs font-medium', {
  variants: {
    variant: {
      default: 'bg-border/60 text-text-primary',
      primary: 'bg-primary/10 text-primary',
      success: 'bg-success/10 text-success',
      error: 'bg-error/10 text-error',
      warning: 'bg-warning/10 text-warning',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  text: string
  className?: string
}

export function Badge({ text, variant, className }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))}>{text}</span>
}
