import { create } from 'zustand';

interface Project {
  readonly id: string;
  readonly name: string;
  readonly status: string;
}

interface ProjectState {
  readonly activeId: string | undefined;
  readonly list: readonly Project[];
  readonly setActiveProject: (id: string | undefined) => void;
  readonly setProjects: (projects: readonly Project[]) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  activeId: undefined,
  list: [],
  setActiveProject: (id) => set({ activeId: id }),
  setProjects: (projects) => set({ list: projects }),
}));
