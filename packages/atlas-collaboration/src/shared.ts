import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';
import type { CollaborationUserId, SharedDocumentId } from './core';

export enum SynchronizationState {
  Idle = 'idle',
  Syncing = 'syncing',
  Synchronized = 'synchronized',
  Conflicted = 'conflicted',
  Failed = 'failed'
}

export interface SharedDocument {
  readonly id: SharedDocumentId;
  readonly version: number;
  readonly checksum: string;
  readonly metadata: JsonObject;
}

export interface SynchronizationSnapshot {
  readonly documentId: SharedDocumentId;
  readonly state: SynchronizationState;
  readonly version: number;
  readonly synchronizedAt: Timestamp | null;
  readonly metadata: JsonObject;
}

export enum ConflictResolutionStrategy {
  Manual = 'manual',
  LocalWins = 'local-wins',
  RemoteWins = 'remote-wins',
  Merge = 'merge'
}

export interface ConflictResolution {
  readonly id: ID<'collaboration-conflict'>;
  readonly documentId: SharedDocumentId;
  readonly strategy: ConflictResolutionStrategy;
  readonly resolvedBy: CollaborationUserId | null;
  readonly metadata: JsonObject;
}

export interface SharedClipboardItem {
  readonly id: ID<'shared-clipboard-item'>;
  readonly ownerId: CollaborationUserId;
  readonly mimeType: string;
  readonly payload: JsonObject;
  readonly createdAt: Timestamp;
}

export interface SharedClipboard {
  readonly items: readonly SharedClipboardItem[];
}

export function createSharedDocument(id: SharedDocumentId, checksum: string, metadata: JsonObject = {}): SharedDocument {
  return { id, version: 1, checksum, metadata };
}

export function createSynchronizationSnapshot(document: SharedDocument, state: SynchronizationState): SynchronizationSnapshot {
  return {
    documentId: document.id,
    state,
    version: document.version,
    synchronizedAt: state === SynchronizationState.Synchronized ? new Date().toISOString() as Timestamp : null,
    metadata: {}
  };
}
