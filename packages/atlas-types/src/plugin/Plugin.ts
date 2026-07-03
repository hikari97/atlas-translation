import type { ID } from '../common';
import type { PluginManifest } from './PluginManifest';
import type { PluginMetadata } from './PluginMetadata';

/**
 * Plugin metadata and declared integration surface.
 */
export interface Plugin {
  readonly id: ID<'plugin'>;
  readonly manifest: PluginManifest;
  readonly metadata: PluginMetadata;
  readonly assetIds: readonly ID<'asset'>[];
  readonly enabled: boolean;
}
