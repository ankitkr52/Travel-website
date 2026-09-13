export type UserRole = 'user' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  /** Plaintext for this mock/localStorage-only build — see AUTH.md limitation banner. */
  password: string
  role: UserRole
  createdAt: string
}

export type CreateUserInput = Omit<User, 'id' | 'role' | 'createdAt'>

export interface AuthSession {
  userId: string
  name: string
  email: string
  role: UserRole
}
