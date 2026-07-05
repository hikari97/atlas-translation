import type { BoundingBox, Point } from '@atlas/atlas-types';

export enum PointerDeviceType {
  Mouse = 'mouse',
  Touch = 'touch',
  Pen = 'pen'
}

export interface PointerEventModel {
  readonly pointerId: string;
  readonly deviceType: PointerDeviceType;
  readonly position: Point;
  readonly pressure: number;
}

export interface HitTestTarget {
  readonly id: string;
  readonly bounds: BoundingBox;
}
