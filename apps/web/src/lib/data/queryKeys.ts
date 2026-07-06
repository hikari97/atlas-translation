export const queryKeys = {
  projects: { all: ['projects'] as const, list: () => [...queryKeys.projects.all, 'list'] as const, detail: (id: string) => [...queryKeys.projects.all, 'detail', id] as const },
  workspaces: { all: ['workspaces'] as const, list: () => [...queryKeys.workspaces.all, 'list'] as const },
};
