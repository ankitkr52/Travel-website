import type { ReactNode } from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface AccordionItemData {
  value: string
  title: string
  content: ReactNode
}

export interface AccordionProps {
  items: AccordionItemData[]
  allowMultiple?: boolean
}

export function Accordion({ items, allowMultiple }: AccordionProps) {
  const rootProps = allowMultiple
    ? { type: 'multiple' as const }
    : { type: 'single' as const, collapsible: true }

  return (
    <AccordionPrimitive.Root
      {...rootProps}
      className="divide-y divide-border border-y border-border"
    >
      {items.map((item) => (
        <AccordionPrimitive.Item key={item.value} value={item.value}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
              className={cn(
                'group flex w-full items-center justify-between py-4 text-left text-sm font-medium text-text-primary',
                'outline-none focus-visible:ring-2 focus-visible:ring-primary',
              )}
            >
              {item.title}
              <ChevronDown className="size-4 shrink-0 text-text-muted transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden text-sm text-text-secondary data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
            <div className="pb-4">{item.content}</div>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  )
}
