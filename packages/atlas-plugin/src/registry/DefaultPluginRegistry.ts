import type { PluginDefinition, PluginIdentifier } from '../contracts';
import { DuplicatePluginError } from '../errors';
import type { PluginRegistry } from './PluginRegistry';

export class DefaultPluginRegistry implements PluginRegistry {
  private readonly plugins = new Map<PluginIdentifier, PluginDefinition>();

  public register(plugin: PluginDefinition): void {
    const id = plugin.descriptor.id;
    if (this.plugins.has(id)) {
      throw new DuplicatePluginError(id);
    }
    this.plugins.set(id, plugin);
  }

  public unregister(id: PluginIdentifier): boolean {
    return this.plugins.delete(id);
  }

  public has(id: PluginIdentifier): boolean {
    return this.plugins.has(id);
  }

  public get(id: PluginIdentifier): PluginDefinition | undefined {
    return this.plugins.get(id);
  }

  public getAll(): readonly PluginDefinition[] {
    return [...this.plugins.values()];
  }

  public clear(): void {
    this.plugins.clear();
  }
}
