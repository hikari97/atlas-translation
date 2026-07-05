export interface RuntimeConfigurationMetadata {
  readonly source: string;
  readonly loadedAt: Date;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeConfigurationMetadata = (
  source: string,
  loadedAt: Date = new Date(),
  attributes: Readonly<Record<string, string>> = {},
): RuntimeConfigurationMetadata => ({ source, loadedAt, attributes });
