import type { ValidationLifecycle } from './lifecycle';
import type { ValidationAttributes, ValidationMutableRegistry } from './shared';
import { InMemoryValidationRegistry } from './shared';

export interface ValidationCapability {
  readonly id: string;
  readonly name: string;
  readonly attributes: ValidationAttributes;
}

export interface ValidationMetadataEntry<TValue = unknown> {
  readonly key: string;
  readonly value: TValue;
  readonly attributes: ValidationAttributes;
}

export interface ValidationMetadataCollection {
  has(key: string): boolean;
  get<TValue = unknown>(key: string): ValidationMetadataEntry<TValue> | undefined;
  set<TValue>(entry: ValidationMetadataEntry<TValue>): void;
  remove(key: string): void;
  entries(): readonly ValidationMetadataEntry[];
}

export interface ValidationMetadataLifecycle extends ValidationLifecycle {}

export interface ValidationMetadata extends ValidationMetadataCollection {
  readonly id: string;
  readonly name: string;
  readonly version: string;
  readonly capabilities: readonly ValidationCapability[];
  readonly attributes: ValidationAttributes;
}

export class DefaultValidationMetadata implements ValidationMetadata {
  private readonly values = new Map<string, ValidationMetadataEntry>();

  public constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly version: string,
    public readonly capabilities: readonly ValidationCapability[] = [],
    public readonly attributes: ValidationAttributes = {},
    entries: readonly ValidationMetadataEntry[] = [],
  ) {
    entries.forEach((entry) => this.set(entry));
  }

  public has(key: string): boolean {
    return this.values.has(key);
  }

  public get<TValue = unknown>(key: string): ValidationMetadataEntry<TValue> | undefined {
    return this.values.get(key) as ValidationMetadataEntry<TValue> | undefined;
  }

  public set<TValue>(entry: ValidationMetadataEntry<TValue>): void {
    this.values.set(entry.key, entry);
  }

  public remove(key: string): void {
    this.values.delete(key);
  }

  public entries(): readonly ValidationMetadataEntry[] {
    return Array.from(this.values.values());
  }
}

export interface ValidationMetadataRegistry extends ValidationMutableRegistry<ValidationMetadataEntry> {}

export const createValidationCapability = (
  id: string,
  name: string,
  attributes: ValidationAttributes = {},
): ValidationCapability => ({ id, name, attributes });

export const createValidationMetadataRegistry = (): ValidationMetadataRegistry =>
  new InMemoryValidationRegistry<ValidationMetadataEntry>();
