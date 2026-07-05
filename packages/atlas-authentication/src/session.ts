import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationAttributes } from './shared';

export interface AuthenticationSessionIdentifier {
  readonly id: string;
}

export type AuthenticationSessionState = 'authenticated' | 'active' | 'expired' | 'revoked' | 'invalidated';

export interface AuthenticationSessionMetadata {
  readonly subject: string;
  readonly createdAt: Date;
  readonly expiresAt: Date | undefined;
  readonly attributes: AuthenticationAttributes;
}

export interface AuthenticationSessionLifecycle extends AuthenticationLifecycle {}

export interface AuthenticationSession {
  readonly id: string;
  readonly state: AuthenticationSessionState;
  readonly expiresAt: Date | undefined;
  readonly identifier: AuthenticationSessionIdentifier;
  readonly metadata: AuthenticationSessionMetadata;
  readonly lifecycle: AuthenticationSessionLifecycle;
}

export const createAuthenticationSession = (
  identifier: AuthenticationSessionIdentifier,
  metadata: AuthenticationSessionMetadata,
  lifecycle: AuthenticationSessionLifecycle,
  state: AuthenticationSessionState = 'authenticated',
): AuthenticationSession => ({ id: identifier.id, state, expiresAt: metadata.expiresAt, identifier, metadata, lifecycle });
