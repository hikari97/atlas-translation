export interface RuntimeEnvironmentMetadata {
  readonly name: string;
  readonly region: string | undefined;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeEnvironmentMetadata = (
  name: string,
  region: string | undefined = undefined,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeEnvironmentMetadata => ({ name, region, attributes });
