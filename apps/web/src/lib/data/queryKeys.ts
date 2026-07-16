export const queryKeys = {
  auth: {
    all: ['auth'] as const,
    profile: () => [...queryKeys.auth.all, 'profile'] as const,
  },
  projects: {
    all: ['projects'] as const,
    list: () => [...queryKeys.projects.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.projects.all, 'detail', id] as const,
  },
  pages: {
    byProject: (projectId: string) => ['pages', projectId] as const,
  },
  bubbles: {
    byPage: (pageId: string) => ['bubbles', pageId] as const,
  },
};
