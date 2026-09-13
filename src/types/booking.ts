export type BookingType = 'package' | 'hotel' | 'flight'
export type BookingStatus = 'confirmed' | 'cancelled' | 'completed'

export interface Traveler {
  name: string
  age: number
  gender?: string
}

export interface Booking {
  id: string
  type: BookingType
  userId: string
  itemId: string
  travelers: Traveler[]
  startDate: string
  endDate?: string
  totalPrice: number
  status: BookingStatus
  createdAt: string
}

export type CreateBookingInput = Omit<Booking, 'id' | 'createdAt' | 'status'>
