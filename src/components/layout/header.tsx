import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui'
import { ThemeToggle } from './theme-toggle'
import { NavDrawer } from './nav-drawer'

const NAV_LINKS = [
  { label: 'Destinations', href: '/destinations' },
  { label: 'Packages', href: '/packages' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'Flights', href: '/flights' },
  { label: 'Itinerary', href: '/itinerary' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { scrollY } = useScroll()
  const backgroundOpacity = useTransform(scrollY, [0, 80], [0, 1])

  return (
    <header className="sticky top-0 z-40 h-16 md:h-20">
      <motion.div
        aria-hidden
        className="absolute inset-0 border-b border-border bg-surface/95 backdrop-blur-md"
        style={{ opacity: backgroundOpacity }}
      />
      <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/" className="text-lg font-semibold text-text-primary">
          Travelnest
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  'relative text-sm font-medium text-text-secondary transition-colors hover:text-text-primary',
                  isActive && 'text-text-primary',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link to="/login" className={buttonVariants({ size: 'sm' })}>
            Login
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
            className="flex size-9 items-center justify-center rounded text-text-primary hover:bg-border/40"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      <NavDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} title="Menu">
        <nav aria-label="Mobile" className="flex flex-1 flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              onClick={() => setDrawerOpen(false)}
              className={({ isActive }) =>
                cn(
                  'rounded px-3 py-2.5 text-sm font-medium text-text-secondary hover:bg-border/40',
                  isActive && 'bg-border/40 text-text-primary',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <Link
          to="/login"
          onClick={() => setDrawerOpen(false)}
          className="mt-4 text-center text-sm font-medium text-primary"
        >
          Login
        </Link>
      </NavDrawer>
    </header>
  )
}
