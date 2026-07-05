import type { ID, JsonObject, Point, Timestamp } from '@atlas/atlas-types';
import type { RuntimeContext } from '@atlas/atlas-core';

export type InteractionId = ID<'interaction'>;
export type InteractionSessionId = ID<'interaction-session'>;

export enum InteractionType {
  Pointer = 'pointer',
  Mouse = 'mouse',
  Keyboard = 'keyboard',
  Drag = 'drag',
  Drop = 'drop',
  Resize = 'resize',
  Gesture = 'gesture',
  Accessibility = 'accessibility',
  Custom = 'custom'
}

export enum InteractionPhase {
  Idle = 'idle',
  Started = 'started',
  Updated = 'updated',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface InteractionContext {
  readonly runtime: RuntimeContext | null;
  readonly metadata?: JsonObject | undefined;
}

export interface InteractionState {
  readonly id: InteractionId;
  readonly type: InteractionType;
  readonly phase: InteractionPhase;
  readonly position?: Point | undefined;
  readonly startedAt: Timestamp;
  readonly updatedAt: Timestamp;
  readonly metadata?: JsonObject | undefined;
}

export interface InteractionSession {
  readonly id: InteractionSessionId;
  readonly state: InteractionState;
  readonly context: InteractionContext;
}

export function createInteractionState(id: InteractionId, type: InteractionType, phase: InteractionPhase): InteractionState {
  const timestamp = new Date().toISOString() as Timestamp;
  return {
    id,
    type,
    phase,
    startedAt: timestamp,
    updatedAt: timestamp
  };
}
