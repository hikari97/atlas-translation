import type { Event, EventBus, EventContext, EventId, EventPublicationResult, EventType } from '@atlas/atlas-events';
import { EventPriority } from '@atlas/atlas-events';
import type { Timestamp } from '@atlas/atlas-types';
import type { HistoryState } from '../model';

export interface HistoryDiagnosticReport {
  readonly entryCount: number;
  readonly cursor: number;
  readonly generatedAt: string;
}

export function validateHistory(state: HistoryState): boolean {
  return state.cursor < state.entries.length && state.limit > 0;
}

export function diagnoseHistory(state: HistoryState): HistoryDiagnosticReport {
  return { entryCount: state.entries.length, cursor: state.cursor, generatedAt: new Date().toISOString() };
}

export type HistoryListener = (state: HistoryState) => void;

export class HistoryDispatcher {
  private readonly listeners: HistoryListener[] = [];

  public subscribe(listener: HistoryListener): void {
    this.listeners.push(listener);
  }

  public dispatch(state: HistoryState): void {
    for (const listener of this.listeners) {
      listener(state);
    }
  }
}

export class HistoryEventPublisher {
  public constructor(private readonly bus: EventBus) {}

  public publish(state: HistoryState, context: EventContext): Promise<EventPublicationResult> {
    const event: Event = {
      id: 'history.changed' as EventId,
      type: 'history.changed' as EventType,
      payload: { count: state.entries.length, cursor: state.cursor },
      metadata: { priority: EventPriority.Normal, occurredAt: new Date().toISOString() as Timestamp, correlationId: null }
    };
    return this.bus.publish(event, context);
  }
}
