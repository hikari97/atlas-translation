export interface RuntimeEnvironmentCapability {
  readonly name: string;
  readonly available: boolean;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeEnvironmentCapability = (
  name: string,
  available: boolean,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeEnvironmentCapability => ({ name, available, attributes });
