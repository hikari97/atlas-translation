export interface RuntimeContextAttributes {
  readonly entries: ReadonlyMap<string, unknown>;
  get<T>(key: string): T | undefined;
  has(key: string): boolean;
}

export class InMemoryRuntimeContextAttributes implements RuntimeContextAttributes {
  private readonly values: Map<string, unknown>;

  public constructor(entries: ReadonlyMap<string, unknown> = new Map()) {
    this.values = new Map(entries);
  }

  public get<T>(key: string): T | undefined {
    return this.values.get(key) as T | undefined;
  }

  public has(key: string): boolean {
    return this.values.has(key);
  }

  public get entries(): ReadonlyMap<string, unknown> {
    return this.values;
  }

  public set(key: string, value: unknown): void {
    this.values.set(key, value);
  }
}

export const createRuntimeContextAttributes = (
  entries: ReadonlyArray<readonly [string, unknown]> = [],
): RuntimeContextAttributes => new InMemoryRuntimeContextAttributes(new Map(entries));
