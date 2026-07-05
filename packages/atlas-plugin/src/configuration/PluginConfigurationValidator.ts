import type { PluginConfigurationSchema } from '../contracts';
import {
  createValidationResult,
  PluginValidationSeverity,
  type PluginValidationIssue,
  type PluginValidationResult
} from '../validation';

export class PluginConfigurationValidator {
  public validate(schema: PluginConfigurationSchema): PluginValidationResult {
    const issues: PluginValidationIssue[] = [];
    for (const key of schema.requiredKeys ?? []) {
      if (!(key in schema.defaults)) {
        issues.push({
          severity: PluginValidationSeverity.Error,
          message: `Required configuration key is missing from defaults: ${key}.`
        });
      }
    }
    return createValidationResult(issues);
  }
}
