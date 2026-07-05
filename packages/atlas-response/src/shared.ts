export type ResponseRecordValue =
  | string
  | number
  | boolean
  | null
  | readonly ResponseRecordValue[]
  | { readonly [key: string]: ResponseRecordValue };

export type ResponseAttributes = Readonly<Record<string, ResponseRecordValue>>;

export interface ResponseIdentity {
  readonly id: string;
  readonly name: string;
}

export interface ResponseTimestamped {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface ResponseLifecycleRecord<TState extends string> extends ResponseTimestamped {
  readonly state: TState;
  readonly transitions: readonly string[];
}

export interface ResponseRegistryEntry<TValue> extends ResponseIdentity {
  readonly value: TValue;
}

export interface ResponseReadonlyRegistry<TValue> {
  has(id: string): boolean;
  get(id: string): TValue | undefined;
  entries(): readonly ResponseRegistryEntry<TValue>[];
}

export interface ResponseMutableRegistry<TValue> extends ResponseReadonlyRegistry<TValue> {
  register(entry: ResponseRegistryEntry<TValue>): void;
  remove(id: string): void;
}

export class InMemoryResponseRegistry<TValue> implements ResponseMutableRegistry<TValue> {
  private readonly values = new Map<string, ResponseRegistryEntry<TValue>>();

  public has(id: string): boolean {
    return this.values.has(id);
  }

  public get(id: string): TValue | undefined {
    return this.values.get(id)?.value;
  }

  public register(entry: ResponseRegistryEntry<TValue>): void {
    this.values.set(entry.id, entry);
  }

  public remove(id: string): void {
    this.values.delete(id);
  }

  public entries(): readonly ResponseRegistryEntry<TValue>[] {
    return Array.from(this.values.values());
  }
}
