import type { BoundingBox } from '@atlas/atlas-types';

export enum ResizeAnchor {
  TopLeft = 'top-left',
  Top = 'top',
  TopRight = 'top-right',
  Right = 'right',
  BottomRight = 'bottom-right',
  Bottom = 'bottom',
  BottomLeft = 'bottom-left',
  Left = 'left'
}

export interface ResizeSession {
  readonly id: string;
  readonly initialBounds: BoundingBox;
  readonly currentBounds: BoundingBox;
  readonly anchor: ResizeAnchor;
}

export interface ResizeConstraints {
  readonly minWidth: number;
  readonly minHeight: number;
  readonly maxWidth?: number | undefined;
  readonly maxHeight?: number | undefined;
  readonly lockAspectRatio?: boolean | undefined;
}

export function lockAspectRatio(width: number, height: number, ratio: number): { readonly width: number; readonly height: number } {
  return {
    width,
    height: width / ratio || height
  };
}

export function createResizePreview(bounds: BoundingBox): BoundingBox {
  return { ...bounds };
}
