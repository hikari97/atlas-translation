import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Job { id: string; type: string; progress: number; status: 'pending' | 'running' | 'completed' | 'failed'; }

interface JobState { jobs: Job[]; }

const initialState: JobState = { jobs: [] };

export const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    addJob: (state, action: PayloadAction<Job>) => { state.jobs.push(action.payload); },
    updateJobProgress: (state, action: PayloadAction<{ id: string; progress: number; status?: Job['status'] }>) => {
      const j = state.jobs.find((j) => j.id === action.payload.id);
      if (j) { j.progress = action.payload.progress; if (action.payload.status) j.status = action.payload.status; }
    },
  },
});

export const { addJob, updateJobProgress } = jobSlice.actions;
export default jobSlice.reducer;
