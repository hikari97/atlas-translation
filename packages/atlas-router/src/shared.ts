export type RouterRecordValue =
  | string
  | number
  | boolean
  | null
  | readonly RouterRecordValue[]
  | { readonly [key: string]: RouterRecordValue };

export type RouterAttributes = Readonly<Record<string, RouterRecordValue>>;

export interface RouterIdentity {
  readonly id: string;
  readonly name: string;
}

export interface RouterTimestamped {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface RouterLifecycleRecord<TState extends string> extends RouterTimestamped {
  readonly state: TState;
  readonly transitions: readonly string[];
}

export interface RouterRegistryEntry<TValue> extends RouterIdentity {
  readonly value: TValue;
}

export interface RouterReadonlyRegistry<TValue> {
  has(id: string): boolean;
  get(id: string): TValue | undefined;
  entries(): readonly RouterRegistryEntry<TValue>[];
}

export interface RouterMutableRegistry<TValue> extends RouterReadonlyRegistry<TValue> {
  register(entry: RouterRegistryEntry<TValue>): void;
  remove(id: string): void;
}

export class InMemoryRouterRegistry<TValue> implements RouterMutableRegistry<TValue> {
  private readonly values = new Map<string, RouterRegistryEntry<TValue>>();

  public has(id: string): boolean {
    return this.values.has(id);
  }

  public get(id: string): TValue | undefined {
    return this.values.get(id)?.value;
  }

  public register(entry: RouterRegistryEntry<TValue>): void {
    this.values.set(entry.id, entry);
  }

  public remove(id: string): void {
    this.values.delete(id);
  }

  public entries(): readonly RouterRegistryEntry<TValue>[] {
    return Array.from(this.values.values());
  }
}
