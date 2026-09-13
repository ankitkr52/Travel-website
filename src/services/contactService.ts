import type { ContactMessage, CreateContactMessageInput } from '@/types/contact'
import { readStorage, writeStorage } from '@/lib/storage'

const KEY = 'contact_messages'

export const contactService = {
  getAll: (): ContactMessage[] => readStorage<ContactMessage[]>(KEY, []),

  create: (input: CreateContactMessageInput): ContactMessage => {
    const message: ContactMessage = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    }
    writeStorage(KEY, [...contactService.getAll(), message])
    return message
  },
}
