import type { PluginContext } from '../contracts';
import type { PluginManager } from '../manager';

export class PluginRuntime {
  public constructor(
    private readonly manager: PluginManager,
    private readonly context: PluginContext
  ) {}

  public async initialize(): Promise<void> {
    await this.manager.installAll(this.context);
    await this.manager.initializeAll(this.context);
  }

  public async start(): Promise<void> {
    await this.manager.activateAll(this.context);
  }

  public async stop(): Promise<void> {
    await this.manager.deactivateAll(this.context);
  }

  public async dispose(): Promise<void> {
    await this.manager.disposeAll(this.context);
  }
}
