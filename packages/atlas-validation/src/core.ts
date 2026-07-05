import type { ValidationContext } from './context';
import type { ValidationLifecycle } from './lifecycle';
import type { ValidationMetadata } from './metadata';
import type { ValidationMutableRegistry } from './shared';
import { InMemoryValidationRegistry } from './shared';

export interface ValidationCoreRegistry extends ValidationMutableRegistry<unknown> {}

export interface ValidationCore {
  readonly context: ValidationContext;
  readonly lifecycle: ValidationLifecycle;
  readonly metadata: ValidationMetadata;
  readonly registry: ValidationCoreRegistry;
}

export const createValidationCore = (
  context: ValidationContext,
  lifecycle: ValidationLifecycle,
  metadata: ValidationMetadata,
  registry: ValidationCoreRegistry = new InMemoryValidationRegistry<unknown>(),
): ValidationCore => ({ context, lifecycle, metadata, registry });
