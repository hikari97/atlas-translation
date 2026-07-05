import { PointerCapture, PointerDeviceType, type PointerEventModel } from '@atlas/atlas-interaction';

export class PointerManager {
  private readonly pointers = new Map<string, PointerEventModel>();

  public update(event: PointerEventModel): void {
    this.pointers.set(event.pointerId, event);
  }

  public state(): readonly PointerEventModel[] {
    return [...this.pointers.values()];
  }
}

export class WheelManager {
  private totalDelta = 0;

  public record(delta: number): void {
    this.totalDelta += delta;
  }

  public total(): number {
    return this.totalDelta;
  }
}

export { PointerCapture, PointerDeviceType, type PointerEventModel };
