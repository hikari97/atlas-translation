import type { RuntimeConfigurationMetadata } from './RuntimeConfigurationMetadata';

export interface RuntimeConfigurationProvider {
  readonly metadata: RuntimeConfigurationMetadata;
  load(): ReadonlyMap<string, unknown>;
}

export class InMemoryRuntimeConfigurationProvider implements RuntimeConfigurationProvider {
  private readonly values: Map<string, unknown>;

  public constructor(
    public readonly metadata: RuntimeConfigurationMetadata,
    entries: ReadonlyArray<readonly [string, unknown]> = [],
  ) {
    this.values = new Map(entries);
  }

  public load(): ReadonlyMap<string, unknown> {
    return this.values;
  }
}

export const createRuntimeConfigurationProvider = (
  metadata: RuntimeConfigurationMetadata,
  entries: ReadonlyArray<readonly [string, unknown]> = [],
): RuntimeConfigurationProvider => new InMemoryRuntimeConfigurationProvider(metadata, entries);
