import { useId } from 'react'
import { cn } from '@/lib/utils'

export interface DatePickerProps {
  label?: string
  error?: string
  value?: string
  onChange?: (value: string) => void
  minDate?: string
  maxDate?: string
  disabled?: boolean
}

/**
 * Wraps the native `<input type="date">` rather than a custom calendar widget —
 * gives correct keyboard/a11y/locale behavior for free (no calendar-grid dependency
 * is in the approved stack yet). Revisit with a real calendar UI if Hotels/Flights
 * booking needs range-picking.
 */
export function DatePicker({
  label,
  error,
  value,
  onChange,
  minDate,
  maxDate,
  disabled,
}: DatePickerProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <input
        id={id}
        type="date"
        value={value}
        min={minDate}
        max={maxDate}
        disabled={disabled}
        aria-invalid={!!error}
        onChange={(e) => onChange?.(e.target.value)}
        className={cn(
          'h-11 w-full rounded border border-border bg-surface px-3 text-sm text-text-primary outline-none',
          'focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-error focus-visible:ring-error',
        )}
      />
      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}
