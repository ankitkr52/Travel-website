import { lazy, Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/components/layout'
import { Toaster } from '@/components/ui'

const PublicLayout = lazy(() =>
  import('@/layouts/PublicLayout').then((m) => ({ default: m.PublicLayout })),
)
const AdminLayout = lazy(() =>
  import('@/layouts/AdminLayout').then((m) => ({ default: m.AdminLayout })),
)

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<PublicLayout>Travelnest</PublicLayout>} />
              <Route path="/admin" element={<AdminLayout>Admin dashboard</AdminLayout>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
