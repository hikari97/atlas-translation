import type { Point } from '@atlas/atlas-types';

export enum MouseButton {
  Primary = 'primary',
  Secondary = 'secondary',
  Auxiliary = 'auxiliary'
}

export interface MouseInteraction {
  readonly position: Point;
  readonly button: MouseButton;
}

export function createClickInteraction(position: Point, button: MouseButton = MouseButton.Primary): MouseInteraction {
  return { position, button };
}

export function isDoubleClick(previousAt: number, nextAt: number, thresholdMs = 300): boolean {
  return nextAt - previousAt <= thresholdMs;
}

export function createHoverInteraction(position: Point): MouseInteraction {
  return { position, button: MouseButton.Primary };
}

export function createContextInteraction(position: Point): MouseInteraction {
  return { position, button: MouseButton.Secondary };
}
