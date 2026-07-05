import {
  DefaultOpenAPIDocumentBuilder,
  InMemoryOpenAPIComponentRegistry,
  createOpenAPIComponents,
  createOpenAPIDocumentBuilder,
  createOpenAPISpecificationGenerator,
  createOpenAPISpecificationValidator,
  createOpenAPIToolAdapterRegistry,
  openAPILifecycle,
  openAPIMetadata,
  type OpenAPIComponents,
  type OpenAPIDocument,
  type OpenAPIExample,
  type OpenAPIInfo,
  type OpenAPIOperation,
  type OpenAPIParameter,
  type OpenAPIPath,
  type OpenAPIRequestBody,
  type OpenAPIResponse,
  type OpenAPISchema,
  type OpenAPISecurity,
  type OpenAPIServer,
  type OpenAPITag,
  type OpenAPIToolAdapter,
  type OpenAPIValidationRule,
  type OpenAPIVersion,
} from '../src';

const metadata = openAPIMetadata('Atlas API contract');
const lifecycle = openAPILifecycle();

const version: OpenAPIVersion = {
  version: '3.1.0',
  metadata,
  compatibility: { major: 3, minor: 1, patch: 0 },
  capabilities: ['schemas', 'components', 'security', 'extensions'],
};

const info: OpenAPIInfo = {
  title: 'Atlas API',
  summary: 'Atlas backend API',
  description: 'Provider-independent API contract.',
  version: '0.1.0',
  contact: { name: 'Atlas', email: 'team@example.test' },
  license: { name: 'MIT', identifier: 'MIT' },
  metadata,
  extensions: [],
};

const server: OpenAPIServer = {
  url: 'https://api.example.test',
  description: 'Test server',
  variables: [{ name: 'tenant', defaultValue: 'atlas', enumValues: ['atlas'] }],
  environment: 'test',
  metadata,
  lifecycle,
};

const schema: OpenAPISchema = {
  name: 'User',
  type: 'object',
  metadata,
  properties: {},
  required: ['id'],
  extensions: [],
};

const parameter: OpenAPIParameter = {
  name: 'id',
  location: 'path',
  required: true,
  schema,
  metadata,
  extensions: [],
};

const requestBody: OpenAPIRequestBody = {
  required: true,
  content: [{ mediaType: 'application/json', schema }],
  metadata,
  extensions: [],
};

const response: OpenAPIResponse = {
  status: 200,
  description: 'Successful response',
  content: [{ mediaType: 'application/json', schema }],
  headers: [{ name: 'x-request-id', schema }],
  metadata,
  extensions: [],
};

const operation: OpenAPIOperation = {
  operationId: 'getUser',
  method: 'get',
  metadata,
  parameters: [parameter],
  requestBody,
  responses: [response],
  lifecycle,
  extensions: [],
};

const path: OpenAPIPath = {
  path: '/users/{id}',
  operations: [operation],
  parameters: [parameter],
  metadata,
  lifecycle,
  extensions: [],
};

const components: OpenAPIComponents = createOpenAPIComponents(metadata, lifecycle);
components.schemas.register('User', schema);
components.parameters.register('UserId', parameter);
components.requestBodies.register('UserRequest', requestBody);
components.responses.register('UserResponse', response);
components.schemas.resolve('User')?.type.toUpperCase();

const security: OpenAPISecurity = {
  schemes: [{ name: 'bearerAuth', type: 'http', description: 'Bearer token', scopes: [] }],
  requirements: [{ schemeName: 'bearerAuth', scopes: [] }],
  metadata,
};

const tag: OpenAPITag = {
  name: 'Users',
  description: 'User operations',
  group: { name: 'Core', tags: ['Users'] },
  externalDocumentation: { url: 'https://docs.example.test' },
  metadata,
  extensions: [],
};

const example: OpenAPIExample = {
  name: 'User Example',
  summary: 'Example',
  value: { id: 'user-1' },
  metadata,
  extensions: [],
};

const document: OpenAPIDocument = {
  openapi: version,
  info,
  servers: [server],
  paths: [path],
  components,
  security,
  tags: [tag],
  examples: [example],
  metadata,
  lifecycle,
  extensions: [],
};

document.info.title.toUpperCase();
document.paths[0]?.operations[0]?.operationId.toUpperCase();

const builder = createOpenAPIDocumentBuilder(version).info(info).server(server).path(path).component(components);
const builtDocument = builder.build();
builtDocument.openapi.version.toUpperCase();

const explicitBuilder = new DefaultOpenAPIDocumentBuilder(version);
explicitBuilder.info(info).build().info.version.toUpperCase();

const rule: OpenAPIValidationRule = {
  id: 'requires-info-title',
  validate(candidate) {
    return candidate.info.title.length > 0 ? [] : [{ code: 'info.title.required', message: 'Info title is required.', path: 'info.title', severity: 'error' }];
  },
};

const validator = createOpenAPISpecificationValidator([rule], metadata, lifecycle);
const validationResult = await validator.validate(document);
validationResult.valid.valueOf();

const generator = createOpenAPISpecificationGenerator(metadata, lifecycle);
const generationResult = await generator.generate(document);
generationResult.document.info.title.toUpperCase();
generationResult.artifact.openapi;

const adapter: OpenAPIToolAdapter = {
  metadata: { ...metadata, name: 'test-adapter' },
  capabilities: { renderDocumentation: true, exportSpecification: true, validateSpecification: true },
  lifecycle,
  initialize: async () => undefined,
  shutdown: async () => undefined,
};

const adapterRegistry = createOpenAPIToolAdapterRegistry();
adapterRegistry.register('test-adapter', adapter);
adapterRegistry.resolve('test-adapter')?.metadata.name.toUpperCase();

const exampleRegistry = new InMemoryOpenAPIComponentRegistry<OpenAPIExample>();
exampleRegistry.register('UserExample', example);
exampleRegistry.entries()[0]?.value.name.toUpperCase();
