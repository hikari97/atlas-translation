import { create } from 'zustand';

interface AppState {
  readonly sidebarOpen: boolean;
  readonly themeMode: 'light' | 'dark';
  readonly toggleSidebar: () => void;
  readonly setThemeMode: (mode: 'light' | 'dark') => void;
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  themeMode: 'light',
  toggleSidebar: () => set((state: AppState) => ({ sidebarOpen: !state.sidebarOpen })),
  setThemeMode: (mode) => set({ themeMode: mode }),
}));
