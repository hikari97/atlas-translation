import { create } from 'zustand';

interface Job {
  readonly id: string;
  readonly type: string;
  readonly progress: number;
  readonly status: 'pending' | 'running' | 'completed' | 'failed';
}

interface JobState {
  readonly jobs: readonly Job[];
  readonly addJob: (job: Job) => void;
  readonly updateJobProgress: (id: string, progress: number, status?: Job['status']) => void;
}

export const useJobStore = create<JobState>((set) => ({
  jobs: [],
  addJob: (job) => set((state: JobState) => ({ jobs: [...state.jobs, job] })),
  updateJobProgress: (id, progress, status) =>
    set((state: JobState) => ({
      jobs: state.jobs.map((j: Job) =>
        j.id === id ? { ...j, progress, status: status ?? j.status } : j
      ),
    })),
}));
