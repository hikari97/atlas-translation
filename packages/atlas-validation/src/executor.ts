import type { ValidationContext } from './context';
import type { ValidationResult } from './interface';
import { createValidationResult } from './interface';
import type { ValidationLifecycle } from './lifecycle';
import type { ValidationMetadata } from './metadata';
import type { ValidationRule, ValidationRuleResult } from './rule';

export interface ValidationExecutionMetadata extends ValidationMetadata {}

export interface ValidationExecutionLifecycle extends ValidationLifecycle {}

export interface ValidationExecution {
  readonly startedAt: Date;
  readonly completedAt: Date | undefined;
}

export interface ValidationExecutionResult extends ValidationResult {
  readonly context: ValidationContext;
  readonly execution: ValidationExecution;
  readonly ruleResults: readonly ValidationRuleResult[];
  readonly completed: boolean;
  readonly error: unknown;
}

export interface ValidationExecutor {
  readonly metadata: ValidationExecutionMetadata;
  readonly lifecycle: ValidationExecutionLifecycle;
  execute(rules: readonly ValidationRule[], context: ValidationContext): Promise<ValidationExecutionResult>;
}

export const createValidationExecutor = (
  metadata: ValidationExecutionMetadata,
  lifecycle: ValidationExecutionLifecycle,
): ValidationExecutor => ({
  metadata,
  lifecycle,
  async execute(rules, context) {
    lifecycle.transition('executing');
    const execution = { startedAt: new Date(), completedAt: undefined };
    try {
      const ruleResults: ValidationRuleResult[] = [];
      for (const rule of rules) {
        ruleResults.push(await rule.validate(context));
      }
      const issues = ruleResults.flatMap((result) => result.issues);
      const result = createValidationResult(issues, metadata);
      lifecycle.transition(result.valid ? 'completed' : 'failed');
      return { ...result, context, execution: { ...execution, completedAt: new Date() }, ruleResults, completed: true, error: undefined };
    } catch (error: unknown) {
      lifecycle.transition('failed');
      const result = createValidationResult([{ path: '', code: 'validation.execution_failed', message: 'Validation execution failed.', severity: 'error' }], metadata);
      return { ...result, context, execution: { ...execution, completedAt: new Date() }, ruleResults: [], completed: false, error };
    }
  },
});
