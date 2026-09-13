import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { packageService } from '@/services/packageService'
import type { CreatePackageInput } from '@/types/package'

const QUERY_KEY = ['packages']

export function usePackages() {
  return useQuery({ queryKey: QUERY_KEY, queryFn: packageService.getAll })
}

export function usePackage(slug: string | undefined) {
  return useQuery({
    queryKey: [...QUERY_KEY, slug],
    queryFn: () => packageService.getBySlug(slug!),
    enabled: !!slug,
  })
}

export function useCreatePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (input: CreatePackageInput) => packageService.create(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useUpdatePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, input }: { id: string; input: Partial<CreatePackageInput> }) =>
      packageService.update(id, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}

export function useDeletePackage() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => packageService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: QUERY_KEY }),
  })
}
