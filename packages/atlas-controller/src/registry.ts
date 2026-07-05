import type { ControllerContract } from './interface';
import type { ControllerLifecycle } from './lifecycle';
import type { ControllerMetadata } from './metadata';
import type { ControllerMutableRegistry, ControllerRegistryEntry } from './shared';
import { InMemoryControllerRegistry } from './shared';

export interface ControllerDescriptor {
  readonly id: string;
  readonly name: string;
  readonly group: string | undefined;
  readonly enabled: boolean;
  readonly attributes: Readonly<Record<string, string | number | boolean | null>>;
}

export interface ControllerRegistryMetadata extends ControllerMetadata {}

export interface ControllerRegistryLifecycle extends ControllerLifecycle {}

export interface ControllerRegistry extends ControllerMutableRegistry<ControllerContract> {
  registerController(entry: ControllerRegistryEntry<ControllerContract>, descriptor: ControllerDescriptor): void;
  descriptors(): readonly ControllerDescriptor[];
}

export class DefaultControllerRegistry extends InMemoryControllerRegistry<ControllerContract> implements ControllerRegistry {
  private readonly descriptorValues = new Map<string, ControllerDescriptor>();

  public registerController(entry: ControllerRegistryEntry<ControllerContract>, descriptor: ControllerDescriptor): void {
    this.register(entry);
    this.descriptorValues.set(descriptor.id, descriptor);
  }

  public override unregister(id: string): void {
    super.unregister(id);
    this.descriptorValues.delete(id);
  }

  public descriptors(): readonly ControllerDescriptor[] {
    return Array.from(this.descriptorValues.values());
  }
}

export const createControllerRegistry = (): ControllerRegistry => new DefaultControllerRegistry();
