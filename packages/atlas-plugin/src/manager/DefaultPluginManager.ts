import type { PluginContext, PluginDefinition, PluginIdentifier } from '../contracts';
import { PluginDependencyGraph } from '../dependency';
import { PluginDependencyError } from '../errors';
import { PluginLifecycleExecutor } from '../lifecycle';
import { DefaultPluginRegistry, type PluginRegistry } from '../registry';
import type { PluginManager } from './PluginManager';

export class DefaultPluginManager implements PluginManager {
  public constructor(
    private readonly registry: PluginRegistry = new DefaultPluginRegistry(),
    private readonly lifecycle = new PluginLifecycleExecutor()
  ) {}

  public register(plugin: PluginDefinition): void {
    this.registry.register(plugin);
  }

  public unregister(id: PluginIdentifier): boolean {
    return this.registry.unregister(id);
  }

  public list(): readonly PluginDefinition[] {
    return this.registry.getAll();
  }

  public async installAll(context: PluginContext): Promise<void> {
    for (const plugin of this.orderedPlugins()) {
      await this.lifecycle.install(plugin, context);
    }
  }

  public async initializeAll(context: PluginContext): Promise<void> {
    for (const plugin of this.orderedPlugins()) {
      await this.lifecycle.initialize(plugin, context);
    }
  }

  public async activateAll(context: PluginContext): Promise<void> {
    for (const plugin of this.orderedPlugins()) {
      await this.lifecycle.activate(plugin, context);
    }
  }

  public async deactivateAll(context: PluginContext): Promise<void> {
    for (const plugin of this.orderedPlugins().slice().reverse()) {
      await this.lifecycle.deactivate(plugin, context);
    }
  }

  public async disposeAll(context: PluginContext): Promise<void> {
    for (const plugin of this.orderedPlugins().slice().reverse()) {
      await this.lifecycle.dispose(plugin, context);
    }
  }

  private orderedPlugins(): readonly PluginDefinition[] {
    const graph = new PluginDependencyGraph();
    for (const plugin of this.registry.getAll()) {
      graph.add(plugin);
    }
    const validation = graph.validate();
    if (!validation.valid) {
      throw new PluginDependencyError(validation.issues.map((issue) => issue.message).join(' '));
    }
    return graph.sort();
  }
}
