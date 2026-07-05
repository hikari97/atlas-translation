import type { OpenAPIExtensions, OpenAPIExtensionValue, OpenAPILifecycle, OpenAPIMetadata } from './common';

export type OpenAPIVersionCapability = 'schemas' | 'components' | 'security' | 'callbacks' | 'webhooks' | 'extensions';

export interface OpenAPIVersionCompatibility {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
}

export interface OpenAPIVersionMetadata extends OpenAPIMetadata {}

export interface OpenAPIVersion {
  readonly version: string;
  readonly metadata: OpenAPIVersionMetadata;
  readonly compatibility: OpenAPIVersionCompatibility;
  readonly capabilities: readonly OpenAPIVersionCapability[];
}

export interface OpenAPIContact {
  readonly name?: string;
  readonly url?: string;
  readonly email?: string;
}

export interface OpenAPILicense {
  readonly name: string;
  readonly identifier?: string;
  readonly url?: string;
}

export interface OpenAPIInfoMetadata extends OpenAPIMetadata {}

export interface OpenAPIInfoExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPIInfo {
  readonly title: string;
  readonly summary?: string;
  readonly description?: string;
  readonly version: string;
  readonly contact?: OpenAPIContact;
  readonly license?: OpenAPILicense;
  readonly metadata: OpenAPIInfoMetadata;
  readonly extensions: readonly OpenAPIInfoExtension[];
}

export interface OpenAPIServerVariable {
  readonly name: string;
  readonly defaultValue: string;
  readonly enumValues: readonly string[];
  readonly description?: string;
}

export type OpenAPIServerEnvironment = 'development' | 'staging' | 'production' | 'test' | 'custom';

export interface OpenAPIServerMetadata extends OpenAPIMetadata {}

export interface OpenAPIServerLifecycle extends OpenAPILifecycle {}

export interface OpenAPIServer {
  readonly url: string;
  readonly description?: string;
  readonly variables: readonly OpenAPIServerVariable[];
  readonly environment: OpenAPIServerEnvironment;
  readonly metadata: OpenAPIServerMetadata;
  readonly lifecycle: OpenAPIServerLifecycle;
}

export type OpenAPISchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object' | 'null' | 'reference' | 'custom';

export interface OpenAPISchemaReference {
  readonly ref: string;
}

export interface OpenAPISchemaComposition {
  readonly allOf: readonly OpenAPISchema[];
  readonly oneOf: readonly OpenAPISchema[];
  readonly anyOf: readonly OpenAPISchema[];
  readonly not?: OpenAPISchema;
}

export interface OpenAPISchemaMetadata extends OpenAPIMetadata {}

export interface OpenAPISchemaExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPISchema {
  readonly name?: string;
  readonly type: OpenAPISchemaType;
  readonly metadata: OpenAPISchemaMetadata;
  readonly reference?: OpenAPISchemaReference;
  readonly properties: Readonly<Record<string, OpenAPISchema>>;
  readonly items?: OpenAPISchema;
  readonly required: readonly string[];
  readonly composition?: OpenAPISchemaComposition;
  readonly extensions: readonly OpenAPISchemaExtension[];
}

export type OpenAPIParameterLocation = 'query' | 'header' | 'path' | 'cookie';

export interface OpenAPIParameterMetadata extends OpenAPIMetadata {}

export interface OpenAPIParameterSchema {
  readonly schema: OpenAPISchema;
}

export interface OpenAPIParameterExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPIParameter {
  readonly name: string;
  readonly location: OpenAPIParameterLocation;
  readonly required: boolean;
  readonly schema: OpenAPISchema;
  readonly metadata: OpenAPIParameterMetadata;
  readonly extensions: readonly OpenAPIParameterExtension[];
}

export type OpenAPIRequestMediaType = 'application/json' | 'application/xml' | 'text/plain' | 'multipart/form-data' | 'application/octet-stream' | 'custom';

export interface OpenAPIRequestBodyContent {
  readonly mediaType: OpenAPIRequestMediaType;
  readonly schema: OpenAPISchema;
}

export interface OpenAPIRequestBodyMetadata extends OpenAPIMetadata {}

export interface OpenAPIRequestBodyExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPIRequestBody {
  readonly required: boolean;
  readonly content: readonly OpenAPIRequestBodyContent[];
  readonly metadata: OpenAPIRequestBodyMetadata;
  readonly extensions: readonly OpenAPIRequestBodyExtension[];
}

export type OpenAPIStatusCode = number | 'default';

