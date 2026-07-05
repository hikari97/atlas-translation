import type { PluginIdentifier } from '../contracts';
import type { PluginLifecycleState } from '../contracts';
import type { PluginValidationIssue } from '../validation';

export interface PluginDiagnostic {
  readonly pluginId: PluginIdentifier;
  readonly state: PluginLifecycleState;
  readonly issues: readonly PluginValidationIssue[];
}
