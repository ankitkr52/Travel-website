import { readStorage, writeStorage } from '@/lib/storage'

const KEY = 'newsletter_subscribers'

export const newsletterService = {
  getAll: (): string[] => readStorage<string[]>(KEY, []),

  subscribe: (email: string): void => {
    const all = newsletterService.getAll()
    if (all.includes(email)) return
    writeStorage(KEY, [...all, email])
  },
}
