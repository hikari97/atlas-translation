import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export interface ProjectDto {
  readonly _id: string;
  readonly name: string;
  readonly description: string;
  readonly status: 'draft' | 'active' | 'completed' | 'archived';
  readonly sourceLanguage: string;
  readonly targetLanguage: string;
  readonly pages: string[];
}

export interface PageDto {
  readonly _id: string;
  readonly project: string;
  readonly pageNumber: number;
  readonly image: string;
  readonly status:
    | 'pending'
    | 'ocr'
    | 'translated'
    | 'typesetting'
    | 'completed';
  readonly bubbles: string[];
}

export interface BubbleDto {
  readonly _id: string;
  readonly page: string;
  readonly originalText: string;
  readonly translatedText: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly status: 'pending' | 'ocr' | 'translated' | 'review' | 'approved';
  readonly confidence: number;
  readonly font: string;
  readonly fontSize: number;
}

// Helper untuk dapatkan token
const getToken = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('token') || '';
};

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// ===== PROJECTS =====
export function useProjectsQuery() {
  return useQuery({
    queryKey: queryKeys.projects.list(),
    queryFn: async () => {
      const res = await fetch(`${API_URL}/projects`, {
        headers: authHeaders(),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data as ProjectDto[];
    },
  });
}

export function useProjectDetailQuery(id: string) {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: async () => {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        headers: authHeaders(),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data as ProjectDto;
    },
    enabled: !!id,
  });
}

// ===== PAGES =====
export function usePagesQuery(projectId: string) {
  return useQuery({
    queryKey: ['pages', projectId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/projects/${projectId}/pages`, {
        headers: authHeaders(),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data as PageDto[];
    },
    enabled: !!projectId,
  });
}

// ===== BUBBLES =====
export function useBubblesQuery(pageId: string) {
  return useQuery({
    queryKey: ['bubbles', pageId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/pages/${pageId}/bubbles`, {
        headers: authHeaders(),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data as BubbleDto[];
    },
    enabled: !!pageId,
  });
}

export interface JobDto {
  readonly id: string;
  readonly type: string;
  readonly status: 'pending' | 'running' | 'completed' | 'failed';
  readonly progress: number;
  readonly message: string;
  readonly metadata: Record<string, any>;
}

export function useJobStatusQuery(jobId: string, enabled: boolean) {
  return useQuery({
    queryKey: ['jobStatus', jobId],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/jobs/${jobId}`, { headers: authHeaders() });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data as JobDto;
    },
    enabled: enabled && !!jobId,
    refetchInterval: (query) => {
      const state = query.state.data;
      if (state && (state.status === 'completed' || state.status === 'failed')) {
        return false; // Stop polling
      }
      return 1500; // Poll every 1.5s
    },
  });
}
