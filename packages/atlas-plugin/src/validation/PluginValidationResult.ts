import type { PluginValidationIssue } from './PluginValidationIssue';

export interface PluginValidationResult {
  readonly valid: boolean;
  readonly issues: readonly PluginValidationIssue[];
}

export function createValidationResult(issues: readonly PluginValidationIssue[]): PluginValidationResult {
  return {
    valid: issues.every((issue) => issue.severity !== 'error'),
    issues
  };
}
