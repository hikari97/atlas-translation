import type { ValidationContract } from './interface';
import type { ValidationLifecycle } from './lifecycle';
import type { ValidationMetadata } from './metadata';
import type { ValidationDescriptor } from './registry';

export interface ValidationFactoryCapabilities {
  readonly lazyCreation: boolean;
  readonly descriptorCreation: boolean;
}

export interface ValidationFactoryMetadata extends ValidationMetadata {}

export interface ValidationFactoryLifecycle extends ValidationLifecycle {}

export interface ValidationFactory {
  readonly metadata: ValidationFactoryMetadata;
  readonly lifecycle: ValidationFactoryLifecycle;
  readonly capabilities: ValidationFactoryCapabilities;
  create(descriptor: ValidationDescriptor): ValidationContract | undefined;
}

export const createValidationFactory = (
  metadata: ValidationFactoryMetadata,
  lifecycle: ValidationFactoryLifecycle,
  capabilities: ValidationFactoryCapabilities,
  create: (descriptor: ValidationDescriptor) => ValidationContract | undefined,
): ValidationFactory => ({ metadata, lifecycle, capabilities, create });
