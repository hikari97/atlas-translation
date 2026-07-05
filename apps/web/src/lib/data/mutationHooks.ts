import { useMutation } from '@tanstack/react-query';

export interface CreateProjectInput {
  readonly name: string;
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
}

export function useCreateProjectMutation() {
  return useMutation<string, unknown, CreateProjectInput>(
    async (input: CreateProjectInput) => {
      // Mock database save in boundary
      console.log('Project mock created:', input.name);
      return 'new-project-id-123';
    }
  );
}
