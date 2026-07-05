export interface RuntimeModuleExtension {
  readonly name: string;
  readonly description: string | undefined;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeModuleExtension = (
  name: string,
  description: string | undefined = undefined,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeModuleExtension => ({ name, description, attributes });
