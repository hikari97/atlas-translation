import type { HttpContext } from './context';
import type { HttpMetadata } from './metadata';
import type { HttpLifecycleRecord } from './shared';

export interface HttpHandlerContext {
  readonly context: HttpContext;
  readonly chain: HttpHandlerChain | undefined;
}

export interface HttpHandlerMetadata extends HttpMetadata {}

export type HttpHandlerLifecycleState = 'initialized' | 'executing' | 'disposed';

export interface HttpHandlerLifecycle extends HttpLifecycleRecord<HttpHandlerLifecycleState> {}

export interface HttpHandler {
  readonly metadata: HttpHandlerMetadata;
  readonly lifecycle: HttpHandlerLifecycle;
  handle(context: HttpContext): Promise<void>;
}

export interface HttpHandlerChain {
  readonly handlers: readonly HttpHandler[];
  next(context: HttpContext): Promise<void>;
}

export class SequentialHttpHandlerChain implements HttpHandlerChain {
  private index = 0;

  public constructor(public readonly handlers: readonly HttpHandler[]) {}

  public async next(context: HttpContext): Promise<void> {
    const handler = this.handlers[this.index];
    if (handler === undefined) {
      return;
    }
    this.index += 1;
    await handler.handle(context);
  }
}

export const createHttpHandlerLifecycle = (now: Date = new Date()): HttpHandlerLifecycle => ({
  state: 'initialized',
  transitions: ['initialized'],
  createdAt: now,
  updatedAt: now,
});
