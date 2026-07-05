import type { ID } from '../common';
import type { HistoryActionRecord } from './HistoryAction';
import type { HistoryActor } from './HistoryActor';
import type { HistoryMetadata } from './HistoryMetadata';
import type { HistorySnapshot } from './HistorySnapshot';
import type { HistoryTag } from './HistoryTag';
import type { HistoryTarget } from './HistoryTarget';

/**
 * Immutable record of a change made to an Atlas entity.
 */
export interface HistoryEntry {
  readonly id: ID<'history-entry'>;
  readonly actor: HistoryActor;
  readonly action: HistoryActionRecord;
  readonly target: HistoryTarget;
  readonly before: HistorySnapshot | null;
  readonly after: HistorySnapshot | null;
  readonly tags: readonly HistoryTag[];
  readonly metadata: HistoryMetadata;
}
