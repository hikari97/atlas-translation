export type MiddlewareAttributeValue = string | number | boolean | null | Date | readonly string[];

export type MiddlewareAttributes = Readonly<Record<string, MiddlewareAttributeValue>>;

export interface MiddlewareRegistryEntry<TValue> {
  readonly id: string;
  readonly name: string;
  readonly value: TValue;
  readonly attributes: MiddlewareAttributes;
}

export interface MiddlewareReadonlyRegistry<TValue> {
  has(id: string): boolean;
  get(id: string): MiddlewareRegistryEntry<TValue> | undefined;
  entries(): readonly MiddlewareRegistryEntry<TValue>[];
}

export interface MiddlewareMutableRegistry<TValue> extends MiddlewareReadonlyRegistry<TValue> {
  register(entry: MiddlewareRegistryEntry<TValue>): void;
  unregister(id: string): void;
  clear(): void;
}

export class InMemoryMiddlewareRegistry<TValue> implements MiddlewareMutableRegistry<TValue> {
  private readonly values = new Map<string, MiddlewareRegistryEntry<TValue>>();

  public constructor(entries: readonly MiddlewareRegistryEntry<TValue>[] = []) {
    entries.forEach((entry) => this.register(entry));
  }

  public has(id: string): boolean {
    return this.values.has(id);
  }

  public get(id: string): MiddlewareRegistryEntry<TValue> | undefined {
    return this.values.get(id);
  }

  public register(entry: MiddlewareRegistryEntry<TValue>): void {
    this.values.set(entry.id, entry);
  }

  public unregister(id: string): void {
    this.values.delete(id);
  }

  public clear(): void {
    this.values.clear();
  }

  public entries(): readonly MiddlewareRegistryEntry<TValue>[] {
    return Array.from(this.values.values());
  }
}
