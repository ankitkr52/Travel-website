import type { CreateUserInput, User } from '@/types/user'
import { readStorage, writeStorage } from '@/lib/storage'

const KEY = 'users'

export const userService = {
  getAll: (): User[] => readStorage<User[]>(KEY, []),

  getByEmail: (email: string): User | null =>
    userService.getAll().find((u) => u.email.toLowerCase() === email.toLowerCase()) ?? null,

  getById: (id: string): User | null => userService.getAll().find((u) => u.id === id) ?? null,

  register: (input: CreateUserInput): User => {
    const user: User = {
      ...input,
      id: crypto.randomUUID(),
      role: 'user',
      createdAt: new Date().toISOString(),
    }
    writeStorage(KEY, [...userService.getAll(), user])
    return user
  },
}