export interface OpenAPIResponseContent {
  readonly mediaType: OpenAPIRequestMediaType;
  readonly schema: OpenAPISchema;
}

export interface OpenAPIResponseHeader {
  readonly name: string;
  readonly description?: string;
  readonly schema: OpenAPISchema;
}

export interface OpenAPIResponseMetadata extends OpenAPIMetadata {}

export interface OpenAPIResponseExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPIResponse {
  readonly status: OpenAPIStatusCode;
  readonly description: string;
  readonly content: readonly OpenAPIResponseContent[];
  readonly headers: readonly OpenAPIResponseHeader[];
  readonly metadata: OpenAPIResponseMetadata;
  readonly extensions: readonly OpenAPIResponseExtension[];
}

export type OpenAPIOperationMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace';

export interface OpenAPIOperationMetadata extends OpenAPIMetadata {}

export interface OpenAPIOperationLifecycle extends OpenAPILifecycle {}

export interface OpenAPIOperationExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPIOperation {
  readonly operationId: string;
  readonly method: OpenAPIOperationMethod;
  readonly metadata: OpenAPIOperationMetadata;
  readonly parameters: readonly OpenAPIParameter[];
  readonly requestBody?: OpenAPIRequestBody;
  readonly responses: readonly OpenAPIResponse[];
  readonly lifecycle: OpenAPIOperationLifecycle;
  readonly extensions: readonly OpenAPIOperationExtension[];
}

export interface OpenAPIPathMetadata extends OpenAPIMetadata {}

export interface OpenAPIPathParameter extends OpenAPIParameter {}

export interface OpenAPIPathExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPIPathLifecycle extends OpenAPILifecycle {}

export interface OpenAPIPath {
  readonly path: string;
  readonly operations: readonly OpenAPIOperation[];
  readonly parameters: readonly OpenAPIParameter[];
  readonly metadata: OpenAPIPathMetadata;
  readonly lifecycle: OpenAPIPathLifecycle;
  readonly extensions: readonly OpenAPIPathExtension[];
}

export interface OpenAPIComponentReference {
  readonly ref: string;
}

export interface OpenAPIComponentMetadata extends OpenAPIMetadata {}

export interface OpenAPIComponentLifecycle extends OpenAPILifecycle {}

export interface OpenAPIComponentRegistry<TValue> {
  register(name: string, value: TValue): void;
  resolve(name: string): TValue | undefined;
  has(name: string): boolean;
  entries(): readonly OpenAPIComponentRegistryEntry<TValue>[];
}

export interface OpenAPIComponentRegistryEntry<TValue> {
  readonly name: string;
  readonly value: TValue;
}

export class InMemoryOpenAPIComponentRegistry<TValue> implements OpenAPIComponentRegistry<TValue> {
  private readonly values = new Map<string, TValue>();

  public register(name: string, value: TValue): void {
    this.values.set(name, value);
  }

  public resolve(name: string): TValue | undefined {
    return this.values.get(name);
  }

  public has(name: string): boolean {
    return this.values.has(name);
  }

  public entries(): readonly OpenAPIComponentRegistryEntry<TValue>[] {
    return Array.from(this.values.entries()).map(([name, value]) => ({ name, value }));
  }
}

export interface OpenAPIComponents {
  readonly schemas: OpenAPIComponentRegistry<OpenAPISchema>;
  readonly parameters: OpenAPIComponentRegistry<OpenAPIParameter>;
  readonly requestBodies: OpenAPIComponentRegistry<OpenAPIRequestBody>;
  readonly responses: OpenAPIComponentRegistry<OpenAPIResponse>;
  readonly metadata: OpenAPIComponentMetadata;
  readonly lifecycle: OpenAPIComponentLifecycle;
}

export interface OpenAPISecurityScope {
  readonly name: string;
  readonly description: string;
}

export interface OpenAPISecurityScheme {
  readonly name: string;
  readonly type: 'apiKey' | 'http' | 'mutualTLS' | 'oauth2' | 'openIdConnect';
  readonly description?: string;
  readonly scopes: readonly OpenAPISecurityScope[];
}

export interface OpenAPISecurityRequirement {
  readonly schemeName: string;
  readonly scopes: readonly string[];
}

export interface OpenAPISecurityMetadata extends OpenAPIMetadata {}

export interface OpenAPISecurity {
  readonly schemes: readonly OpenAPISecurityScheme[];
  readonly requirements: readonly OpenAPISecurityRequirement[];
  readonly metadata: OpenAPISecurityMetadata;
}

