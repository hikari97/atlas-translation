import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationAttributes, AuthenticationMutableRegistry } from './shared';
import { InMemoryAuthenticationRegistry } from './shared';

export interface AuthenticationCapability {
  readonly id: string;
  readonly name: string;
  readonly attributes: AuthenticationAttributes;
}

export interface AuthenticationMetadataEntry<TValue = unknown> {
  readonly key: string;
  readonly value: TValue;
  readonly attributes: AuthenticationAttributes;
}

export interface AuthenticationMetadataCollection {
  has(key: string): boolean;
  get<TValue = unknown>(key: string): AuthenticationMetadataEntry<TValue> | undefined;
  set<TValue>(entry: AuthenticationMetadataEntry<TValue>): void;
  remove(key: string): void;
  entries(): readonly AuthenticationMetadataEntry[];
}

export interface AuthenticationMetadataLifecycle extends AuthenticationLifecycle {}

export interface AuthenticationMetadata extends AuthenticationMetadataCollection {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly capabilities: readonly AuthenticationCapability[];
  readonly attributes: AuthenticationAttributes;
}

export class DefaultAuthenticationMetadata implements AuthenticationMetadata {
  private readonly values = new Map<string, AuthenticationMetadataEntry>();

  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly version: string,
    public readonly capabilities: readonly AuthenticationCapability[] = [],
    public readonly attributes: AuthenticationAttributes = {},
    entries: readonly AuthenticationMetadataEntry[] = [],
  ) {
    entries.forEach((entry) => this.set(entry));
  }

  public has(key: string): boolean {
    return this.values.has(key);
  }

  public get<TValue = unknown>(key: string): AuthenticationMetadataEntry<TValue> | undefined {
    return this.values.get(key) as AuthenticationMetadataEntry<TValue> | undefined;
  }

  public set<TValue>(entry: AuthenticationMetadataEntry<TValue>): void {
    this.values.set(entry.key, entry);
  }

  public remove(key: string): void {
    this.values.delete(key);
  }

  public entries(): readonly AuthenticationMetadataEntry[] {
    return Array.from(this.values.values());
  }
}

export interface AuthenticationMetadataRegistry extends AuthenticationMutableRegistry<AuthenticationMetadataEntry> {}

export const createAuthenticationCapability = (
  id: string,
  name: string,
  attributes: AuthenticationAttributes = {},
): AuthenticationCapability => ({ id, name, attributes });

export const createAuthenticationMetadataRegistry = (): AuthenticationMetadataRegistry =>
  new InMemoryAuthenticationRegistry<AuthenticationMetadataEntry>();
