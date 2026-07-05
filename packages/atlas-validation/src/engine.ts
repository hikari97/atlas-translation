import type { ValidationContext } from './context';
import type { ValidationExecutionResult, ValidationExecutor } from './executor';
import { createValidationResult } from './interface';
import type { ValidationLifecycle } from './lifecycle';
import type { ValidationMetadata } from './metadata';
import type { ValidationDescriptor } from './registry';
import type { ValidationRule } from './rule';
import type { ValidationResolver } from './resolver';

export interface ValidationEngineConfiguration {
  readonly stopOnFirstError: boolean;
  readonly attributes: Readonly<Record<string, string | number | boolean | null>>;
}

export interface ValidationEngineMetadata extends ValidationMetadata {}

export interface ValidationEngineLifecycle extends ValidationLifecycle {}

export interface ValidationEngineContext {
  readonly descriptor: ValidationDescriptor;
  readonly validationContext: ValidationContext;
  readonly rules: readonly ValidationRule[];
}

export interface ValidationEngine {
  readonly metadata: ValidationEngineMetadata;
  readonly lifecycle: ValidationEngineLifecycle;
  readonly configuration: ValidationEngineConfiguration;
  run(context: ValidationEngineContext): Promise<ValidationExecutionResult>;
}

export const createValidationEngine = (
  resolver: ValidationResolver,
  executor: ValidationExecutor,
  metadata: ValidationEngineMetadata,
  lifecycle: ValidationEngineLifecycle,
  configuration: ValidationEngineConfiguration = { stopOnFirstError: false, attributes: {} },
): ValidationEngine => ({
  metadata,
  lifecycle,
  configuration,
  async run(context) {
    lifecycle.transition('resolving');
    const resolution = resolver.resolve(context.descriptor);
    if (resolution === undefined) {
      lifecycle.transition('failed');
      const error = new Error(`Validation not resolved: ${context.descriptor.id}`);
      const result = createValidationResult(
        [{
          path: '',
          code: 'validation.not_resolved',
          message: `Validation not resolved: ${context.descriptor.id}`,
          severity: 'error',
        }],
        metadata,
      );
      return {
        ...result,
        context: context.validationContext,
        execution: {
          startedAt: new Date(),
          completedAt: new Date(),
        },
        ruleResults: [],
        completed: false,
        error,
      };
    }
    lifecycle.transition('resolved');
    const result = await executor.execute(context.rules, context.validationContext);
    lifecycle.transition(result.valid ? 'completed' : 'failed');
    return result;
  },
});
