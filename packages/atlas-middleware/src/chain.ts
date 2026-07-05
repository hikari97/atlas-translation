import type { MiddlewareContract } from './interface';
import type { MiddlewareLifecycle } from './lifecycle';
import type { MiddlewareMetadata } from './metadata';

export interface MiddlewareChainNode {
  readonly index: number;
  readonly middleware: MiddlewareContract;
}

export interface MiddlewareChainCursor {
  readonly index: number;
  readonly done: boolean;
}

export interface MiddlewareChainMetadata extends MiddlewareMetadata {}

export interface MiddlewareChainLifecycle extends MiddlewareLifecycle {}

export interface MiddlewareChain {
  readonly nodes: readonly MiddlewareChainNode[];
  readonly metadata: MiddlewareChainMetadata;
  readonly lifecycle: MiddlewareChainLifecycle;
  current(cursor: MiddlewareChainCursor): MiddlewareChainNode | undefined;
  next(cursor: MiddlewareChainCursor): MiddlewareChainCursor;
  cursor(): MiddlewareChainCursor;
}

export const createMiddlewareChain = (
  middleware: readonly MiddlewareContract[],
  metadata: MiddlewareChainMetadata,
  lifecycle: MiddlewareChainLifecycle,
): MiddlewareChain => {
  const nodes = middleware.map((entry, index) => ({ index, middleware: entry }));
  return {
    nodes,
    metadata,
    lifecycle,
    current: (cursor) => nodes[cursor.index],
    next: (cursor) => {
      const index = cursor.index + 1;
      return {
        index,
        done: index >= nodes.length,
      };
    },
    cursor: () => ({
      index: 0,
      done: nodes.length === 0,
    }),
  };
};
