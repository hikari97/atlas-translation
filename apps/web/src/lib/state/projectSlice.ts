import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Project { id: string; name: string; status: string; }

interface ProjectState {
  activeId: string | undefined;
  list: Project[];
}

const initialState: ProjectState = { activeId: undefined, list: [] };

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setActiveProject: (state, action: PayloadAction<string | undefined>) => { state.activeId = action.payload; },
    setProjects: (state, action: PayloadAction<Project[]>) => { state.list = action.payload; },
  },
});

export const { setActiveProject, setProjects } = projectSlice.actions;
export default projectSlice.reducer;
