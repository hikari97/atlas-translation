import type { PluginDefinition } from '../contracts';
import { PluginValidationSeverity } from './PluginValidationIssue';
import type { PluginValidationIssue } from './PluginValidationIssue';
import { createValidationResult, type PluginValidationResult } from './PluginValidationResult';
import type { PluginValidator } from './PluginValidator';

export class DefaultPluginValidator implements PluginValidator {
  public validate(plugin: PluginDefinition): PluginValidationResult {
    const issues: PluginValidationIssue[] = [];
    if (plugin.descriptor.name.trim().length === 0) {
      issues.push({
        severity: PluginValidationSeverity.Error,
        pluginId: plugin.descriptor.id,
        message: 'Plugin name must not be empty.'
      });
    }
    if (plugin.descriptor.metadata.version.trim().length === 0) {
      issues.push({
        severity: PluginValidationSeverity.Error,
        pluginId: plugin.descriptor.id,
        message: 'Plugin version must not be empty.'
      });
    }
    return createValidationResult(issues);
  }
}
