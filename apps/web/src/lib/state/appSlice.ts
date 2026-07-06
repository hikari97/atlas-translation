import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  sidebarOpen: boolean;
  themeMode: 'light' | 'dark';
}

const initialState: AppState = {
  sidebarOpen: true,
  themeMode: 'light',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    toggleSidebar: (state) => { state.sidebarOpen = !state.sidebarOpen; },
    setThemeMode: (state, action: PayloadAction<'light' | 'dark'>) => { state.themeMode = action.payload; },
  },
});

export const { toggleSidebar, setThemeMode } = appSlice.actions;
export default appSlice.reducer;
