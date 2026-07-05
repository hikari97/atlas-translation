import type { ID, JsonValue } from '@atlas/atlas-types';

/**
 * Single deterministic change operation between snapshots.
 */
export interface DiffOperation {
  readonly type: 'add' | 'remove' | 'update' | 'move';
  readonly path: string;
  readonly nodeId: ID | null;
  readonly before: JsonValue | null;
  readonly after: JsonValue | null;
}
