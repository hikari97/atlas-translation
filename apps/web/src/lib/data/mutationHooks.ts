import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';
import type { ProjectDto } from './fetchHooks';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

const getToken = () => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('token') || '';
};

const authHeaders = () => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
});

// ===== AUTH =====
export interface LoginInput {
  email: string;
  password: string;
}
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: async (input: LoginInput) => {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', json.data.accessToken);
        localStorage.setItem('user', JSON.stringify(json.data.user));
      }
      return json.data;
    },
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: async (input: RegisterInput) => {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      if (typeof window !== 'undefined') {
        localStorage.setItem('token', json.data.accessToken);
        localStorage.setItem('user', JSON.stringify(json.data.user));
      }
      return json.data;
    },
  });
}

// ===== PROJECTS =====
export interface CreateProjectInput {
  name: string;
  description?: string;
  sourceLanguage?: string;
  targetLanguage?: string;
}

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      const res = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data as ProjectDto;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
}

export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
}

// ===== BUBBLES =====
export interface UpdateBubbleInput {
  id: string;
  translatedText?: string;
  originalText?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  status?: string;
  font?: string;
  fontSize?: number;
}

export function useUpdateBubbleMutation() {
  return useMutation({
    mutationFn: async (input: UpdateBubbleInput) => {
      const { id, ...body } = input;
      const res = await fetch(`${API_URL}/bubbles/${id}`, {
        method: 'PATCH',
        headers: authHeaders(),
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data;
    },
  });
}

// ===== OCR & TRANSLATION =====
export interface TriggerOcrInput {
  readonly pageId: string;
}

export function useTriggerOcrMutation() {
  return useMutation({
    mutationFn: async (input: TriggerOcrInput) => {
      const res = await fetch(`${API_URL}/ocr/page`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data as { jobId: string };
    },
  });
}

export interface TriggerTranslationInput {
  readonly pageId: string;
  readonly targetLanguage?: string;
}

export function useTriggerTranslationMutation() {
  return useMutation({
    mutationFn: async (input: TriggerTranslationInput) => {
      const res = await fetch(`${API_URL}/translation/page`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(input),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data as { jobId: string };
    },
  });
}

// ===== PAGES =====
export interface CreatePageInput {
  readonly projectId: string;
  readonly files: readonly File[]; // Terima array file
}

export function useCreatePageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreatePageInput) => {
      const formData = new FormData();
      // Lampirkan semua file secara berurutan ke key 'image'
      input.files.forEach((file) => {
        formData.append('image', file);
      });

      const token = getToken();
      const res = await fetch(`${API_URL}/projects/${input.projectId}/pages`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['pages', variables.projectId] });
    },
  });
}
