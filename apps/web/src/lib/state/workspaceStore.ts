import { create } from 'zustand';

interface Workspace {
  readonly id: string;
  readonly name: string;
  readonly role: string;
}

interface WorkspaceState {
  readonly activeId: string | undefined;
  readonly list: readonly Workspace[];
  readonly setActiveWorkspace: (id: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  activeId: '1',
  list: [
    { id: '1', name: 'Personal Workspace', role: 'Owner' },
    { id: '2', name: 'Manga Translation Team', role: 'Editor' },
  ],
  setActiveWorkspace: (id) => set({ activeId: id }),
}));
