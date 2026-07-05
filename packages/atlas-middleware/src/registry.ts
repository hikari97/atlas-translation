import type { MiddlewareContract } from './interface';
import type { MiddlewareLifecycle } from './lifecycle';
import type { MiddlewareMetadata } from './metadata';
import type { MiddlewareMutableRegistry, MiddlewareRegistryEntry } from './shared';
import { InMemoryMiddlewareRegistry } from './shared';

export interface MiddlewareDescriptor {
  readonly id: string;
  readonly name: string;
  readonly order: number;
  readonly enabled: boolean;
  readonly attributes: Readonly<Record<string, string | number | boolean | null>>;
}

export interface MiddlewareRegistryMetadata extends MiddlewareMetadata {}

export interface MiddlewareRegistryLifecycle extends MiddlewareLifecycle {}

export interface MiddlewareRegistry extends MiddlewareMutableRegistry<MiddlewareContract> {
  registerMiddleware(entry: MiddlewareRegistryEntry<MiddlewareContract>, descriptor: MiddlewareDescriptor): void;
  descriptors(): readonly MiddlewareDescriptor[];
}

export class DefaultMiddlewareRegistry extends InMemoryMiddlewareRegistry<MiddlewareContract> implements MiddlewareRegistry {
  private readonly descriptorValues = new Map<string, MiddlewareDescriptor>();

  public registerMiddleware(entry: MiddlewareRegistryEntry<MiddlewareContract>, descriptor: MiddlewareDescriptor): void {
    this.register(entry);
    this.descriptorValues.set(descriptor.id, descriptor);
  }

  public override unregister(id: string): void {
    super.unregister(id);
    this.descriptorValues.delete(id);
  }

  public descriptors(): readonly MiddlewareDescriptor[] {
    return Array.from(this.descriptorValues.values()).sort((left, right) => left.order - right.order);
  }
}

export const createMiddlewareRegistry = (): MiddlewareRegistry => new DefaultMiddlewareRegistry();
