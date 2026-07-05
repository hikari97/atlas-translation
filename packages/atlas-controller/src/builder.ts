import type { ControllerContract } from './interface';
import type { ControllerLifecycle } from './lifecycle';
import { DefaultControllerLifecycle } from './lifecycle';
import type { ControllerMetadata } from './metadata';
import { DefaultControllerMetadata } from './metadata';
import type { ControllerDescriptor } from './registry';

export interface ControllerDefinition {
  readonly descriptor: ControllerDescriptor;
  readonly controller: ControllerContract;
}

export interface ControllerBuilderState {
  readonly definitions: readonly ControllerDefinition[];
  readonly groups: readonly string[];
}

export interface ControllerBuilderContext {
  readonly metadata: ControllerMetadata;
  readonly lifecycle: ControllerLifecycle;
}

export interface ControllerBuilder {
  controller(descriptor: ControllerDescriptor, controller: ControllerContract): this;
  group(name: string): this;
  build(): readonly ControllerDefinition[];
  buildResult(): { readonly definitions: readonly ControllerDefinition[]; readonly state: ControllerBuilderState; readonly context: ControllerBuilderContext };
}

export class DefaultControllerBuilder implements ControllerBuilder {
  private readonly definitions: ControllerDefinition[] = [];

  private readonly groups: string[] = [];

  public constructor(
    private readonly metadata: ControllerMetadata = new DefaultControllerMetadata('controller-builder', 'Controller Builder', '0.1.0'),
    private readonly lifecycle: ControllerLifecycle = new DefaultControllerLifecycle(),
  ) {}

  public controller(descriptor: ControllerDescriptor, controller: ControllerContract): this {
    this.definitions.push({ descriptor, controller });
    return this;
  }

  public group(name: string): this {
    this.groups.push(name);
    return this;
  }

  public build(): readonly ControllerDefinition[] {
    this.lifecycle.transition('completed');
    return [...this.definitions];
  }

  public buildResult() {
    const definitions = this.build();
    return {
      definitions,
      state: { definitions, groups: [...this.groups] },
      context: { metadata: this.metadata, lifecycle: this.lifecycle },
    };
  }
}

export interface ControllerBuilderFactory {
  create(): ControllerBuilder;
}

export const createControllerBuilderFactory = (): ControllerBuilderFactory => ({
  create: () => new DefaultControllerBuilder(),
});
