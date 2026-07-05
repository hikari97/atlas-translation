import type { Event, EventBus, EventContext, EventId, EventPublicationResult, EventType } from '@atlas/atlas-events';
import { EventPriority } from '@atlas/atlas-events';
import type { Timestamp } from '@atlas/atlas-types';
import type { InputEventModel } from '../foundation';

export type InputListener = (event: InputEventModel) => void;

export class InputDispatcher {
  private readonly listeners: InputListener[] = [];

  public subscribe(listener: InputListener): void {
    this.listeners.push(listener);
  }

  public dispatch(event: InputEventModel): void {
    for (const listener of this.listeners) {
      listener(event);
    }
  }
}

export function validateInputEvent(event: InputEventModel): boolean {
  return event.id.trim().length > 0 && event.deviceId.trim().length > 0 && event.type.trim().length > 0;
}

export class InputEventPublisher {
  public constructor(private readonly bus: EventBus) {}

  public publish(input: InputEventModel, context: EventContext): Promise<EventPublicationResult> {
    const event: Event = {
      id: `input.${input.id}` as EventId,
      type: 'input.event' as EventType,
      payload: { inputId: input.id, inputType: input.type },
      metadata: { priority: EventPriority.Normal, occurredAt: new Date().toISOString() as Timestamp, correlationId: null }
    };
    return this.bus.publish(event, context);
  }
}

export function diagnoseInputEvents(events: readonly InputEventModel[]): { readonly count: number; readonly valid: boolean } {
  return { count: events.length, valid: events.every(validateInputEvent) };
}
