import { useSyncExternalStore } from 'react';
import {
  getStoredAuthProfile,
  hasStoredAuthToken,
  useAuthProfileQuery,
} from '../data/authProfile';
import type { AuthProfile } from '../data/authProfile';

export type AuthSessionStatus = 'checking' | 'authenticated' | 'anonymous';

export interface AuthSession {
  readonly profile: AuthProfile | undefined;
  readonly status: AuthSessionStatus;
}

const AUTH_SESSION_CHANGED_EVENT = 'atlas:auth-session-changed';

function subscribeToHydration(): () => void {
  return () => undefined;
}

function subscribeToAuthSession(callback: () => void): () => void {
  const handleChange = () => callback();
  window.addEventListener('storage', handleChange);
  window.addEventListener(AUTH_SESSION_CHANGED_EVENT, handleChange);

  return () => {
    window.removeEventListener('storage', handleChange);
    window.removeEventListener(AUTH_SESSION_CHANGED_EVENT, handleChange);
  };
}

/** Notifies same-tab consumers after login or logout storage changes. */
export function notifyAuthSessionChanged(): void {
  window.dispatchEvent(new Event(AUTH_SESSION_CHANGED_EVENT));
}

/** Resolves the client-side Atlas session without causing hydration mismatches. */
export function useAuthSession(): AuthSession {
  const profileQuery = useAuthProfileQuery();
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false,
  );
  const hasToken = useSyncExternalStore(
    subscribeToAuthSession,
    hasStoredAuthToken,
    () => false,
  );

  if (!isHydrated) {
    return { profile: undefined, status: 'checking' };
  }

  if (!hasToken) {
    return { profile: undefined, status: 'anonymous' };
  }

  return {
    profile: profileQuery.data || getStoredAuthProfile(),
    status: 'authenticated',
  };
}
