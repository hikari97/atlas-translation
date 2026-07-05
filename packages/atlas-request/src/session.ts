import type { RequestAttributes, RequestLifecycleRecord, RequestMutableRegistry, RequestRegistryEntry } from './shared';
import { InMemoryRequestRegistry } from './shared';

export interface RequestSessionIdentifier {
  readonly id: string;
}

export interface RequestSessionMetadata {
  readonly identifier: RequestSessionIdentifier;
  readonly attributes: RequestAttributes;
}

export interface RequestSessionLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'expired' | 'disposed'> {}

export interface RequestSessionStore extends RequestMutableRegistry<unknown> {}

export interface RequestSession {
  readonly store: RequestSessionStore;
  readonly lifecycle: RequestSessionLifecycle;
  has(key: string): boolean;
  get<TValue>(key: string): TValue | undefined;
  keys(): readonly string[];
  metadata(): RequestSessionMetadata;
}

export class DefaultRequestSession implements RequestSession {
  public readonly lifecycle: RequestSessionLifecycle;

  public readonly store: RequestSessionStore = new InMemoryRequestRegistry<unknown>();

  public constructor(private readonly sessionMetadata: RequestSessionMetadata, entries: readonly RequestRegistryEntry<unknown>[] = [], now: Date = new Date()) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
    entries.forEach((entry) => this.store.register(entry));
  }

  public has(key: string): boolean {
    return this.store.has(key);
  }

  public get<TValue>(key: string): TValue | undefined {
    return this.store.get(key) as TValue | undefined;
  }

  public keys(): readonly string[] {
    return this.store.entries().map((entry) => entry.id);
  }

  public metadata(): RequestSessionMetadata {
    return this.sessionMetadata;
  }
}
