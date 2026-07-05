import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

export type HistoryEntryId = ID<'history-entry'>;
export type HistorySnapshotId = ID<'history-snapshot'>;
export type HistoryBranchId = ID<'history-branch'>;

export interface HistorySnapshot {
  readonly id: HistorySnapshotId;
  readonly state: JsonObject;
  readonly createdAt: Timestamp;
}

export interface HistoryEntry {
  readonly id: HistoryEntryId;
  readonly label: string;
  readonly snapshot: HistorySnapshot;
  readonly metadata?: JsonObject | undefined;
}

export interface HistoryState {
  readonly entries: readonly HistoryEntry[];
  readonly cursor: number;
  readonly limit: number;
}

export interface HistoryBranch {
  readonly id: HistoryBranchId;
  readonly name: string;
  readonly entries: readonly HistoryEntry[];
}

export function createHistorySnapshot(id: string, state: JsonObject): HistorySnapshot {
  return { id: id as HistorySnapshotId, state, createdAt: new Date().toISOString() as Timestamp };
}

export function createHistoryEntry(id: string, label: string, state: JsonObject): HistoryEntry {
  return { id: id as HistoryEntryId, label, snapshot: createHistorySnapshot(`${id}:snapshot`, state) };
}

export function createHistoryState(limit = 100): HistoryState {
  return { entries: [], cursor: -1, limit };
}
