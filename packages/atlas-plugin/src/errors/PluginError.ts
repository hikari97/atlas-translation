import type { PluginIdentifier } from '../contracts';

export class PluginError extends Error {
  public constructor(
    message: string,
    public readonly pluginId?: PluginIdentifier,
    public override readonly cause?: unknown
  ) {
    super(message);
    this.name = 'PluginError';
  }
}
