import type { HttpLifecycleRecord, HttpMutableRegistry, HttpRegistryEntry } from './shared';
import { InMemoryHttpRegistry } from './shared';
import type { HttpMetadata } from './metadata';

export interface HttpContextMetadata extends HttpMetadata {}

export interface HttpContextLifecycle extends HttpLifecycleRecord<'created' | 'initialized' | 'disposed'> {}

export interface HttpContextStore {
  has(key: string): boolean;
  get<TValue>(key: string): TValue | undefined;
  set<TValue>(key: string, value: TValue): void;
  remove(key: string): void;
  entries(): readonly HttpRegistryEntry<unknown>[];
}

export interface HttpContextServices extends HttpMutableRegistry<unknown> {}

export interface HttpContext {
  readonly metadata: HttpContextMetadata;
  readonly lifecycle: HttpContextLifecycle;
  readonly services: HttpContextServices;
  readonly store: HttpContextStore;
}

export class DefaultHttpContextStore implements HttpContextStore {
  private readonly values = new InMemoryHttpRegistry<unknown>();

  public has(key: string): boolean {
    return this.values.has(key);
  }

  public get<TValue>(key: string): TValue | undefined {
    return this.values.get(key) as TValue | undefined;
  }

  public set<TValue>(key: string, value: TValue): void {
    this.values.register({ id: key, name: key, value });
  }

  public remove(key: string): void {
    this.values.remove(key);
  }

  public entries(): readonly HttpRegistryEntry<unknown>[] {
    return this.values.entries();
  }
}

export const createHttpContext = (
  metadata: HttpContextMetadata,
  services: HttpContextServices = new InMemoryHttpRegistry<unknown>(),
  store: HttpContextStore = new DefaultHttpContextStore(),
  now: Date = new Date(),
): HttpContext => ({
  metadata,
  services,
  store,
  lifecycle: {
    state: 'initialized',
    transitions: ['created', 'initialized'],
    createdAt: now,
    updatedAt: now,
  },
});
