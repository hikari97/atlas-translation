import type { PluginContext } from './PluginContext';

export enum PluginLifecycleState {
  Registered = 'registered',
  Installed = 'installed',
  Initialized = 'initialized',
  Active = 'active',
  Deactivated = 'deactivated',
  Disposed = 'disposed',
  Failed = 'failed'
}

export interface PluginLifecycle {
  install?: ((context: PluginContext) => void | Promise<void>) | undefined;
  initialize?: ((context: PluginContext) => void | Promise<void>) | undefined;
  activate?: ((context: PluginContext) => void | Promise<void>) | undefined;
  deactivate?: ((context: PluginContext) => void | Promise<void>) | undefined;
  dispose?: ((context: PluginContext) => void | Promise<void>) | undefined;
}
