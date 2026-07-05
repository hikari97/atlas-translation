export interface RuntimeStateMetadata {
  readonly attributes: Readonly<Record<string, string>>;
  readonly updatedAt: Date;
}

export const createRuntimeStateMetadata = (
  attributes: Readonly<Record<string, string>> = {},
  updatedAt: Date = new Date(),
): RuntimeStateMetadata => ({ attributes, updatedAt });
