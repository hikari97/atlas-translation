import type { MiddlewareLifecycle } from './lifecycle';
import type { MiddlewareAttributes, MiddlewareMutableRegistry } from './shared';
import { InMemoryMiddlewareRegistry } from './shared';

export interface MiddlewareCapability {
  readonly id: string;
  readonly name: string;
  readonly attributes: MiddlewareAttributes;
}

export interface MiddlewareMetadataEntry<TValue = unknown> {
  readonly key: string;
  readonly value: TValue;
  readonly attributes: MiddlewareAttributes;
}

export interface MiddlewareMetadataCollection {
  has(key: string): boolean;
  get<TValue = unknown>(key: string): MiddlewareMetadataEntry<TValue> | undefined;
  set<TValue>(entry: MiddlewareMetadataEntry<TValue>): void;
  remove(key: string): void;
  entries(): readonly MiddlewareMetadataEntry[];
}

export interface MiddlewareMetadataRegistry extends MiddlewareMutableRegistry<MiddlewareMetadataEntry> {}

export interface MiddlewareMetadataLifecycle extends MiddlewareLifecycle {}

export interface MiddlewareMetadata extends MiddlewareMetadataCollection {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly capabilities: readonly MiddlewareCapability[];
  readonly attributes: MiddlewareAttributes;
}

export class DefaultMiddlewareMetadata implements MiddlewareMetadata {
  private readonly values = new Map<string, MiddlewareMetadataEntry>();

  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly version: string,
    public readonly capabilities: readonly MiddlewareCapability[] = [],
    public readonly attributes: MiddlewareAttributes = {},
    entries: readonly MiddlewareMetadataEntry[] = [],
  ) {
    entries.forEach((entry) => this.set(entry));
  }

  public has(key: string): boolean {
    return this.values.has(key);
  }

  public get<TValue = unknown>(key: string): MiddlewareMetadataEntry<TValue> | undefined {
    return this.values.get(key) as MiddlewareMetadataEntry<TValue> | undefined;
  }

  public set<TValue>(entry: MiddlewareMetadataEntry<TValue>): void {
    this.values.set(entry.key, entry);
  }

  public remove(key: string): void {
    this.values.delete(key);
  }

  public entries(): readonly MiddlewareMetadataEntry[] {
    return Array.from(this.values.values());
  }
}

export const createMiddlewareMetadataRegistry = (): MiddlewareMetadataRegistry =>
  new InMemoryMiddlewareRegistry<MiddlewareMetadataEntry>();
