import { useMutation } from '@tanstack/react-query'
import { newsletterService } from '@/services/newsletterService'

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: async (email: string) => newsletterService.subscribe(email),
  })
}
