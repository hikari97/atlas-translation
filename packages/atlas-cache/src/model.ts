// Atlas Cache System - Provider-independent caching contracts.

export type CacheDiagnosticSeverity = 'info' | 'warning' | 'error';
export type CacheExpirationPolicy = 'ttl' | 'idle' | 'sliding';

export interface CacheDiagnostic { readonly code: string; readonly message: string; readonly severity: CacheDiagnosticSeverity; }
export interface CacheKey { readonly namespace: string; readonly segments: readonly string[]; readonly toString: () => string; }
export const createCacheKey = (namespace: string, segments: readonly string[]): CacheKey => ({ namespace, segments, toString: () => `${namespace}:${segments.join(':')}` });

export interface CacheEntry<TValue = unknown> {
  readonly key: CacheKey;
  readonly value: TValue;
  readonly createdAt: Date;
  readonly expiresAt: Date | undefined;
  readonly ttl: number;
  readonly tags: readonly string[];
}
export const createCacheEntry = <TValue = unknown>(key: CacheKey, value: TValue, ttl: number, tags: readonly string[] = []): CacheEntry<TValue> => ({ key, value, createdAt: new Date(), expiresAt: ttl > 0 ? new Date(Date.now() + ttl) : undefined, ttl, tags });

export interface CacheStore {
  get<TValue = unknown>(key: CacheKey): Promise<CacheEntry<TValue> | undefined>;
  set<TValue = unknown>(entry: CacheEntry<TValue>): Promise<void>;
  delete(key: CacheKey): Promise<void>;
  has(key: CacheKey): Promise<boolean>;
  clear(): Promise<void>;
  keys(namespace?: string): Promise<readonly CacheKey[]>;
}

export class InMemoryCacheStore implements CacheStore {
  private readonly store = new Map<string, CacheEntry>();
  public async get<TValue = unknown>(key: CacheKey): Promise<CacheEntry<TValue> | undefined> {
    const entry = this.store.get(key.toString());
    if (!entry) return undefined;
    if (entry.expiresAt && entry.expiresAt < new Date()) { this.store.delete(key.toString()); return undefined; }
    return entry as CacheEntry<TValue>;
  }
  public async set<TValue = unknown>(entry: CacheEntry<TValue>): Promise<void> { this.store.set(entry.key.toString(), entry); }
  public async delete(key: CacheKey): Promise<void> { this.store.delete(key.toString()); }
  public async has(key: CacheKey): Promise<boolean> { const e = await this.get(key); return e !== undefined; }
  public async clear(): Promise<void> { this.store.clear(); }
  public async keys(namespace?: string): Promise<readonly CacheKey[]> {
    return Array.from(this.store.values()).filter(e => !namespace || e.key.namespace === namespace).map(e => e.key);
  }
}
export const createCacheStore = (): CacheStore => new InMemoryCacheStore();

export interface CacheNamespace { readonly name: string; readonly prefix: string; }
export const createCacheNamespace = (name: string, prefix: string = name): CacheNamespace => ({ name, prefix });

export interface CacheSerializer { serialize(value: unknown): string; deserialize<TValue = unknown>(data: string): TValue; }
export const jsonCacheSerializer: CacheSerializer = {
  serialize: (value) => JSON.stringify(value),
  deserialize: <TValue>(data: string) => JSON.parse(data) as TValue,
};

export interface CacheInvalidationEvent { readonly key: CacheKey; readonly reason: 'expired' | 'deleted' | 'updated' | 'manual'; }
export type CacheInvalidationListener = (event: CacheInvalidationEvent) => void;
export interface CacheInvalidationRegistry { subscribe(listener: CacheInvalidationListener): void; publish(event: CacheInvalidationEvent): void; }
export class InMemoryCacheInvalidationRegistry implements CacheInvalidationRegistry {
  private readonly listeners = new Set<CacheInvalidationListener>();
  public subscribe(listener: CacheInvalidationListener): void { this.listeners.add(listener); }
  public publish(event: CacheInvalidationEvent): void { this.listeners.forEach(l => l(event)); }
}
export const createCacheInvalidationRegistry = (): CacheInvalidationRegistry => new InMemoryCacheInvalidationRegistry();

export interface CacheTagManager {
  getEntriesByTag(tag: string): Promise<readonly CacheKey[]>;
  invalidateByTag(tag: string): Promise<number>;
}

export interface CacheStampedeGuard {
  acquire(key: CacheKey): Promise<boolean>;
  release(key: CacheKey): Promise<void>;
}

export interface CacheMetrics {
  readonly hits: number;
  readonly misses: number;
  readonly sets: number;
  readonly evictions: number;
  readonly hitRate: number;
}
export class InMemoryCacheMetrics implements CacheMetrics {
  private hitsValue = 0; private missesValue = 0; private setsValue = 0; private evictionsValue = 0;
  public get hits() { return this.hitsValue; }
  public get misses() { return this.missesValue; }
  public get sets() { return this.setsValue; }
  public get evictions() { return this.evictionsValue; }
  public get hitRate() { const total = this.hitsValue + this.missesValue; return total === 0 ? 0 : this.hitsValue / total; }
  public recordHit(): void { this.hitsValue++; }
  public recordMiss(): void { this.missesValue++; }
  public recordSet(): void { this.setsValue++; }
  public recordEviction(): void { this.evictionsValue++; }
  public reset(): void { this.hitsValue = this.missesValue = this.setsValue = this.evictionsValue = 0; }
}
export const createCacheMetrics = (): CacheMetrics => new InMemoryCacheMetrics();

export interface CacheError { readonly code: string; readonly message: string; readonly key: CacheKey | undefined; }
export const createCacheError = (code: string, message: string, key?: CacheKey): CacheError => ({ code, message, key });

export interface CacheConfigBinding { readonly configKey: string; readonly required: boolean; }
export const createCacheConfigBinding = (configKey: string, required = true): CacheConfigBinding => ({ configKey, required });

export interface CacheRuntimeBinding { readonly runtimeId: string; readonly autoStart: boolean; }
export const createCacheRuntimeBinding = (runtimeId: string, autoStart = false): CacheRuntimeBinding => ({ runtimeId, autoStart });

export const createCacheDiagnostic = (code: string, message: string, severity: CacheDiagnosticSeverity = 'info'): CacheDiagnostic => ({ code, message, severity });
