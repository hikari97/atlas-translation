export interface RuntimeModuleMetadata {
  readonly version: string;
  readonly description: string | undefined;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeModuleMetadata = (
  version: string,
  description: string | undefined = undefined,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeModuleMetadata => ({ version, description, attributes });
