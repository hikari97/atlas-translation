import type { ControllerContract } from './interface';
import type { ControllerLifecycle } from './lifecycle';
import type { ControllerMetadata } from './metadata';
import type { ControllerDescriptor } from './registry';

export interface ControllerFactoryCapabilities {
  readonly lazyCreation: boolean;
  readonly descriptorCreation: boolean;
}

export interface ControllerFactoryMetadata extends ControllerMetadata {}

export interface ControllerFactoryLifecycle extends ControllerLifecycle {}

export interface ControllerFactory {
  readonly metadata: ControllerFactoryMetadata;
  readonly lifecycle: ControllerFactoryLifecycle;
  readonly capabilities: ControllerFactoryCapabilities;
  create(descriptor: ControllerDescriptor): ControllerContract | undefined;
}

export const createControllerFactory = (
  metadata: ControllerFactoryMetadata,
  lifecycle: ControllerFactoryLifecycle,
  capabilities: ControllerFactoryCapabilities,
  create: (descriptor: ControllerDescriptor) => ControllerContract | undefined,
): ControllerFactory => ({ metadata, lifecycle, capabilities, create });
