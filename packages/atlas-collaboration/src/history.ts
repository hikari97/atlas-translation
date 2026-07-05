import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { CollaborationLifecycle, CollaborationSessionId } from './core';
import type { CollaborationEvent } from './events';

export interface HistoryMetadata {
  readonly sessionId: CollaborationSessionId;
  readonly metadata: JsonObject;
}

export interface HistoryEntry {
  readonly id: ID<'collaboration-history-entry'>;
  readonly event: CollaborationEvent;
  readonly recordedAt: Timestamp;
}

export interface HistoryTimeline {
  readonly entries: readonly HistoryEntry[];
}

export interface CollaborationHistory {
  readonly timeline: HistoryTimeline;
  readonly lifecycle: CollaborationLifecycle;
  readonly metadata: HistoryMetadata;
}

export type HistoryLifecycle = CollaborationLifecycle;

export function createHistoryEntry(id: ID<'collaboration-history-entry'>, event: CollaborationEvent): HistoryEntry {
  return { id, event, recordedAt: new Date().toISOString() as Timestamp };
}

export function appendHistory(timeline: HistoryTimeline, entry: HistoryEntry): HistoryTimeline {
  return { entries: [...timeline.entries, entry] };
}
