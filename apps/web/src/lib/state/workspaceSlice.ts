import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Workspace {
  id: string; name: string; role: string;
}

interface WorkspaceState {
  activeId: string | undefined;
  list: Workspace[];
}

const initialState: WorkspaceState = {
  activeId: undefined,
  list: [],
};

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setActiveWorkspace: (state, action: PayloadAction<string>) => { state.activeId = action.payload; },
    setWorkspaces: (state, action: PayloadAction<Workspace[]>) => { state.list = action.payload; },
  },
});

export const { setActiveWorkspace, setWorkspaces } = workspaceSlice.actions;
export default workspaceSlice.reducer;
