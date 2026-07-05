export type RequestRecordValue =
  | string
  | number
  | boolean
  | null
  | readonly RequestRecordValue[]
  | { readonly [key: string]: RequestRecordValue };

export type RequestAttributes = Readonly<Record<string, RequestRecordValue>>;

export interface RequestIdentity {
  readonly id: string;
  readonly name: string;
}

export interface RequestTimestamped {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface RequestLifecycleRecord<TState extends string> extends RequestTimestamped {
  readonly state: TState;
  readonly transitions: readonly string[];
}

export interface RequestRegistryEntry<TValue> extends RequestIdentity {
  readonly value: TValue;
}

export interface RequestReadonlyRegistry<TValue> {
  has(id: string): boolean;
  get(id: string): TValue | undefined;
  entries(): readonly RequestRegistryEntry<TValue>[];
}

export interface RequestMutableRegistry<TValue> extends RequestReadonlyRegistry<TValue> {
  register(entry: RequestRegistryEntry<TValue>): void;
  remove(id: string): void;
}

export class InMemoryRequestRegistry<TValue> implements RequestMutableRegistry<TValue> {
  private readonly values = new Map<string, RequestRegistryEntry<TValue>>();

  public has(id: string): boolean {
    return this.values.has(id);
  }

  public get(id: string): TValue | undefined {
    return this.values.get(id)?.value;
  }

  public register(entry: RequestRegistryEntry<TValue>): void {
    this.values.set(entry.id, entry);
  }

  public remove(id: string): void {
    this.values.delete(id);
  }

  public entries(): readonly RequestRegistryEntry<TValue>[] {
    return Array.from(this.values.values());
  }
}
