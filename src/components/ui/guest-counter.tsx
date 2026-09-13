import { Minus, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface GuestCounterValue {
  adults: number
  children: number
}

export interface GuestCounterProps {
  adults: number
  children: number
  onChange: (value: GuestCounterValue) => void
  minAdults?: number
  maxAdults?: number
  maxChildren?: number
}

function CounterRow({
  label,
  value,
  onDecrement,
  onIncrement,
  canDecrement,
  canIncrement,
}: {
  label: string
  value: number
  onDecrement: () => void
  onIncrement: () => void
  canDecrement: boolean
  canIncrement: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm text-text-primary">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={!canDecrement}
          aria-label={`Decrease ${label}`}
          className={cn(
            'flex size-9 items-center justify-center rounded border border-border text-text-primary',
            'hover:bg-border/40 disabled:pointer-events-none disabled:opacity-40',
          )}
        >
          <Minus className="size-4" />
        </button>
        <span className="w-4 text-center text-sm font-medium text-text-primary">{value}</span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={!canIncrement}
          aria-label={`Increase ${label}`}
          className={cn(
            'flex size-9 items-center justify-center rounded border border-border text-text-primary',
            'hover:bg-border/40 disabled:pointer-events-none disabled:opacity-40',
          )}
        >
          <Plus className="size-4" />
        </button>
      </div>
    </div>
  )
}

export function GuestCounter({
  adults,
  children,
  onChange,
  minAdults = 1,
  maxAdults = 10,
  maxChildren = 10,
}: GuestCounterProps) {
  return (
    <div className="divide-y divide-border rounded border border-border bg-surface px-3">
      <CounterRow
        label="Adults"
        value={adults}
        canDecrement={adults > minAdults}
        canIncrement={adults < maxAdults}
        onDecrement={() => onChange({ adults: adults - 1, children })}
        onIncrement={() => onChange({ adults: adults + 1, children })}
      />
      <CounterRow
        label="Children"
        value={children}
        canDecrement={children > 0}
        canIncrement={children < maxChildren}
        onDecrement={() => onChange({ adults, children: children - 1 })}
        onIncrement={() => onChange({ adults, children: children + 1 })}
      />
    </div>
  )
}
