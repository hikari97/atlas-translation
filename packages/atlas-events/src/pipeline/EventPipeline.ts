import type { EventBehavior } from '../behavior';

export class EventPipeline {
  private readonly behaviors: EventBehavior[] = [];

  public add(behavior: EventBehavior): void {
    this.behaviors.push(behavior);
  }

  public list(): readonly EventBehavior[] {
    return [...this.behaviors];
  }
}
