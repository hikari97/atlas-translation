import type { ControllerContract } from './interface';
import type { ControllerLifecycle } from './lifecycle';
import type { ControllerMetadata } from './metadata';
import type { ControllerFactory } from './factory';
import type { ControllerDescriptor, ControllerRegistry } from './registry';

export interface ControllerResolution {
  readonly descriptor: ControllerDescriptor;
  readonly controller: ControllerContract;
  readonly resolvedAt: Date;
}

export interface ControllerResolverMetadata extends ControllerMetadata {}

export interface ControllerResolverLifecycle extends ControllerLifecycle {}

export interface ControllerResolver {
  readonly metadata: ControllerResolverMetadata;
  readonly lifecycle: ControllerResolverLifecycle;
  resolve(descriptor: ControllerDescriptor): ControllerResolution | undefined;
}

export const createControllerResolver = (
  registry: ControllerRegistry,
  factory: ControllerFactory | undefined,
  metadata: ControllerResolverMetadata,
  lifecycle: ControllerResolverLifecycle,
): ControllerResolver => {
  const resolveDescriptor = (descriptor: ControllerDescriptor): ControllerResolution | undefined => {
    if (!descriptor.enabled) return undefined;
    const controller = registry.get(descriptor.id)?.value ?? factory?.create(descriptor);
    if (controller === undefined) return undefined;
    return { descriptor, controller, resolvedAt: new Date() };
  };
  return { metadata, lifecycle, resolve: resolveDescriptor };
};
