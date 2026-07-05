import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationAttributes } from './shared';

export type AuthenticationCredentialType = 'username-password' | 'bearer-token' | 'api-key' | 'anonymous' | 'custom';

export interface AuthenticationCredentialMetadata {
  readonly issuer: string | undefined;
  readonly subject: string | undefined;
  readonly attributes: AuthenticationAttributes;
}

export interface AuthenticationCredentialLifecycle extends AuthenticationLifecycle {}

export interface AuthenticationCredential {
  readonly type: AuthenticationCredentialType;
  readonly value: unknown;
  readonly metadata: AuthenticationCredentialMetadata;
  readonly lifecycle: AuthenticationCredentialLifecycle;
}

export const createAuthenticationCredential = (
  type: AuthenticationCredentialType,
  value: unknown,
  metadata: AuthenticationCredentialMetadata,
  lifecycle: AuthenticationCredentialLifecycle,
): AuthenticationCredential => ({ type, value, metadata, lifecycle });
