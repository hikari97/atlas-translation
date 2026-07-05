import type { ValidationContext } from './context';
import type { ValidationMetadata } from './metadata';

export interface ValidationIssue {
  readonly path: string;
  readonly code: string;
  readonly message: string;
  readonly severity: 'error' | 'warning' | 'info';
}

export interface ValidationResult {
  readonly valid: boolean;
  readonly issues: readonly ValidationIssue[];
  readonly metadata: ValidationMetadata;
}

export interface ValidationCapabilities {
  readonly asynchronous: boolean;
  readonly ruleComposition: boolean;
  readonly contextAware: boolean;
}

export interface ValidationContract<TInput = unknown> {
  readonly metadata: ValidationMetadata;
  readonly capabilities: ValidationCapabilities;
  validate(context: ValidationContext<TInput>): Promise<ValidationResult>;
}

export const createValidationResult = (
  issues: readonly ValidationIssue[],
  metadata: ValidationMetadata,
): ValidationResult => ({ valid: issues.length === 0, issues: [...issues], metadata });

export const createValidation = <TInput>(
  metadata: ValidationMetadata,
  capabilities: ValidationCapabilities,
  validate: (context: ValidationContext<TInput>) => Promise<ValidationResult>,
): ValidationContract<TInput> => ({ metadata, capabilities, validate });
