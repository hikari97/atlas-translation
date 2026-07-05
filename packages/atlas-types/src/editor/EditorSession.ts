import type { ID, JsonObject, Nullable, Timestamp } from '../common';

/**
 * Session metadata for an active editor instance.
 */
export interface EditorSession {
  readonly id: ID<'editor-session'>;
  readonly userId: ID<'user'>;
  readonly startedAt: Timestamp;
  readonly lastActiveAt: Timestamp;
  readonly deviceId: Nullable<ID<'device'>>;
  readonly metadata?: JsonObject;
}
