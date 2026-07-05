import type { ValidationContract } from './interface';
import type { ValidationLifecycle } from './lifecycle';
import { DefaultValidationLifecycle } from './lifecycle';
import type { ValidationMetadata } from './metadata';
import { DefaultValidationMetadata } from './metadata';
import type { ValidationDescriptor } from './registry';
import type { ValidationRule } from './rule';

export interface ValidationDefinition {
  readonly descriptor: ValidationDescriptor;
  readonly validation: ValidationContract;
  readonly rules: readonly ValidationRule[];
}

export interface ValidationBuilderState {
  readonly definitions: readonly ValidationDefinition[];
}

export interface ValidationBuilderContext {
  readonly metadata: ValidationMetadata;
  readonly lifecycle: ValidationLifecycle;
}

export interface ValidationBuilder {
  validation(descriptor: ValidationDescriptor, validation: ValidationContract, rules: readonly ValidationRule[]): this;
  build(): readonly ValidationDefinition[];
  buildResult(): { readonly definitions: readonly ValidationDefinition[]; readonly state: ValidationBuilderState; readonly context: ValidationBuilderContext };
}

export class DefaultValidationBuilder implements ValidationBuilder {
  private readonly definitions: ValidationDefinition[] = [];

  public constructor(
    private readonly metadata: ValidationMetadata = new DefaultValidationMetadata('validation-builder', 'Validation Builder', '0.1.0'),
    private readonly lifecycle: ValidationLifecycle = new DefaultValidationLifecycle(),
  ) {}

  public validation(descriptor: ValidationDescriptor, validation: ValidationContract, rules: readonly ValidationRule[]): this {
    this.definitions.push({ descriptor, validation, rules: [...rules] });
    return this;
  }

  public build(): readonly ValidationDefinition[] {
    this.lifecycle.transition('completed');
    return [...this.definitions];
  }

  public buildResult() {
    const definitions = this.build();
    return { definitions, state: { definitions }, context: { metadata: this.metadata, lifecycle: this.lifecycle } };
  }
}

export interface ValidationBuilderFactory {
  create(): ValidationBuilder;
}

export const createValidationBuilderFactory = (): ValidationBuilderFactory => ({
  create: () => new DefaultValidationBuilder(),
});
