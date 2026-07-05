import type { ValidationContract } from './interface';
import type { ValidationLifecycle } from './lifecycle';
import type { ValidationMetadata } from './metadata';
import type { ValidationFactory } from './factory';
import type { ValidationDescriptor, ValidationRegistry } from './registry';

export interface ValidationResolution {
  readonly descriptor: ValidationDescriptor;
  readonly validation: ValidationContract;
  readonly resolvedAt: Date;
}

export interface ValidationResolverMetadata extends ValidationMetadata {}

export interface ValidationResolverLifecycle extends ValidationLifecycle {}

export interface ValidationResolver {
  readonly metadata: ValidationResolverMetadata;
  readonly lifecycle: ValidationResolverLifecycle;
  resolve(descriptor: ValidationDescriptor): ValidationResolution | undefined;
}

export const createValidationResolver = (
  registry: ValidationRegistry,
  factory: ValidationFactory | undefined,
  metadata: ValidationResolverMetadata,
  lifecycle: ValidationResolverLifecycle,
): ValidationResolver => {
  const resolveDescriptor = (descriptor: ValidationDescriptor): ValidationResolution | undefined => {
    if (!descriptor.enabled) return undefined;
    const validation = registry.get(descriptor.id)?.value ?? factory?.create(descriptor);
    if (validation === undefined) return undefined;
    return { descriptor, validation, resolvedAt: new Date() };
  };
  return { metadata, lifecycle, resolve: resolveDescriptor };
};
