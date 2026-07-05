export interface RuntimeCoreExtension {
  readonly name: string;
  readonly description: string | undefined;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeCoreExtension = (
  name: string,
  description: string | undefined = undefined,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeCoreExtension => ({
  name,
  description,
  attributes,
});
