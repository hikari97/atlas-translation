export interface RuntimeContextExtension {
  readonly name: string;
  readonly description: string | undefined;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeContextExtension = (
  name: string,
  description: string | undefined = undefined,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeContextExtension => ({ name, description, attributes });
