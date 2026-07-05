import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationAttributes } from './shared';

export type AuthenticationTokenType = 'bearer' | 'refresh' | 'api-key' | 'session' | 'custom';

export interface AuthenticationTokenCapabilities {
  readonly revocable: boolean;
  readonly renewable: boolean;
}

export interface AuthenticationTokenMetadata {
  readonly subject: string;
  readonly issuedAt: Date;
  readonly expiresAt: Date | undefined;
  readonly attributes: AuthenticationAttributes;
}

export interface AuthenticationTokenLifecycle extends AuthenticationLifecycle {}

export interface AuthenticationToken {
  readonly type: AuthenticationTokenType;
  readonly value: string;
  readonly expiresAt: Date | undefined;
  readonly capabilities: AuthenticationTokenCapabilities;
  readonly metadata: AuthenticationTokenMetadata;
  readonly lifecycle: AuthenticationTokenLifecycle;
}

export const createAuthenticationToken = (
  type: AuthenticationTokenType,
  value: string,
  capabilities: AuthenticationTokenCapabilities,
  metadata: AuthenticationTokenMetadata,
  lifecycle: AuthenticationTokenLifecycle,
): AuthenticationToken => ({ type, value, expiresAt: metadata.expiresAt, capabilities, metadata, lifecycle });
