import type { AuthenticationContext } from './context';
import { createAuthenticationResult, type AuthenticationResult } from './interface';
import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationMetadata } from './metadata';
import type { AuthenticationDescriptor } from './registry';
import type { AuthenticationResolver } from './resolver';

export interface AuthenticationEngineConfiguration {
  readonly issueSession: boolean;
  readonly issueToken: boolean;
  readonly attributes: Readonly<Record<string, string | number | boolean | null>>;
}

export interface AuthenticationEngineMetadata extends AuthenticationMetadata {}

export interface AuthenticationEngineLifecycle extends AuthenticationLifecycle {}

export interface AuthenticationEngineContext {
  readonly descriptor: AuthenticationDescriptor;
  readonly authenticationContext: AuthenticationContext;
}

export interface AuthenticationEngine {
  readonly metadata: AuthenticationEngineMetadata;
  readonly lifecycle: AuthenticationEngineLifecycle;
  readonly configuration: AuthenticationEngineConfiguration;
  authenticate(context: AuthenticationContext): Promise<AuthenticationResult>;
  run(context: AuthenticationEngineContext): Promise<AuthenticationResult>;
}

export const createAuthenticationEngine = (
  resolver: AuthenticationResolver,
  metadata: AuthenticationEngineMetadata,
  lifecycle: AuthenticationEngineLifecycle,
  configuration: AuthenticationEngineConfiguration = { issueSession: true, issueToken: true, attributes: {} },
): AuthenticationEngine => ({
  metadata,
  lifecycle,
  configuration,
  async authenticate(authenticationContext) {
    lifecycle.transition('resolving');
    const resolution = resolver.resolve(authenticationContext);
    if (resolution === undefined) {
      lifecycle.transition('failed');
      return createAuthenticationResult(false, metadata, undefined, undefined, undefined, 'Authentication not resolved');
    }
    lifecycle.transition('resolved');
    lifecycle.transition('authenticating');
    const result = await resolution.strategy.authenticate(authenticationContext);
    lifecycle.transition(result.authenticated ? 'authenticated' : 'failed');
    return result;
  },
  async run(context) {
    lifecycle.transition('resolving');
    const resolution = resolver.resolve(context.descriptor);
    if (resolution === undefined) {
      lifecycle.transition('failed');
      return createAuthenticationResult(false, metadata, undefined, undefined, undefined, `Authentication not resolved: ${context.descriptor.id}`);
    }
    lifecycle.transition('resolved');
    lifecycle.transition('authenticating');
    const result = await resolution.strategy.authenticate(context.authenticationContext);
    lifecycle.transition(result.authenticated ? 'authenticated' : 'failed');
    return result;
  },
});
