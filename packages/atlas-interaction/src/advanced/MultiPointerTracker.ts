import type { PointerEventModel } from '../pointer';

export class MultiPointerTracker {
  private readonly pointers = new Map<string, PointerEventModel>();

  public update(pointer: PointerEventModel): void {
    this.pointers.set(pointer.pointerId, pointer);
  }

  public count(): number {
    return this.pointers.size;
  }

  public list(): readonly PointerEventModel[] {
    return [...this.pointers.values()];
  }
}
