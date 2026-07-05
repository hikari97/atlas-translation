export type HttpComponentKind =
  | 'core'
  | 'context'
  | 'message'
  | 'headers'
  | 'request-line'
  | 'status'
  | 'method'
  | 'protocol'
  | 'connection'
  | 'server'
  | 'client'
  | 'pipeline'
  | 'handler'
  | 'endpoint'
  | 'metadata'
  | 'lifecycle'
  | 'provider';

export type HttpRecordValue =
  | string
  | number
  | boolean
  | null
  | readonly HttpRecordValue[]
  | { readonly [key: string]: HttpRecordValue };

export type HttpAttributes = Readonly<Record<string, HttpRecordValue>>;

export interface HttpIdentity {
  readonly id: string;
  readonly name: string;
}

export interface HttpTimestamped {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface HttpLifecycleRecord<TState extends string> extends HttpTimestamped {
  readonly state: TState;
  readonly transitions: readonly string[];
}

export interface HttpRegistryEntry<TValue> extends HttpIdentity {
  readonly value: TValue;
}

export interface HttpReadonlyRegistry<TValue> {
  has(id: string): boolean;
  get(id: string): TValue | undefined;
  entries(): readonly HttpRegistryEntry<TValue>[];
}

export interface HttpMutableRegistry<TValue> extends HttpReadonlyRegistry<TValue> {
  register(entry: HttpRegistryEntry<TValue>): void;
  remove(id: string): void;
}

export class InMemoryHttpRegistry<TValue> implements HttpMutableRegistry<TValue> {
  private readonly values = new Map<string, HttpRegistryEntry<TValue>>();

  public has(id: string): boolean {
    return this.values.has(id);
  }

  public get(id: string): TValue | undefined {
    return this.values.get(id)?.value;
  }

  public register(entry: HttpRegistryEntry<TValue>): void {
    this.values.set(entry.id, entry);
  }

  public remove(id: string): void {
    this.values.delete(id);
  }

  public entries(): readonly HttpRegistryEntry<TValue>[] {
    return Array.from(this.values.values());
  }
}

export const createHttpMetadataId = (kind: HttpComponentKind, id: string): string =>
  `${kind}:${id}`;
