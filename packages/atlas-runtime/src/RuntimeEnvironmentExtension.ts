export interface RuntimeEnvironmentExtension {
  readonly name: string;
  readonly description: string | undefined;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeEnvironmentExtension = (
  name: string,
  description: string | undefined = undefined,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeEnvironmentExtension => ({ name, description, attributes });
