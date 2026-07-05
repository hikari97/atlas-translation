export interface RuntimeCoreMetadata {
  readonly name: string;
  readonly version: string;
  readonly description: string | undefined;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeCoreMetadata = (
  name: string,
  version: string,
  description: string | undefined = undefined,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeCoreMetadata => ({
  name,
  version,
  description,
  attributes,
});
