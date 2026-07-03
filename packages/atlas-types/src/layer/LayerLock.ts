/**
 * Lock flags that constrain layer editing.
 */
export interface LayerLock {
  readonly isLocked: boolean;
  readonly isPositionLocked: boolean;
  readonly isStyleLocked: boolean;
  readonly isContentLocked: boolean;
}
