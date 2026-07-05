import type { AuthenticationContext } from './context';
import type { AuthenticationSession } from './session';
import type { AuthenticationToken } from './token';
import type { AuthenticationMetadata } from './metadata';

export interface AuthenticationPrincipal {
  readonly id: string;
  readonly displayName: string | undefined;
}

export interface AuthenticationResult {
  readonly authenticated: boolean;
  readonly principal: AuthenticationPrincipal | undefined;
  readonly session: AuthenticationSession | undefined;
  readonly token: AuthenticationToken | undefined;
  readonly error: string | undefined;
  readonly metadata: AuthenticationMetadata;
}

export interface AuthenticationCapabilities {
  readonly asynchronous: boolean;
  readonly sessionCreation: boolean;
  readonly tokenGeneration: boolean;
}

export interface AuthenticationContract {
  readonly metadata: AuthenticationMetadata;
  readonly capabilities: AuthenticationCapabilities;
  authenticate(context: AuthenticationContext): Promise<AuthenticationResult>;
}

export const createAuthenticationResult = (
  authenticated: boolean,
  metadata: AuthenticationMetadata,
  principal: AuthenticationPrincipal | undefined = undefined,
  session: AuthenticationSession | undefined = undefined,
  token: AuthenticationToken | undefined = undefined,
  error: string | undefined = undefined,
): AuthenticationResult => ({ authenticated, principal, session, token, error, metadata });

export const createAuthentication = (
  metadata: AuthenticationMetadata,
  capabilities: AuthenticationCapabilities,
  authenticate: (context: AuthenticationContext) => Promise<AuthenticationResult>,
): AuthenticationContract => ({ metadata, capabilities, authenticate });
