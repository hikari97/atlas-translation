import type { ID, JsonObject, Nullable } from '../common';

/**
 * Declarative description of an editor tool.
 */
export interface EditorTool {
  readonly id: ID<'editor-tool'>;
  readonly name: string;
  readonly description: Nullable<string>;
  readonly enabled: boolean;
  readonly pluginId: Nullable<ID<'plugin'>>;
  readonly settings?: JsonObject;
}
