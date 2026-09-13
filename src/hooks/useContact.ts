import { useMutation } from '@tanstack/react-query'
import { contactService } from '@/services/contactService'
import type { CreateContactMessageInput } from '@/types/contact'

export function useSubmitContactMessage() {
  return useMutation({
    mutationFn: async (input: CreateContactMessageInput) => contactService.create(input),
  })
}
