import type { HistorySnapshot, HistoryState } from '../model';

export interface HistoryMetrics {
  readonly entryCount: number;
  readonly snapshotCount: number;
  readonly measuredAt: string;
}

export class HistorySnapshotCache {
  private readonly snapshots = new Map<string, HistorySnapshot>();

  public set(snapshot: HistorySnapshot): void {
    this.snapshots.set(String(snapshot.id), snapshot);
  }

  public get(id: string): HistorySnapshot | undefined {
    return this.snapshots.get(id);
  }

  public size(): number {
    return this.snapshots.size;
  }
}

export function measureHistory(state: HistoryState, snapshotCount = 0): HistoryMetrics {
  return { entryCount: state.entries.length, snapshotCount, measuredAt: new Date().toISOString() };
}

export function inspectHistory(state: HistoryState): readonly string[] {
  return state.entries.map((entry) => entry.label);
}
