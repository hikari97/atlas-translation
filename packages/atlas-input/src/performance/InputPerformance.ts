import type { InputEventModel } from '../foundation';

export interface InputMetrics {
  readonly eventCount: number;
  readonly measuredAt: string;
}

export class EventBuffer {
  private readonly events: InputEventModel[] = [];

  public push(event: InputEventModel): void {
    this.events.push(event);
  }

  public flush(): readonly InputEventModel[] {
    const flushed = this.events.slice();
    this.events.length = 0;
    return flushed;
  }
}

export class InputCache {
  private readonly values = new Map<string, InputEventModel>();

  public set(event: InputEventModel): void {
    this.values.set(event.id, event);
  }

  public get(id: string): InputEventModel | undefined {
    return this.values.get(id);
  }
}

export function measureInput(events: readonly InputEventModel[]): InputMetrics {
  return { eventCount: events.length, measuredAt: new Date().toISOString() };
}
