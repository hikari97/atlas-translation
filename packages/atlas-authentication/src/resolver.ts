import type { AuthenticationContext } from './context';
import type { AuthenticationContract } from './interface';
import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationMetadata } from './metadata';
import type { AuthenticationFactory } from './factory';
import type { AuthenticationDescriptor, AuthenticationRegistry } from './registry';

export interface AuthenticationScheme {
  readonly name: string;
}

export interface AuthenticationResolution {
  readonly descriptor: AuthenticationDescriptor;
  readonly strategy: AuthenticationContract;
  readonly resolvedAt: Date;
}

export interface AuthenticationResolverMetadata extends AuthenticationMetadata {}

export interface AuthenticationResolverLifecycle extends AuthenticationLifecycle {}

export interface AuthenticationResolver {
  readonly metadata: AuthenticationResolverMetadata;
  readonly lifecycle: AuthenticationResolverLifecycle;
  supports(target: AuthenticationDescriptor | AuthenticationContext): boolean;
  resolve(target: AuthenticationDescriptor | AuthenticationContext): AuthenticationResolution | undefined;
}

const isAuthenticationDescriptor = (target: AuthenticationDescriptor | AuthenticationContext): target is AuthenticationDescriptor =>
  'enabled' in target && 'scheme' in target && 'id' in target;

const descriptorFromContext = (context: AuthenticationContext): AuthenticationDescriptor | undefined => {
  if (context.state.authenticationId === undefined || context.state.scheme === undefined) return undefined;
  return {
    id: context.state.authenticationId,
    name: context.state.authenticationId,
    scheme: context.state.scheme,
    enabled: true,
    attributes: {},
  };
};

export const createAuthenticationResolver = (
  registry: AuthenticationRegistry,
  factory: AuthenticationFactory | undefined,
  metadata: AuthenticationResolverMetadata,
  lifecycle: AuthenticationResolverLifecycle,
): AuthenticationResolver => {
  const resolveDescriptor = (descriptor: AuthenticationDescriptor): AuthenticationResolution | undefined => {
    if (!descriptor.enabled) return undefined;
    const strategy = registry.get(descriptor.id)?.value ?? (factory?.supports(descriptor) === true ? factory.create(descriptor) : undefined);
    if (strategy === undefined) return undefined;
    return { descriptor, strategy, resolvedAt: new Date() };
  };
  const toDescriptor = (target: AuthenticationDescriptor | AuthenticationContext): AuthenticationDescriptor | undefined =>
    isAuthenticationDescriptor(target) ? target : descriptorFromContext(target);
  return {
    metadata,
    lifecycle,
    supports: (target) => {
      const descriptor = toDescriptor(target);
      return descriptor !== undefined && resolveDescriptor(descriptor) !== undefined;
    },
    resolve: (target) => {
      const descriptor = toDescriptor(target);
      return descriptor === undefined ? undefined : resolveDescriptor(descriptor);
    },
  };
};
