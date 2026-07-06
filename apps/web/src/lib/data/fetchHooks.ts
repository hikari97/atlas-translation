import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

export interface ProjectDto { readonly id: string; readonly name: string; readonly status: 'pending' | 'translating' | 'typesetting' | 'completed'; }

export function useProjectsQuery() {
  return useQuery({
    queryKey: queryKeys.projects.list(),
    queryFn: async () => {
      // Mock — ganti dengan fetch API nanti
      return [
        { id: '1', name: 'Demon Slayer Ch 1', status: 'translating' as const },
        { id: '2', name: 'One Piece Ch 1000', status: 'completed' as const },
      ] satisfies ProjectDto[];
    },
  });
}
