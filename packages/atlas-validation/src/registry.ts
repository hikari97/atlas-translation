import type { ValidationContract } from './interface';
import type { ValidationLifecycle } from './lifecycle';
import type { ValidationMetadata } from './metadata';
import type { ValidationMutableRegistry, ValidationRegistryEntry } from './shared';
import { InMemoryValidationRegistry } from './shared';

export interface ValidationDescriptor {
  readonly id: string;
  readonly name: string;
  readonly group: string | undefined;
  readonly enabled: boolean;
  readonly attributes: Readonly<Record<string, string | number | boolean | null>>;
}

export interface ValidationRegistryMetadata extends ValidationMetadata {}

export interface ValidationRegistryLifecycle extends ValidationLifecycle {}

export interface ValidationRegistry extends ValidationMutableRegistry<ValidationContract> {
  registerValidation(entry: ValidationRegistryEntry<ValidationContract>, descriptor: ValidationDescriptor): void;
  descriptors(): readonly ValidationDescriptor[];
}

export class DefaultValidationRegistry extends InMemoryValidationRegistry<ValidationContract> implements ValidationRegistry {
  private readonly descriptorValues = new Map<string, ValidationDescriptor>();

  public registerValidation(entry: ValidationRegistryEntry<ValidationContract>, descriptor: ValidationDescriptor): void {
    this.register(entry);
    this.descriptorValues.set(descriptor.id, descriptor);
  }

  public override unregister(id: string): void {
    super.unregister(id);
    this.descriptorValues.delete(id);
  }

  public descriptors(): readonly ValidationDescriptor[] {
    return Array.from(this.descriptorValues.values());
  }
}

export const createValidationRegistry = (): ValidationRegistry => new DefaultValidationRegistry();
