import type { Point } from '@atlas/atlas-types';

export enum GestureType {
  Pan = 'pan',
  Zoom = 'zoom',
  Rotate = 'rotate',
  LongPress = 'long-press'
}

export interface Gesture {
  readonly type: GestureType;
  readonly origin: Point;
  readonly delta: Point;
  readonly scale: number;
  readonly rotation: number;
}

export class GestureRecognizer {
  public pan(origin: Point, delta: Point): Gesture {
    return { type: GestureType.Pan, origin, delta, scale: 1, rotation: 0 };
  }

  public zoom(origin: Point, scale: number): Gesture {
    return { type: GestureType.Zoom, origin, delta: { x: 0, y: 0 }, scale, rotation: 0 };
  }

  public rotate(origin: Point, rotation: number): Gesture {
    return { type: GestureType.Rotate, origin, delta: { x: 0, y: 0 }, scale: 1, rotation };
  }

  public longPress(origin: Point): Gesture {
    return { type: GestureType.LongPress, origin, delta: { x: 0, y: 0 }, scale: 1, rotation: 0 };
  }
}
