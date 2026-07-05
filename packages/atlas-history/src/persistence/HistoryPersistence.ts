import type { JsonObject } from '@atlas/atlas-types';
import type { HistoryState } from '../model';

export interface HistoryMetadata {
  readonly version: string;
  readonly migratedAt?: string | undefined;
}

export interface SerializedHistory {
  readonly metadata: HistoryMetadata;
  readonly state: HistoryState;
}

export function serializeHistory(state: HistoryState, metadata: HistoryMetadata = { version: '0.1.0' }): string {
  return JSON.stringify({ metadata, state });
}

export function deserializeHistory(serialized: string): SerializedHistory {
  return JSON.parse(serialized) as SerializedHistory;
}

export function migrateHistory(serialized: SerializedHistory, version: string): SerializedHistory {
  return { ...serialized, metadata: { version, migratedAt: new Date().toISOString() } };
}

export class InMemoryHistoryStorage {
  private readonly values = new Map<string, string>();

  public set(key: string, value: string): void {
    this.values.set(key, value);
  }

  public get(key: string): string | undefined {
    return this.values.get(key);
  }
}

export function createHistoryMetadata(custom: JsonObject = {}): JsonObject {
  return { version: '0.1.0', ...custom };
}
