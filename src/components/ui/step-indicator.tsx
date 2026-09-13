import { Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface StepIndicatorProps {
  steps: string[]
  currentStep: number
  completed?: number[]
}

export function StepIndicator({ steps, currentStep, completed = [] }: StepIndicatorProps) {
  return (
    <ol className="flex w-full items-center">
      {steps.map((step, index) => {
        const isCompleted = completed.includes(index) || index < currentStep
        const isCurrent = index === currentStep
        const isLast = index === steps.length - 1

        return (
          <li key={step} className={cn('flex items-center', !isLast && 'flex-1')}>
            <div className="flex flex-col items-center gap-1.5">
              <div
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-medium',
                  isCompleted && 'border-primary bg-primary text-on-primary',
                  isCurrent && !isCompleted && 'border-primary text-primary',
                  !isCompleted && !isCurrent && 'border-border text-text-muted',
                )}
              >
                {isCompleted ? <Check className="size-4" /> : index + 1}
              </div>
              <span
                className={cn(
                  'text-xs whitespace-nowrap',
                  isCurrent ? 'font-medium text-text-primary' : 'text-text-muted',
                )}
              >
                {step}
              </span>
            </div>
            {!isLast && (
              <div className="mx-2 h-0.5 flex-1 bg-border">
                <motion.div
                  className="h-full bg-primary"
                  initial={false}
                  animate={{ width: isCompleted ? '100%' : '0%' }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}
