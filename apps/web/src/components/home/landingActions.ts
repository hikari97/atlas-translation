import type { AuthSessionStatus } from '../../lib/auth/useAuthSession';

export interface LandingAction {
  readonly href: string;
  readonly label: string;
}

/** Resolves the primary landing action without changing the landing page structure. */
export function getLandingPrimaryAction(status: AuthSessionStatus): LandingAction {
  if (status === 'authenticated') {
    return { href: '/dashboard/images', label: 'Open editor' };
  }

  return { href: '/auth/register', label: 'Create account' };
}

/** Resolves the supporting landing action for anonymous and authenticated visitors. */
export function getLandingSecondaryAction(status: AuthSessionStatus): LandingAction {
  if (status === 'authenticated') {
    return { href: '/dashboard', label: 'View dashboard' };
  }

  return { href: '/auth/login', label: 'Sign in' };
}
