import { AnimatedOutlet, Footer, Header } from '@/components/layout'

export function PublicLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <AnimatedOutlet />
      </main>
      <Footer />
    </div>
  )
}
