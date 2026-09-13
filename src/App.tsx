import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/layout'
import { Toaster } from '@/components/ui'
import { AdminGuard, AuthGuard, GuestGuard } from '@/components/auth'

const PublicLayout = lazy(() =>
  import('@/layouts/PublicLayout').then((m) => ({ default: m.PublicLayout })),
)
const AdminLayout = lazy(() =>
  import('@/layouts/AdminLayout').then((m) => ({ default: m.AdminLayout })),
)

const HomePage = lazy(() => import('@/pages/home-page').then((m) => ({ default: m.HomePage })))
const DestinationsListingPage = lazy(() =>
  import('@/pages/destinations-listing-page').then((m) => ({ default: m.DestinationsListingPage })),
)
const DestinationDetailPage = lazy(() =>
  import('@/pages/destination-detail-page').then((m) => ({ default: m.DestinationDetailPage })),
)
const PackagesListingPage = lazy(() =>
  import('@/pages/packages-listing-page').then((m) => ({ default: m.PackagesListingPage })),
)
const PackageDetailPage = lazy(() =>
  import('@/pages/package-detail-page').then((m) => ({ default: m.PackageDetailPage })),
)
const PackageBookingPage = lazy(() =>
  import('@/pages/package-booking-page').then((m) => ({ default: m.PackageBookingPage })),
)
const HotelsListingPage = lazy(() =>
  import('@/pages/hotels-listing-page').then((m) => ({ default: m.HotelsListingPage })),
)
const HotelDetailPage = lazy(() =>
  import('@/pages/hotel-detail-page').then((m) => ({ default: m.HotelDetailPage })),
)
const HotelBookingPage = lazy(() =>
  import('@/pages/hotel-booking-page').then((m) => ({ default: m.HotelBookingPage })),
)
const FlightsPage = lazy(() =>
  import('@/pages/flights-page').then((m) => ({ default: m.FlightsPage })),
)
const FlightBookingPage = lazy(() =>
  import('@/pages/flight-booking-page').then((m) => ({ default: m.FlightBookingPage })),
)
const ItineraryListingPage = lazy(() =>
  import('@/pages/itinerary-listing-page').then((m) => ({ default: m.ItineraryListingPage })),
)
const ItineraryBuilderPage = lazy(() =>
  import('@/pages/itinerary-builder-page').then((m) => ({ default: m.ItineraryBuilderPage })),
)
const ItineraryViewPage = lazy(() =>
  import('@/pages/itinerary-view-page').then((m) => ({ default: m.ItineraryViewPage })),
)
const GalleryPage = lazy(() =>
  import('@/pages/gallery-page').then((m) => ({ default: m.GalleryPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/contact-page').then((m) => ({ default: m.ContactPage })),
)
const LoginPage = lazy(() => import('@/pages/login-page').then((m) => ({ default: m.LoginPage })))
const RegisterPage = lazy(() =>
  import('@/pages/register-page').then((m) => ({ default: m.RegisterPage })),
)
const ProfilePage = lazy(() =>
  import('@/pages/profile-page').then((m) => ({ default: m.ProfilePage })),
)
const ProfileBookingsPage = lazy(() =>
  import('@/pages/profile-bookings-page').then((m) => ({ default: m.ProfileBookingsPage })),
)
const ProfileItinerariesPage = lazy(() =>
  import('@/pages/profile-itineraries-page').then((m) => ({ default: m.ProfileItinerariesPage })),
)
const NotFoundPage = lazy(() =>
  import('@/pages/not-found-page').then((m) => ({ default: m.NotFoundPage })),
)

const AdminDashboardPage = lazy(() =>
  import('@/pages/admin/dashboard-page').then((m) => ({ default: m.AdminDashboardPage })),
)
const AdminUsersPage = lazy(() =>
  import('@/pages/admin/users-page').then((m) => ({ default: m.AdminUsersPage })),
)
const AdminBookingsPage = lazy(() =>
  import('@/pages/admin/bookings-page').then((m) => ({ default: m.AdminBookingsPage })),
)
const AdminDestinationsPage = lazy(() =>
  import('@/pages/admin/destinations-page').then((m) => ({ default: m.AdminDestinationsPage })),
)
const AdminPackagesPage = lazy(() =>
  import('@/pages/admin/packages-page').then((m) => ({ default: m.AdminPackagesPage })),
)
const AdminHotelsPage = lazy(() =>
  import('@/pages/admin/hotels-page').then((m) => ({ default: m.AdminHotelsPage })),
)
const AdminReviewsPage = lazy(() =>
  import('@/pages/admin/reviews-page').then((m) => ({ default: m.AdminReviewsPage })),
)

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route element={<PublicLayout />}>
                <Route index element={<HomePage />} />
                <Route path="destinations" element={<DestinationsListingPage />} />
                <Route path="destinations/:slug" element={<DestinationDetailPage />} />
                <Route path="packages" element={<PackagesListingPage />} />
                <Route path="packages/:slug" element={<PackageDetailPage />} />
                <Route path="hotels" element={<HotelsListingPage />} />
                <Route path="hotels/:slug" element={<HotelDetailPage />} />
                <Route path="flights" element={<FlightsPage />} />
                <Route path="itinerary" element={<ItineraryListingPage />} />
                <Route path="gallery" element={<GalleryPage />} />
                <Route path="contact" element={<ContactPage />} />

                <Route element={<GuestGuard />}>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                </Route>

                <Route element={<AuthGuard />}>
                  <Route path="packages/:slug/book" element={<PackageBookingPage />} />
                  <Route path="hotels/:slug/book" element={<HotelBookingPage />} />
                  <Route path="flights/book" element={<FlightBookingPage />} />
                  <Route path="itinerary/builder" element={<ItineraryBuilderPage />} />
                  <Route path="itinerary/:id" element={<ItineraryViewPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="profile/bookings" element={<ProfileBookingsPage />} />
                  <Route path="profile/itineraries" element={<ProfileItinerariesPage />} />
                </Route>

                <Route path="404" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              <Route path="admin" element={<AdminGuard />}>
                <Route element={<AdminLayout />}>
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="users" element={<AdminUsersPage />} />
                  <Route path="bookings" element={<AdminBookingsPage />} />
                  <Route path="destinations" element={<AdminDestinationsPage />} />
                  <Route path="packages" element={<AdminPackagesPage />} />
                  <Route path="hotels" element={<AdminHotelsPage />} />
                  <Route path="reviews" element={<AdminReviewsPage />} />
                </Route>
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
