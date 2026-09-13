export interface Airport {
  code: string
  city: string
  name: string
  state: string
}

export type CabinClass = 'economy' | 'premium_economy' | 'business'

export interface Flight {
  id: string
  airline: string
  flightNumber: string
  fromCode: string
  toCode: string
  departureTime: string
  arrivalTime: string
  durationMinutes: number
  price: number
  cabinClass: CabinClass
  stops: number
}
