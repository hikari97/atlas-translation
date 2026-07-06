import { useMutation } from '@tanstack/react-query';

export interface CreateProjectInput { readonly name: string; readonly sourceLanguage: string; readonly targetLanguage: string; }

export function useCreateProjectMutation() {
  return useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      console.log('Project mock created:', input.name);
      return 'new-project-id-123';
    },
  });
}
