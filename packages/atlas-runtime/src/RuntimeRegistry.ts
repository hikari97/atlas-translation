import type { RuntimeRegistryEntry } from './RuntimeRegistryEntry';
import type { RuntimeRegistryKey } from './RuntimeRegistryKey';
import type { RuntimeRegistryMetadata } from './RuntimeRegistryMetadata';
import type { RuntimeRegistrySnapshot } from './RuntimeRegistrySnapshot';

export interface RuntimeRegistry<TValue> {
  readonly metadata: RuntimeRegistryMetadata;
  register(entry: RuntimeRegistryEntry<TValue>): void;
  unregister(key: RuntimeRegistryKey): void;
  has(key: RuntimeRegistryKey): boolean;
  resolve(key: RuntimeRegistryKey): RuntimeRegistryEntry<TValue> | undefined;
  snapshot(): RuntimeRegistrySnapshot<TValue>;
}

export class InMemoryRuntimeRegistry<TValue> implements RuntimeRegistry<TValue> {
  private readonly values = new Map<RuntimeRegistryKey, RuntimeRegistryEntry<TValue>>();

  public constructor(public readonly metadata: RuntimeRegistryMetadata) {}

  public register(entry: RuntimeRegistryEntry<TValue>): void {
    this.values.set(entry.key, entry);
  }

  public unregister(key: RuntimeRegistryKey): void {
    this.values.delete(key);
  }

  public has(key: RuntimeRegistryKey): boolean {
    return this.values.has(key);
  }

  public resolve(key: RuntimeRegistryKey): RuntimeRegistryEntry<TValue> | undefined {
    return this.values.get(key);
  }

  public snapshot(): RuntimeRegistrySnapshot<TValue> {
    return {
      metadata: this.metadata,
      entries: Array.from(this.values.values()),
      capturedAt: new Date(),
    };
  }
}

export const createRuntimeRegistry = <TValue>(metadata: RuntimeRegistryMetadata): RuntimeRegistry<TValue> =>
  new InMemoryRuntimeRegistry<TValue>(metadata);
