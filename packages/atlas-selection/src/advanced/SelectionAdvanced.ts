import type { Event, EventBus, EventContext, EventId, EventPublicationResult, EventType } from '@atlas/atlas-events';
import { EventPriority } from '@atlas/atlas-events';
import type { SelectionState, Timestamp } from '@atlas/atlas-types';

export class SelectionHistory {
  private readonly entries: SelectionState[] = [];

  public push(state: SelectionState): void {
    this.entries.push(state);
  }

  public list(): readonly SelectionState[] {
    return this.entries.slice();
  }
}

export interface SelectionSnapshot {
  readonly state: SelectionState;
  readonly createdAt: Timestamp;
}

export function createSelectionSnapshot(state: SelectionState): SelectionSnapshot {
  return {
    state,
    createdAt: new Date().toISOString() as Timestamp
  };
}

export class SelectionEventBus {
  public constructor(private readonly bus: EventBus) {}

  public publishSnapshot(snapshot: SelectionSnapshot, context: EventContext): Promise<EventPublicationResult> {
    const event: Event = {
      id: 'selection.snapshot' as EventId,
      type: 'selection.snapshot' as EventType,
      payload: {
        count: snapshot.state.items.length,
        createdAt: snapshot.createdAt
      },
      metadata: {
        priority: EventPriority.Normal,
        occurredAt: new Date().toISOString() as Timestamp,
        correlationId: null
      }
    };
    return this.bus.publish(event, context);
  }
}

export interface SelectionDiagnosticReport {
  readonly selectedCount: number;
  readonly groupCount: number;
  readonly generatedAt: string;
}

export function diagnoseSelection(state: SelectionState): SelectionDiagnosticReport {
  return {
    selectedCount: state.items.length,
    groupCount: state.groups.length,
    generatedAt: new Date().toISOString()
  };
}

export interface SelectionPerformanceMetrics {
  readonly selectedCount: number;
  readonly measuredAt: string;
}

export function measureSelectionPerformance(state: SelectionState): SelectionPerformanceMetrics {
  return {
    selectedCount: state.items.length,
    measuredAt: new Date().toISOString()
  };
}
