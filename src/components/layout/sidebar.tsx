import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SidebarNav } from './sidebar-nav'

/** Desktop/tablet chrome only — mobile renders SidebarNav inside a NavDrawer from AdminLayout. */
export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-screen shrink-0 flex-col border-r border-border bg-surface p-4 md:flex',
        collapsed ? 'w-16' : 'w-64',
      )}
    >
      <div className={cn('mb-4 text-lg font-semibold text-text-primary', collapsed && 'sr-only')}>
        Travelnest Admin
      </div>
      <SidebarNav collapsed={collapsed} />
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="mt-4 flex items-center justify-center rounded border border-border py-2 text-text-secondary hover:bg-border/40"
      >
        <ChevronLeft className={cn('size-4 transition-transform', collapsed && 'rotate-180')} />
      </button>
    </aside>
  )
}
