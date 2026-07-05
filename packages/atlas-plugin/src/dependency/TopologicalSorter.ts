import type { PluginDefinition, PluginIdentifier } from '../contracts';
import { PluginDependencyError } from '../errors';

export class TopologicalSorter {
  public sort(plugins: readonly PluginDefinition[]): readonly PluginDefinition[] {
    const byId = new Map<PluginIdentifier, PluginDefinition>();
    const temporary = new Set<PluginIdentifier>();
    const permanent = new Set<PluginIdentifier>();
    const result: PluginDefinition[] = [];

    for (const plugin of plugins) {
      byId.set(plugin.descriptor.id, plugin);
    }

    const visit = (plugin: PluginDefinition): void => {
      const id = plugin.descriptor.id;
      if (permanent.has(id)) {
        return;
      }
      if (temporary.has(id)) {
        throw new PluginDependencyError(`Circular plugin dependency detected at ${id}.`, id);
      }
      temporary.add(id);
      for (const dependency of plugin.descriptor.dependencies ?? []) {
        const dependencyPlugin = byId.get(dependency.id);
        if (dependencyPlugin !== undefined) {
          visit(dependencyPlugin);
        }
      }
      temporary.delete(id);
      permanent.add(id);
      result.push(plugin);
    };

    for (const plugin of plugins) {
      visit(plugin);
    }
    return result;
  }
}
