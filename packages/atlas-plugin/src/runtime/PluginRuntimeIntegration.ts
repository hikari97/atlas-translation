import type { RuntimeContext } from '@atlas/atlas-core';
import { DefaultPluginContext } from '../integration';
import { DefaultPluginManager } from '../manager';
import { PluginRuntime } from './PluginRuntime';

export class PluginRuntimeIntegration {
  public createRuntime(runtimeContext: RuntimeContext): PluginRuntime {
    return new PluginRuntime(
      new DefaultPluginManager(),
      new DefaultPluginContext({ runtime: runtimeContext })
    );
  }
}
