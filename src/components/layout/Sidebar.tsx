import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Building2,
  ClipboardList,
  ChevronLeft,
  LayoutDashboard,
  MapPin,
  Package,
  Star,
  Users,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const ADMIN_NAV = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Bookings', href: '/admin/bookings', icon: ClipboardList },
  { label: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { label: 'Packages', href: '/admin/packages', icon: Package },
  { label: 'Hotels', href: '/admin/hotels', icon: Building2 },
  { label: 'Reviews', href: '/admin/reviews', icon: Star },
]

export function SidebarNav({
  collapsed,
  onNavigate,
}: {
  collapsed?: boolean
  onNavigate?: () => void
}) {
  return (
    <nav aria-label="Admin" className="flex flex-1 flex-col gap-1">
      {ADMIN_NAV.map(({ label, href, icon: Icon }) => (
        <NavLink
          key={href}
          to={href}
          end={href === '/admin'}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 rounded px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-border/40',
              isActive && 'bg-primary/10 text-primary',
            )
          }
        >
          <Icon className="size-5 shrink-0" aria-hidden />
          {!collapsed && label}
        </NavLink>
      ))}
    </nav>
  )
}

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
