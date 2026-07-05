import type { MiddlewareContract } from './interface';
import type { MiddlewareLifecycle } from './lifecycle';
import { DefaultMiddlewareLifecycle } from './lifecycle';
import type { MiddlewareMetadata } from './metadata';
import { DefaultMiddlewareMetadata } from './metadata';
import type { MiddlewarePipeline } from './pipeline';
import { createMiddlewarePipeline } from './pipeline';

export interface MiddlewareBuilderState {
  readonly middleware: readonly MiddlewareContract[];
  readonly groups: readonly string[];
}

export interface MiddlewareBuilderContext {
  readonly metadata: MiddlewareMetadata;
  readonly lifecycle: MiddlewareLifecycle;
}

export interface MiddlewareBuilderResult {
  readonly pipeline: MiddlewarePipeline;
  readonly state: MiddlewareBuilderState;
  readonly context: MiddlewareBuilderContext;
}

export interface MiddlewareBuilder {
  use(middleware: MiddlewareContract): this;
  group(name: string): this;
  build(): MiddlewarePipeline;
  buildResult(): MiddlewareBuilderResult;
}

export class DefaultMiddlewareBuilder implements MiddlewareBuilder {
  private readonly middleware: MiddlewareContract[] = [];

  private readonly groups: string[] = [];

  public constructor(
    private readonly metadata: MiddlewareMetadata = new DefaultMiddlewareMetadata('middleware-pipeline', 'Middleware Pipeline', '0.1.0'),
    private readonly lifecycle: MiddlewareLifecycle = new DefaultMiddlewareLifecycle(),
  ) {}

  public use(middleware: MiddlewareContract): this {
    this.middleware.push(middleware);
    return this;
  }

  public group(name: string): this {
    this.groups.push(name);
    return this;
  }

  public build(): MiddlewarePipeline {
    this.lifecycle.transition('ready');
    return createMiddlewarePipeline(this.metadata, this.lifecycle, this.middleware);
  }

  public buildResult(): MiddlewareBuilderResult {
    return {
      pipeline: this.build(),
      state: {
        middleware: [...this.middleware],
        groups: [...this.groups],
      },
      context: {
        metadata: this.metadata,
        lifecycle: this.lifecycle,
      },
    };
  }
}

export interface MiddlewareBuilderFactory {
  create(): MiddlewareBuilder;
}

export const createMiddlewareBuilderFactory = (): MiddlewareBuilderFactory => ({
  create: () => new DefaultMiddlewareBuilder(),
});
