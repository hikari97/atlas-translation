import type { PluginContext, PluginDefinition, PluginIdentifier } from '../contracts';
import { PluginLifecycleState } from '../contracts';
import { PluginError } from '../errors';

export class PluginLifecycleExecutor {
  private readonly states = new Map<PluginIdentifier, PluginLifecycleState>();

  public getState(pluginId: PluginIdentifier): PluginLifecycleState {
    return this.states.get(pluginId) ?? PluginLifecycleState.Registered;
  }

  public async install(plugin: PluginDefinition, context: PluginContext): Promise<void> {
    await this.invoke(plugin, context, 'install', PluginLifecycleState.Installed);
  }

  public async initialize(plugin: PluginDefinition, context: PluginContext): Promise<void> {
    await this.invoke(plugin, context, 'initialize', PluginLifecycleState.Initialized);
  }

  public async activate(plugin: PluginDefinition, context: PluginContext): Promise<void> {
    await this.invoke(plugin, context, 'activate', PluginLifecycleState.Active);
  }

  public async deactivate(plugin: PluginDefinition, context: PluginContext): Promise<void> {
    await this.invoke(plugin, context, 'deactivate', PluginLifecycleState.Deactivated);
  }

  public async dispose(plugin: PluginDefinition, context: PluginContext): Promise<void> {
    await this.invoke(plugin, context, 'dispose', PluginLifecycleState.Disposed);
  }

  private async invoke(
    plugin: PluginDefinition,
    context: PluginContext,
    method: 'install' | 'initialize' | 'activate' | 'deactivate' | 'dispose',
    nextState: PluginLifecycleState
  ): Promise<void> {
    try {
      await plugin[method]?.(context);
      this.states.set(plugin.descriptor.id, nextState);
    } catch (error) {
      this.states.set(plugin.descriptor.id, PluginLifecycleState.Failed);
      throw new PluginError(`Plugin ${method} failed: ${plugin.descriptor.id}`, plugin.descriptor.id, error);
    }
  }
}
