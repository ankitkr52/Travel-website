import { Link } from 'react-router-dom'

const FOOTER_COLUMNS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Destinations', href: '/destinations' },
      { label: 'Packages', href: '/packages' },
      { label: 'Hotels', href: '/hotels' },
      { label: 'Flights', href: '/flights' },
    ],
  },
  {
    heading: 'Plan',
    links: [
      { label: 'Itinerary', href: '/itinerary' },
      { label: 'Gallery', href: '/gallery' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Contact', href: '/contact' },
      { label: 'Login', href: '/login' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="text-lg font-semibold text-text-primary">
              Travelnest
            </Link>
            <p className="mt-3 max-w-xs text-sm text-text-secondary">
              Curated Indian journeys — destinations, stays, and itineraries in one place.
            </p>
          </div>

          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="text-sm font-semibold text-text-primary">{column.heading}</h3>
              <ul className="mt-3 flex flex-col gap-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-text-muted">
          © {new Date().getFullYear()} Travelnest. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
