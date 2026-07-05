import { GestureRecognizer, type Gesture } from '@atlas/atlas-interaction';
import type { Point } from '@atlas/atlas-types';

export class GestureManager {
  private readonly recognizer = new GestureRecognizer();

  public drag(origin: Point, delta: Point): Gesture {
    return this.recognizer.pan(origin, delta);
  }

  public pinch(origin: Point, scale: number): Gesture {
    return this.recognizer.zoom(origin, scale);
  }

  public rotate(origin: Point, rotation: number): Gesture {
    return this.recognizer.rotate(origin, rotation);
  }
}
