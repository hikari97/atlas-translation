import { useQuery } from '@tanstack/react-query';
import { queryKeys } from './queryKeys';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export interface AuthProfile {
  readonly _id?: string;
  readonly avatar?: string;
  readonly createdAt?: string;
  readonly email: string;
  readonly name: string;
  readonly role: 'admin' | 'user';
}

interface ProfileResponse {
  readonly data?: unknown;
  readonly message?: unknown;
  readonly success?: unknown;
}

export function isAuthProfile(value: unknown): value is AuthProfile {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<AuthProfile>;
  return typeof candidate.name === 'string'
    && typeof candidate.email === 'string'
    && (candidate.role === 'admin' || candidate.role === 'user');
}

function getToken(): string {
  return typeof window === 'undefined' ? '' : localStorage.getItem('token') || '';
}

/** Returns the locally cached profile when it matches the public auth contract. */
export function getStoredAuthProfile(): AuthProfile | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const storedProfile = localStorage.getItem('user');
  if (!storedProfile) {
    return undefined;
  }

  try {
    const parsedProfile: unknown = JSON.parse(storedProfile);
    return isAuthProfile(parsedProfile) ? parsedProfile : undefined;
  } catch {
    return undefined;
  }
}

/** Reports whether the browser currently has an authentication token. */
export function hasStoredAuthToken(): boolean {
  return typeof window !== 'undefined' && Boolean(getToken());
}

async function fetchAuthProfile(): Promise<AuthProfile> {
  const response = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
  });
  const payload = await response.json().catch(() => null) as ProfileResponse | null;

  if (!response.ok || payload?.success !== true || !isAuthProfile(payload.data)) {
    throw new Error(
      typeof payload?.message === 'string'
        ? payload.message
        : 'Unable to load your profile.',
    );
  }

  localStorage.setItem('user', JSON.stringify(payload.data));
  return payload.data;
}

/** Returns the latest authenticated profile without persisting dashboard data. */
export function useAuthProfileQuery() {
  return useQuery({
    queryKey: queryKeys.auth.profile(),
    queryFn: fetchAuthProfile,
    enabled: typeof window !== 'undefined' && Boolean(getToken()),
    retry: false,
    staleTime: 60_000,
  });
}
