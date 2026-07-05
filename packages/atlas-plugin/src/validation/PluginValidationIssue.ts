import type { PluginIdentifier } from '../contracts';

export enum PluginValidationSeverity {
  Error = 'error',
  Warning = 'warning'
}

export interface PluginValidationIssue {
  readonly severity: PluginValidationSeverity;
  readonly message: string;
  readonly pluginId?: PluginIdentifier | undefined;
}
