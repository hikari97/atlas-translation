export type ControllerAttributeValue = string | number | boolean | null | Date | readonly string[];

export type ControllerAttributes = Readonly<Record<string, ControllerAttributeValue>>;

export interface ControllerRegistryEntry<TValue> {
  readonly id: string;
  readonly name: string;
  readonly value: TValue;
  readonly attributes: ControllerAttributes;
}

export interface ControllerReadonlyRegistry<TValue> {
  has(id: string): boolean;
  get(id: string): ControllerRegistryEntry<TValue> | undefined;
  entries(): readonly ControllerRegistryEntry<TValue>[];
}

export interface ControllerMutableRegistry<TValue> extends ControllerReadonlyRegistry<TValue> {
  register(entry: ControllerRegistryEntry<TValue>): void;
  unregister(id: string): void;
  clear(): void;
}

export class InMemoryControllerRegistry<TValue> implements ControllerMutableRegistry<TValue> {
  private readonly values = new Map<string, ControllerRegistryEntry<TValue>>();

  public constructor(entries: readonly ControllerRegistryEntry<TValue>[] = []) {
    entries.forEach((entry) => this.register(entry));
  }

  public has(id: string): boolean {
    return this.values.has(id);
  }

  public get(id: string): ControllerRegistryEntry<TValue> | undefined {
    return this.values.get(id);
  }

  public register(entry: ControllerRegistryEntry<TValue>): void {
    this.values.set(entry.id, entry);
  }

  public unregister(id: string): void {
    this.values.delete(id);
  }

  public clear(): void {
    this.values.clear();
  }

  public entries(): readonly ControllerRegistryEntry<TValue>[] {
    return Array.from(this.values.values());
  }
}