export interface OpenAPIExternalDocumentation {
  readonly url: string;
  readonly description?: string;
}

export interface OpenAPITagGroup {
  readonly name: string;
  readonly tags: readonly string[];
}

export interface OpenAPITagMetadata extends OpenAPIMetadata {}

export interface OpenAPITagExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPITag {
  readonly name: string;
  readonly description?: string;
  readonly group?: OpenAPITagGroup;
  readonly externalDocumentation?: OpenAPIExternalDocumentation;
  readonly metadata: OpenAPITagMetadata;
  readonly extensions: readonly OpenAPITagExtension[];
}

export interface OpenAPIExternalExample {
  readonly url: string;
}

export interface OpenAPIExampleMetadata extends OpenAPIMetadata {}

export interface OpenAPIExampleExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPIExample {
  readonly name: string;
  readonly summary?: string;
  readonly description?: string;
  readonly value?: unknown;
  readonly externalValue?: string;
  readonly metadata: OpenAPIExampleMetadata;
  readonly extensions: readonly OpenAPIExampleExtension[];
}

export interface OpenAPIExampleRegistry extends OpenAPIComponentRegistry<OpenAPIExample> {}

export interface OpenAPIDocumentMetadata extends OpenAPIMetadata {}

export interface OpenAPIDocumentLifecycle extends OpenAPILifecycle {}

export interface OpenAPIDocumentExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPIDocument {
  readonly openapi: OpenAPIVersion;
  readonly info: OpenAPIInfo;
  readonly servers: readonly OpenAPIServer[];
  readonly paths: readonly OpenAPIPath[];
  readonly components: OpenAPIComponents;
  readonly security?: OpenAPISecurity;
  readonly tags: readonly OpenAPITag[];
  readonly examples: readonly OpenAPIExample[];
  readonly metadata: OpenAPIDocumentMetadata;
  readonly lifecycle: OpenAPIDocumentLifecycle;
  readonly extensions: readonly OpenAPIDocumentExtension[];
}

export interface OpenAPIValidationDiagnostic {
  readonly code: string;
  readonly message: string;
  readonly path?: string;
  readonly severity: 'info' | 'warning' | 'error';
}

export interface OpenAPIValidationMetadata extends OpenAPIMetadata {}

export interface OpenAPIValidationLifecycle extends OpenAPILifecycle {}

export interface OpenAPIValidationResult {
  readonly valid: boolean;
  readonly diagnostics: readonly OpenAPIValidationDiagnostic[];
  readonly metadata: OpenAPIValidationMetadata;
}

export interface OpenAPIValidationRule {
  readonly id: string;
  validate(document: OpenAPIDocument): readonly OpenAPIValidationDiagnostic[];
}

export interface OpenAPISpecificationValidator {
  readonly metadata: OpenAPIValidationMetadata;
  readonly lifecycle: OpenAPIValidationLifecycle;
  validate(document: OpenAPIDocument): Promise<OpenAPIValidationResult>;
}

export interface OpenAPIDocumentBuilderContext {
  readonly attributes: OpenAPIExtensions;
}

export interface OpenAPIDocumentBuilderMetadata extends OpenAPIMetadata {}

export interface OpenAPIDocumentBuilderLifecycle extends OpenAPILifecycle {}

export interface OpenAPIDocumentBuilderExtension {
  readonly name: string;
  readonly value: OpenAPIExtensionValue;
}

export interface OpenAPIDocumentBuilder {
  info(info: OpenAPIInfo): this;
  server(server: OpenAPIServer): this;
  path(path: OpenAPIPath): this;
  component(component: OpenAPIComponents): this;
  build(): OpenAPIDocument;
}

export interface OpenAPIGenerationContext {
  readonly attributes: OpenAPIExtensions;
}

export interface OpenAPIGenerationMetadata extends OpenAPIMetadata {}

export interface OpenAPIGenerationLifecycle extends OpenAPILifecycle {}

export interface OpenAPIGenerationResult {
  readonly document: OpenAPIDocument;
  readonly artifact: Readonly<Record<string, unknown>>;
  readonly metadata: OpenAPIGenerationMetadata;
}

export interface OpenAPISpecificationGenerator {
  readonly metadata: OpenAPIGenerationMetadata;
  readonly lifecycle: OpenAPIGenerationLifecycle;
  generate(document: OpenAPIDocument): Promise<OpenAPIGenerationResult>;
}

