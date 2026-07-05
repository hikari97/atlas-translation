import type { MiddlewareContext } from './context';
import type { MiddlewareMetadata } from './metadata';
import type { MiddlewareAttributes } from './shared';

export interface MiddlewareIdentifier {
  readonly id: string;
  readonly name: string;
}

export interface MiddlewareCapabilities {
  readonly asynchronous: boolean;
  readonly shortCircuit: boolean;
  readonly contextMutation: boolean;
}

export interface MiddlewareNext {
  (): Promise<void>;
}

export interface MiddlewareContract {
  readonly metadata: MiddlewareMetadata;
  readonly capabilities: MiddlewareCapabilities;
  handle(context: MiddlewareContext, next: MiddlewareNext): Promise<void>;
}

export const createMiddleware = (
  metadata: MiddlewareMetadata,
  capabilities: MiddlewareCapabilities,
  handle: (context: MiddlewareContext, next: MiddlewareNext) => Promise<void>,
): MiddlewareContract => ({
  metadata,
  capabilities,
  handle,
});

export const createMiddlewareCapability = (
  id: string,
  name: string,
  attributes: MiddlewareAttributes = {},
) => ({
  id,
  name,
  attributes,
});
