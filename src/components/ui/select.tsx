import { useId, useMemo, useState } from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  options: SelectOption[]
  value?: string
  onChange?: (value: string) => void
  label?: string
  error?: string
  searchable?: boolean
  placeholder?: string
  disabled?: boolean
}

export function Select({
  options,
  value,
  onChange,
  label,
  error,
  searchable,
  placeholder = 'Select...',
  disabled,
}: SelectProps) {
  const id = useId()
  const [search, setSearch] = useState('')

  const filtered = useMemo(
    () =>
      searchable
        ? options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()))
        : options,
    [options, search, searchable],
  )

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
      )}
      <SelectPrimitive.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        onOpenChange={(open) => !open && setSearch('')}
      >
        <SelectPrimitive.Trigger
          id={id}
          aria-invalid={!!error}
          className={cn(
            'flex h-11 w-full items-center justify-between gap-2 rounded border border-border bg-surface px-3',
            'text-sm text-text-primary outline-none data-[placeholder]:text-text-muted',
            'focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-error focus-visible:ring-error',
          )}
        >
          <SelectPrimitive.Value placeholder={placeholder} />
          <SelectPrimitive.Icon>
            <ChevronDown className="size-4 text-text-muted" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className="z-50 overflow-hidden rounded border border-border bg-surface shadow-lg"
            position="popper"
            sideOffset={4}
          >
            {searchable && (
              <div className="border-b border-border p-2">
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search..."
                  className="w-full rounded border border-border px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            )}
            <SelectPrimitive.Viewport className="max-h-64 p-1">
              {filtered.length === 0 && (
                <p className="px-2 py-3 text-center text-sm text-text-muted">No results</p>
              )}
              {filtered.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex h-9 cursor-pointer items-center rounded px-3 pr-8 text-sm text-text-primary outline-none data-[highlighted]:bg-border/40"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2 inline-flex items-center">
                    <Check className="size-4 text-primary" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  )
}
