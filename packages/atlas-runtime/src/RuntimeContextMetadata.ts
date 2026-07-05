export interface RuntimeContextMetadata {
  readonly name: string;
  readonly description: string | undefined;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeContextMetadata = (
  name: string,
  description: string | undefined = undefined,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeContextMetadata => ({ name, description, attributes });
