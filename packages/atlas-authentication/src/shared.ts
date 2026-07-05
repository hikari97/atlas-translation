export type AuthenticationAttributeValue = string | number | boolean | null | Date | readonly string[];

export type AuthenticationAttributes = Readonly<Record<string, AuthenticationAttributeValue>>;

export interface AuthenticationRegistryEntry<TValue> {
  readonly id: string;
  readonly name: string;
  readonly value: TValue;
  readonly attributes: AuthenticationAttributes;
}

export interface AuthenticationMutableRegistry<TValue> {
  has(id: string): boolean;
  get(id: string): AuthenticationRegistryEntry<TValue> | undefined;
  register(entry: AuthenticationRegistryEntry<TValue>): void;
  unregister(id: string): void;
  clear(): void;
  entries(): readonly AuthenticationRegistryEntry<TValue>[];
}

export class InMemoryAuthenticationRegistry<TValue> implements AuthenticationMutableRegistry<TValue> {
  private readonly values = new Map<string, AuthenticationRegistryEntry<TValue>>();

  public constructor(entries: readonly AuthenticationRegistryEntry<TValue>[] = []) {
    entries.forEach((entry) => this.register(entry));
  }

  public has(id: string): boolean {
    return this.values.has(id);
  }

  public get(id: string): AuthenticationRegistryEntry<TValue> | undefined {
    return this.values.get(id);
  }

  public register(entry: AuthenticationRegistryEntry<TValue>): void {
    this.values.set(entry.id, entry);
  }

  public unregister(id: string): void {
    this.values.delete(id);
  }

  public clear(): void {
    this.values.clear();
  }

  public entries(): readonly AuthenticationRegistryEntry<TValue>[] {
    return Array.from(this.values.values());
  }
}
