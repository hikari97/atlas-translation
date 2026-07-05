import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

export type CollaborationSessionId = ID<'collaboration-session'>;
export type CollaborationUserId = ID<'collaboration-user'>;
export type CollaborationServiceId = ID<'collaboration-service'>;
export type SharedDocumentId = ID<'shared-document'>;

export enum CollaborationLifecycle {
  Created = 'created',
  Active = 'active',
  Suspended = 'suspended',
  Closed = 'closed',
  Archived = 'archived'
}

export interface CollaborationMetadata {
  readonly id: string;
  readonly name: string;
  readonly createdAt: Timestamp;
  readonly metadata: JsonObject;
}

export interface CollaborationContext {
  readonly sessionId: CollaborationSessionId | null;
  readonly actorId: CollaborationUserId | null;
  readonly metadata: JsonObject;
}

export interface CollaborationService {
  readonly id: CollaborationServiceId;
  readonly capability: string;
  readonly metadata: JsonObject;
}

export class CollaborationRegistry {
  private readonly services = new Map<CollaborationServiceId, CollaborationService>();

  public register(service: CollaborationService): void {
    this.services.set(service.id, service);
  }

  public get(id: CollaborationServiceId): CollaborationService | null {
    return this.services.get(id) ?? null;
  }

  public list(): readonly CollaborationService[] {
    return [...this.services.values()];
  }
}

export interface CollaborationCore {
  readonly registry: CollaborationRegistry;
  readonly context: CollaborationContext;
  readonly lifecycle: CollaborationLifecycle;
  readonly metadata: CollaborationMetadata;
}

export function createCollaborationCore(metadata: CollaborationMetadata, context: CollaborationContext): CollaborationCore {
  return {
    registry: new CollaborationRegistry(),
    context,
    lifecycle: CollaborationLifecycle.Created,
    metadata
  };
}

export interface CollaborationSession {
  readonly id: CollaborationSessionId;
  readonly documentId: SharedDocumentId;
  readonly participantIds: readonly CollaborationUserId[];
  readonly lifecycle: CollaborationLifecycle;
  readonly metadata: JsonObject;
}

export function createCollaborationSession(id: CollaborationSessionId, documentId: SharedDocumentId, metadata: JsonObject = {}): CollaborationSession {
  return { id, documentId, participantIds: [], lifecycle: CollaborationLifecycle.Created, metadata };
}
