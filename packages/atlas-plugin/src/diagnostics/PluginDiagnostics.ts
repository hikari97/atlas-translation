import type { PluginDefinition, PluginIdentifier } from '../contracts';
import { PluginLifecycleState } from '../contracts';
import type { PluginDiagnostic } from './PluginDiagnostic';

export class PluginDiagnostics {
  private readonly diagnostics = new Map<PluginIdentifier, PluginDiagnostic>();

  public record(plugin: PluginDefinition, diagnostic: Omit<PluginDiagnostic, 'pluginId'>): void {
    this.diagnostics.set(plugin.descriptor.id, {
      pluginId: plugin.descriptor.id,
      state: diagnostic.state,
      issues: diagnostic.issues
    });
  }

  public get(pluginId: PluginIdentifier): PluginDiagnostic {
    return (
      this.diagnostics.get(pluginId) ?? {
        pluginId,
        state: PluginLifecycleState.Registered,
        issues: []
      }
    );
  }

  public list(): readonly PluginDiagnostic[] {
    return [...this.diagnostics.values()];
  }
}
