import type { AtlasDocument } from '@atlas/atlas-document';
import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

export interface EventContext {
  readonly id: ID<'event-context'>;
  readonly document: AtlasDocument | null;
  readonly publishedAt: Timestamp;
  readonly metadata?: JsonObject;
}
