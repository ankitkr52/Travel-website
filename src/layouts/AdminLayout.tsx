import { useState, type ReactNode } from 'react'
import { Menu } from 'lucide-react'
import { NavDrawer, ThemeToggle } from '@/components/layout'
import { Sidebar } from '@/components/layout/sidebar'
import { SidebarNav } from '@/components/layout/sidebar-nav'

export function AdminLayout({ children }: { children: ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-dvh bg-background">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-surface px-4 md:px-8">
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="flex size-9 items-center justify-center rounded text-text-primary hover:bg-border/40 md:hidden"
          >
            <Menu className="size-5" />
          </button>
          <span className="text-sm font-medium text-text-secondary md:hidden">
            Travelnest Admin
          </span>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>

      <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Travelnest Admin">
        <SidebarNav onNavigate={() => setDrawerOpen(false)} />
      </NavDrawer>
    </div>
  )
}
