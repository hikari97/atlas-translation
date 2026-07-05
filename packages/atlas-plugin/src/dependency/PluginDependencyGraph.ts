import type { PluginDefinition, PluginIdentifier } from '../contracts';
import { PluginDependencyError } from '../errors';
import {
  createValidationResult,
  PluginValidationSeverity,
  type PluginValidationIssue,
  type PluginValidationResult
} from '../validation';
import { TopologicalSorter } from './TopologicalSorter';

export class PluginDependencyGraph {
  private readonly plugins = new Map<PluginIdentifier, PluginDefinition>();

  public add(plugin: PluginDefinition): void {
    this.plugins.set(plugin.descriptor.id, plugin);
  }

  public remove(pluginId: PluginIdentifier): boolean {
    return this.plugins.delete(pluginId);
  }

  public has(pluginId: PluginIdentifier): boolean {
    return this.plugins.has(pluginId);
  }

  public dependenciesOf(pluginId: PluginIdentifier): readonly PluginIdentifier[] {
    return (this.plugins.get(pluginId)?.descriptor.dependencies ?? []).map((dependency) => dependency.id);
  }

  public dependentsOf(pluginId: PluginIdentifier): readonly PluginIdentifier[] {
    return [...this.plugins.values()]
      .filter((plugin) => this.dependenciesOf(plugin.descriptor.id).includes(pluginId))
      .map((plugin) => plugin.descriptor.id);
  }

  public validate(): PluginValidationResult {
    const issues: PluginValidationIssue[] = [];
    for (const plugin of this.plugins.values()) {
      for (const dependency of plugin.descriptor.dependencies ?? []) {
        if (!dependency.optional && !this.plugins.has(dependency.id)) {
          issues.push({
            severity: PluginValidationSeverity.Error,
            pluginId: plugin.descriptor.id,
            message: `Missing dependency ${dependency.id}.`
          });
        }
      }
    }
    try {
      this.sort();
    } catch (error) {
      if (error instanceof PluginDependencyError) {
        issues.push({
          severity: PluginValidationSeverity.Error,
          pluginId: error.pluginId,
          message: error.message
        });
      } else {
        throw error;
      }
    }
    return createValidationResult(issues);
  }

  public sort(): readonly PluginDefinition[] {
    return new TopologicalSorter().sort([...this.plugins.values()]);
  }
}
