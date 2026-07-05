import type { MiddlewareContract } from './interface';
import type { MiddlewareLifecycle } from './lifecycle';
import type { MiddlewareMetadata } from './metadata';
import type { MiddlewareDescriptor, MiddlewareRegistry } from './registry';

export interface MiddlewareFactory {
  create(descriptor: MiddlewareDescriptor): MiddlewareContract;
}

export interface MiddlewareResolution {
  readonly descriptor: MiddlewareDescriptor;
  readonly middleware: MiddlewareContract;
  readonly resolvedAt: Date;
}

export interface MiddlewareResolverMetadata extends MiddlewareMetadata {}

export interface MiddlewareResolverLifecycle extends MiddlewareLifecycle {}

export interface MiddlewareResolver {
  readonly metadata: MiddlewareResolverMetadata;
  readonly lifecycle: MiddlewareResolverLifecycle;
  resolve(descriptor: MiddlewareDescriptor): MiddlewareResolution | undefined;
  resolveAll(descriptors: readonly MiddlewareDescriptor[]): readonly MiddlewareResolution[];
}

export const createMiddlewareResolver = (
  registry: MiddlewareRegistry,
  factory: MiddlewareFactory | undefined,
  metadata: MiddlewareResolverMetadata,
  lifecycle: MiddlewareResolverLifecycle,
): MiddlewareResolver => {
  const resolveDescriptor = (descriptor: MiddlewareDescriptor): MiddlewareResolution | undefined => {
    if (!descriptor.enabled) {
      return undefined;
    }
    const middleware = registry.get(descriptor.id)?.value ?? factory?.create(descriptor);
    if (middleware === undefined) {
      return undefined;
    }
    return {
      descriptor,
      middleware,
      resolvedAt: new Date(),
    };
  };

  return {
    metadata,
    lifecycle,
    resolve: resolveDescriptor,
    resolveAll(descriptors) {
      lifecycle.transition('resolving');
      const resolutions = descriptors
        .map((descriptor) => resolveDescriptor(descriptor))
        .filter((resolution): resolution is MiddlewareResolution => resolution !== undefined);
      lifecycle.transition('resolved');
      return resolutions;
    },
  };
};
