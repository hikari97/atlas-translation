import type { ValidationContext } from './context';
import type { ValidationResult } from './interface';
import { createValidationResult } from './interface';
import type { ValidationLifecycle } from './lifecycle';
import type { ValidationMetadata } from './metadata';

export interface ValidationRuleMetadata extends ValidationMetadata {}

export interface ValidationRuleLifecycle extends ValidationLifecycle {}

export interface ValidationRuleResult extends ValidationResult {
  readonly ruleId: string;
}

export interface ValidationRule<TInput = unknown> {
  readonly metadata: ValidationRuleMetadata;
  readonly lifecycle: ValidationRuleLifecycle;
  validate(context: ValidationContext<TInput>): Promise<ValidationRuleResult>;
}

export interface ValidationRuleCollection<TInput = unknown> {
  readonly rules: readonly ValidationRule<TInput>[];
  add(rule: ValidationRule<TInput>): ValidationRuleCollection<TInput>;
  entries(): readonly ValidationRule<TInput>[];
}

export const createValidationRule = <TInput>(
  metadata: ValidationRuleMetadata,
  lifecycle: ValidationRuleLifecycle,
  validate: (context: ValidationContext<TInput>) => Promise<ValidationResult>,
): ValidationRule<TInput> => ({
  metadata,
  lifecycle,
  async validate(context) {
    const result = await validate(context);
    return { ...result, ruleId: metadata.id };
  },
});

export const createValidationRuleCollection = <TInput>(
  rules: readonly ValidationRule<TInput>[] = [],
): ValidationRuleCollection<TInput> => ({
  rules: [...rules],
  add: (rule) => createValidationRuleCollection([...rules, rule]),
  entries: () => [...rules],
});

export const createValidRuleResult = (ruleId: string, metadata: ValidationMetadata): ValidationRuleResult => ({
  ...createValidationResult([], metadata),
  ruleId,
});
