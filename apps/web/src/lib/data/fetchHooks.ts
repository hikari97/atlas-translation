import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

export interface ProjectDto {
  readonly id: string;
  readonly name: string;
  readonly status: 'pending' | 'translating' | 'typesetting' | 'completed';
}

export function useProjectsQuery() {
  return useQuery<readonly ProjectDto[]>({
    queryKey: queryKeys.projects.list(),
    queryFn: async () => {
      // Mock fetch in boundary
      return [
        { id: '1', name: 'Demon Slayer Ch 1', status: 'translating' },
        { id: '2', name: 'One Piece Ch 1000', status: 'completed' },
      ];
    },
  });
}
