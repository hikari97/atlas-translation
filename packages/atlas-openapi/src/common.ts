export type OpenAPIPrimitive = string | number | boolean | null;

export type OpenAPIExtensionValue = OpenAPIPrimitive | readonly OpenAPIPrimitive[] | Readonly<Record<string, OpenAPIPrimitive>>;

export type OpenAPIExtensions = Readonly<Record<string, OpenAPIExtensionValue>>;

export interface OpenAPILifecycle {
  readonly state: 'created' | 'active' | 'validated' | 'generated' | 'disposed';
  readonly updatedAt?: Date;
}

export interface OpenAPIMetadata {
  readonly summary?: string;
  readonly description?: string;
  readonly extensions: OpenAPIExtensions;
}
