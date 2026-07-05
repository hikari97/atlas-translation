export interface RuntimeServiceCapability {
  readonly name: string;
  readonly available: boolean;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeServiceCapability = (
  name: string,
  available: boolean,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeServiceCapability => ({ name, available, attributes });
