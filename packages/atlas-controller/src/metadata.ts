import type { ControllerLifecycle } from './lifecycle';
import type { ControllerAttributes, ControllerMutableRegistry } from './shared';
import { InMemoryControllerRegistry } from './shared';

export interface ControllerCapability {
  readonly id: string;
  readonly name: string;
  readonly attributes: ControllerAttributes;
}

export interface ControllerMetadataEntry<TValue = unknown> {
  readonly key: string;
  readonly value: TValue;
  readonly attributes: ControllerAttributes;
}

export interface ControllerMetadataCollection {
  has(key: string): boolean;
  get<TValue = unknown>(key: string): ControllerMetadataEntry<TValue> | undefined;
  set<TValue>(entry: ControllerMetadataEntry<TValue>): void;
  remove(key: string): void;
  entries(): readonly ControllerMetadataEntry[];
}

export interface ControllerMetadataLifecycle extends ControllerLifecycle {}

export interface ControllerMetadataRegistry extends ControllerMutableRegistry<ControllerMetadataEntry> {}

export interface ControllerMetadata extends ControllerMetadataCollection {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly capabilities: readonly ControllerCapability[];
  readonly attributes: ControllerAttributes;
}

export class DefaultControllerMetadata implements ControllerMetadata {
  private readonly values = new Map<string, ControllerMetadataEntry>();

  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly version: string,
    public readonly capabilities: readonly ControllerCapability[] = [],
    public readonly attributes: ControllerAttributes = {},
    entries: readonly ControllerMetadataEntry[] = [],
  ) {
    entries.forEach((entry) => this.set(entry));
  }

  public has(key: string): boolean {
    return this.values.has(key);
  }

  public get<TValue = unknown>(key: string): ControllerMetadataEntry<TValue> | undefined {
    return this.values.get(key) as ControllerMetadataEntry<TValue> | undefined;
  }

  public set<TValue>(entry: ControllerMetadataEntry<TValue>): void {
    this.values.set(entry.key, entry);
  }

  public remove(key: string): void {
    this.values.delete(key);
  }

  public entries(): readonly ControllerMetadataEntry[] {
    return Array.from(this.values.values());
  }
}

export const createControllerCapability = (
  id: string,
  name: string,
  attributes: ControllerAttributes = {},
): ControllerCapability => ({ id, name, attributes });

export const createControllerMetadataRegistry = (): ControllerMetadataRegistry =>
  new InMemoryControllerRegistry<ControllerMetadataEntry>();
