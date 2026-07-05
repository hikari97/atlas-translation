export type ValidationAttributeValue = string | number | boolean | null | Date | readonly string[];

export type ValidationAttributes = Readonly<Record<string, ValidationAttributeValue>>;

export interface ValidationRegistryEntry<TValue> {
  readonly id: string;
  readonly name: string;
  readonly value: TValue;
  readonly attributes: ValidationAttributes;
}

export interface ValidationMutableRegistry<TValue> {
  has(id: string): boolean;
  get(id: string): ValidationRegistryEntry<TValue> | undefined;
  register(entry: ValidationRegistryEntry<TValue>): void;
  unregister(id: string): void;
  clear(): void;
  entries(): readonly ValidationRegistryEntry<TValue>[];
}

export class InMemoryValidationRegistry<TValue> implements ValidationMutableRegistry<TValue> {
  private readonly values = new Map<string, ValidationRegistryEntry<TValue>>();

  public constructor(entries: readonly ValidationRegistryEntry<TValue>[] = []) {
    entries.forEach((entry) => this.register(entry));
  }

  public has(id: string): boolean {
    return this.values.has(id);
  }

  public get(id: string): ValidationRegistryEntry<TValue> | undefined {
    return this.values.get(id);
  }

  public register(entry: ValidationRegistryEntry<TValue>): void {
    this.values.set(entry.id, entry);
  }

  public unregister(id: string): void {
    this.values.delete(id);
  }

  public clear(): void {
    this.values.clear();
  }

  public entries(): readonly ValidationRegistryEntry<TValue>[] {
    return Array.from(this.values.values());
  }
}