export interface OpenAPIToolAdapterCapabilities {
  readonly renderDocumentation: boolean;
  readonly exportSpecification: boolean;
  readonly validateSpecification: boolean;
}

export interface OpenAPIToolAdapterMetadata extends OpenAPIMetadata {
  readonly name: string;
}

export interface OpenAPIToolAdapterLifecycle extends OpenAPILifecycle {}

export interface OpenAPIToolAdapter {
  readonly metadata: OpenAPIToolAdapterMetadata;
  readonly capabilities: OpenAPIToolAdapterCapabilities;
  readonly lifecycle: OpenAPIToolAdapterLifecycle;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
}

export interface OpenAPIToolAdapterRegistry extends OpenAPIComponentRegistry<OpenAPIToolAdapter> {}

export const openAPIMetadata = (description?: string): OpenAPIMetadata => ({
  ...(description === undefined ? {} : { description }),
  extensions: {},
});

export const openAPILifecycle = (): OpenAPILifecycle => ({
  state: 'created',
});

export const createOpenAPIComponents = (metadata: OpenAPIComponentMetadata = openAPIMetadata(), lifecycle: OpenAPIComponentLifecycle = openAPILifecycle()): OpenAPIComponents => ({
  schemas: new InMemoryOpenAPIComponentRegistry<OpenAPISchema>(),
  parameters: new InMemoryOpenAPIComponentRegistry<OpenAPIParameter>(),
  requestBodies: new InMemoryOpenAPIComponentRegistry<OpenAPIRequestBody>(),
  responses: new InMemoryOpenAPIComponentRegistry<OpenAPIResponse>(),
  metadata,
  lifecycle,
});

export class DefaultOpenAPIDocumentBuilder implements OpenAPIDocumentBuilder {
  private infoValue: OpenAPIInfo | undefined;
  private readonly serverValues: OpenAPIServer[] = [];
  private readonly pathValues: OpenAPIPath[] = [];
  private componentValue: OpenAPIComponents | undefined;

  public constructor(private readonly version: OpenAPIVersion, private readonly metadata: OpenAPIDocumentMetadata = openAPIMetadata()) {}

  public info(info: OpenAPIInfo): this {
    this.infoValue = info;
    return this;
  }

  public server(server: OpenAPIServer): this {
    this.serverValues.push(server);
    return this;
  }

  public path(path: OpenAPIPath): this {
    this.pathValues.push(path);
    return this;
  }

  public component(component: OpenAPIComponents): this {
    this.componentValue = component;
    return this;
  }

  public build(): OpenAPIDocument {
    if (this.infoValue === undefined) {
      throw new Error('OpenAPI document info is required.');
    }
    return {
      openapi: this.version,
      info: this.infoValue,
      servers: [...this.serverValues],
      paths: [...this.pathValues],
      components: this.componentValue ?? createOpenAPIComponents(),
      tags: [],
      examples: [],
      metadata: this.metadata,
      lifecycle: openAPILifecycle(),
      extensions: [],
    };
  }
}

export const createOpenAPIDocumentBuilder = (version: OpenAPIVersion, metadata: OpenAPIDocumentBuilderMetadata = openAPIMetadata()): OpenAPIDocumentBuilder =>
  new DefaultOpenAPIDocumentBuilder(version, metadata);

export const createOpenAPISpecificationValidator = (
  rules: readonly OpenAPIValidationRule[],
  metadata: OpenAPIValidationMetadata = openAPIMetadata(),
  lifecycle: OpenAPIValidationLifecycle = openAPILifecycle(),
): OpenAPISpecificationValidator => ({
  metadata,
  lifecycle,
  async validate(document) {
    const diagnostics = rules.flatMap((rule) => rule.validate(document));
    return { valid: diagnostics.every((diagnostic) => diagnostic.severity !== 'error'), diagnostics, metadata };
  },
});

export const createOpenAPISpecificationGenerator = (
  metadata: OpenAPIGenerationMetadata = openAPIMetadata(),
  lifecycle: OpenAPIGenerationLifecycle = openAPILifecycle(),
): OpenAPISpecificationGenerator => ({
  metadata,
  lifecycle,
  async generate(document) {
    return { document, artifact: { openapi: document.openapi.version, info: { title: document.info.title, version: document.info.version } }, metadata };
  },
});

export const createOpenAPIToolAdapterRegistry = (): OpenAPIToolAdapterRegistry => new InMemoryOpenAPIComponentRegistry<OpenAPIToolAdapter>();
