import * as TabsPrimitive from '@radix-ui/react-tabs'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export interface TabItem {
  value: string
  label: string
  content: React.ReactNode
}

export interface TabsProps {
  items: TabItem[]
  activeTab: string
  onChange: (value: string) => void
}

export function Tabs({ items, activeTab, onChange }: TabsProps) {
  return (
    <TabsPrimitive.Root value={activeTab} onValueChange={onChange}>
      <TabsPrimitive.List className="relative flex gap-1 border-b border-border">
        {items.map((item) => (
          <TabsPrimitive.Trigger
            key={item.value}
            value={item.value}
            className={cn(
              'relative px-4 py-2.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary',
              item.value === activeTab ? 'text-primary' : 'text-text-muted hover:text-text-primary',
            )}
          >
            {item.label}
            {item.value === activeTab && (
              <motion.div
                layoutId="tabs-active-indicator"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-primary"
                transition={{ duration: 0.25 }}
              />
            )}
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>
      {items.map((item) => (
        <TabsPrimitive.Content key={item.value} value={item.value}>
          {item.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  )
}
