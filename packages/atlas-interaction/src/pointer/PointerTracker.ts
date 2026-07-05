import type { PointerEventModel } from './PointerTypes';

export class PointerTracker {
  private readonly pointers = new Map<string, PointerEventModel>();

  public update(event: PointerEventModel): void {
    this.pointers.set(event.pointerId, event);
  }

  public remove(pointerId: string): boolean {
    return this.pointers.delete(pointerId);
  }

  public list(): readonly PointerEventModel[] {
    return [...this.pointers.values()];
  }
}
