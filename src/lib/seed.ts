import destinationsSeed from '@/data/destinations.json'
import packagesSeed from '@/data/packages.json'
import hotelsSeed from '@/data/hotels.json'
import reviewsSeed from '@/data/reviews.json'
import usersSeed from '@/data/users.json'
import type { Destination } from '@/types/destination'
import type { TourPackage } from '@/types/package'
import type { Hotel } from '@/types/hotel'
import type { Review } from '@/types/review'
import type { User } from '@/types/user'
import type { CustomItinerary } from '@/types/itinerary'
import type { Booking } from '@/types/booking'
import type { ContactMessage } from '@/types/contact'
import { readStorage, writeStorage } from './storage'

const SEEDED_FLAG = '__data_seeded'

/** Seeds mock JSON into localStorage once; later admin edits are never overwritten. */
export function seedData(): void {
  if (readStorage(SEEDED_FLAG, false)) return

  writeStorage<Destination[]>('destinations', destinationsSeed)
  writeStorage<TourPackage[]>('packages', packagesSeed)
  writeStorage<Hotel[]>('hotels', hotelsSeed)
  writeStorage<Review[]>('reviews', reviewsSeed as unknown as Review[])
  writeStorage<User[]>('users', usersSeed as unknown as User[])
  writeStorage<CustomItinerary[]>('itineraries', [])
  writeStorage<Booking[]>('bookings', [])
  writeStorage<ContactMessage[]>('contact_messages', [])
  writeStorage<string[]>('newsletter_subscribers', [])

  writeStorage(SEEDED_FLAG, true)
}
