import type { RuntimeConfigurationExtension } from './RuntimeConfigurationExtension';
import type { RuntimeConfigurationMetadata } from './RuntimeConfigurationMetadata';

export interface RuntimeConfiguration {
  readonly metadata: RuntimeConfigurationMetadata;
  readonly extensions: readonly RuntimeConfigurationExtension[];
  get<T>(key: string): T | undefined;
  has(key: string): boolean;
  keys(): readonly string[];
}

export class InMemoryRuntimeConfiguration implements RuntimeConfiguration {
  private readonly values: Map<string, unknown>;

  public constructor(
    public readonly metadata: RuntimeConfigurationMetadata,
    public readonly extensions: readonly RuntimeConfigurationExtension[] = [],
    entries: ReadonlyArray<readonly [string, unknown]> = [],
  ) {
    this.values = new Map(entries);
  }

  public get<T>(key: string): T | undefined {
    return this.values.get(key) as T | undefined;
  }

  public has(key: string): boolean {
    return this.values.has(key);
  }

  public keys(): readonly string[] {
    return Array.from(this.values.keys());
  }
}

export const createRuntimeConfiguration = (
  metadata: RuntimeConfigurationMetadata,
  extensions: readonly RuntimeConfigurationExtension[] = [],
  entries: ReadonlyArray<readonly [string, unknown]> = [],
): RuntimeConfiguration => new InMemoryRuntimeConfiguration(metadata, extensions, entries);
