// Atlas Storage System - Provider-independent object storage contracts.

export type StorageDiagnosticSeverity = 'info' | 'warning' | 'error';
export type StorageAccessLevel = 'private' | 'public-read' | 'public-read-write';

export interface StorageDiagnostic { readonly code: string; readonly message: string; readonly severity: StorageDiagnosticSeverity; }

export interface StorageKeyPath {
  readonly bucket: string;
  readonly key: string;
  readonly segments: readonly string[];
}
export const createStorageKeyPath = (bucket: string, key: string): StorageKeyPath => {
  const segments = key.split('/').filter(s => s.length > 0);
  return { bucket, key, segments };
};

export interface StorageMetadata {
  readonly contentType: string;
  readonly contentLength: number;
  readonly checksum: string | undefined;
  readonly accessLevel: StorageAccessLevel;
  readonly attributes: Readonly<Record<string, string>>;
  readonly createdAt: Date;
}
export const createStorageMetadata = (contentType: string, contentLength: number, options: { checksum?: string; accessLevel?: StorageAccessLevel; attributes?: Readonly<Record<string, string>> } = {}): StorageMetadata => ({
  contentType, contentLength, checksum: options.checksum, accessLevel: options.accessLevel ?? 'private', attributes: options.attributes ?? {}, createdAt: new Date(),
});

export interface StorageObject<TPayload = unknown> {
  readonly key: StorageKeyPath;
  readonly metadata: StorageMetadata;
  readonly payload: TPayload;
}
export const createStorageObject = <TPayload = unknown>(key: StorageKeyPath, metadata: StorageMetadata, payload: TPayload): StorageObject<TPayload> => ({ key, metadata, payload });

export interface StorageDriver {
  put<TPayload = unknown>(obj: StorageObject<TPayload>): Promise<void>;
  get<TPayload = unknown>(key: StorageKeyPath): Promise<StorageObject<TPayload> | undefined>;
  delete(key: StorageKeyPath): Promise<void>;
  exists(key: StorageKeyPath): Promise<boolean>;
  list(prefix: string): Promise<readonly StorageKeyPath[]>;
}

export class InMemoryStorageDriver implements StorageDriver {
  private readonly store = new Map<string, StorageObject>();
  private key(p: StorageKeyPath) { return `${p.bucket}:${p.key}`; }
  public async put<TPayload = unknown>(obj: StorageObject<TPayload>): Promise<void> { this.store.set(this.key(obj.key), obj); }
  public async get<TPayload = unknown>(key: StorageKeyPath): Promise<StorageObject<TPayload> | undefined> { return this.store.get(this.key(key)) as StorageObject<TPayload> | undefined; }
  public async delete(key: StorageKeyPath): Promise<void> { this.store.delete(this.key(key)); }
  public async exists(key: StorageKeyPath): Promise<boolean> { return this.store.has(this.key(key)); }
  public async list(prefix: string): Promise<readonly StorageKeyPath[]> { return Array.from(this.store.values()).filter(o => o.key.key.startsWith(prefix)).map(o => o.key); }
}
export const createStorageDriver = (): StorageDriver => new InMemoryStorageDriver();

export interface StorageListing<TItem> { readonly items: readonly TItem[]; readonly nextCursor: string | undefined; readonly isTruncated: boolean; }

export interface StorageBucket { readonly name: string; readonly accessLevel: StorageAccessLevel; readonly createdAt: Date; }
export const createStorageBucket = (name: string, accessLevel: StorageAccessLevel = 'private'): StorageBucket => ({ name, accessLevel, createdAt: new Date() });

export interface StorageChecksumResult { readonly algorithm: string; readonly value: string; }
export const createStorageChecksum = (algorithm: string, value: string): StorageChecksumResult => ({ algorithm, value });

export interface StorageSignedUrl { readonly url: string; readonly expiresAt: Date; readonly method: 'get' | 'put' | 'delete'; }
export const createStorageSignedUrl = (url: string, expiresAt: Date, method: 'get' | 'put' | 'delete' = 'get'): StorageSignedUrl => ({ url, expiresAt, method });

export interface StorageRetentionPolicy { readonly rule: string; readonly maxAge: number; readonly prefix: string; }
export const createStorageRetentionPolicy = (rule: string, maxAge: number, prefix: string): StorageRetentionPolicy => ({ rule, maxAge, prefix });

export interface StorageConfigBinding { readonly configKey: string; readonly required: boolean; }
export const createStorageConfigBinding = (configKey: string, required = true): StorageConfigBinding => ({ configKey, required });

export interface StorageRuntimeBinding { readonly runtimeId: string; readonly autoStart: boolean; }
export const createStorageRuntimeBinding = (runtimeId: string, autoStart = false): StorageRuntimeBinding => ({ runtimeId, autoStart });

export const createStorageDiagnostic = (code: string, message: string, severity: StorageDiagnosticSeverity = 'info'): StorageDiagnostic => ({ code, message, severity });
