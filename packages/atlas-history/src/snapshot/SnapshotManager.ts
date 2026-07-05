import type { JsonObject } from '@atlas/atlas-types';
import { createHistorySnapshot, type HistorySnapshot } from '../model';

export class SnapshotManager {
  private readonly snapshots = new Map<string, HistorySnapshot>();

  public create(id: string, state: JsonObject): HistorySnapshot {
    const snapshot = createHistorySnapshot(id, state);
    this.snapshots.set(id, snapshot);
    return snapshot;
  }

  public get(id: string): HistorySnapshot | undefined {
    return this.snapshots.get(id);
  }

  public restore(id: string): JsonObject | null {
    return this.snapshots.get(id)?.state ?? null;
  }

  public validate(snapshot: HistorySnapshot): boolean {
    return String(snapshot.id).trim().length > 0;
  }
}

export function serializeSnapshot(snapshot: HistorySnapshot): string {
  return JSON.stringify(snapshot);
}

export function deserializeSnapshot(serialized: string): HistorySnapshot {
  return JSON.parse(serialized) as HistorySnapshot;
}
