import type { PluginDefinition } from '../contracts';
import type { PluginValidationResult } from './PluginValidationResult';

export interface PluginValidator {
  validate(plugin: PluginDefinition): PluginValidationResult;
}
