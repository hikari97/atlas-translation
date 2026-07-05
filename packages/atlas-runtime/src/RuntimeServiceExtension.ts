export interface RuntimeServiceExtension {
  readonly name: string;
  readonly description: string | undefined;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeServiceExtension = (
  name: string,
  description: string | undefined = undefined,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeServiceExtension => ({ name, description, attributes });
