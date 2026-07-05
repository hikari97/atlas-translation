import type { HttpAttributes } from './shared';

export type HttpMethodCategory = 'safe' | 'unsafe' | 'idempotent' | 'cacheable' | 'extension';

export interface HttpMethodCapabilities {
  readonly safe: boolean;
  readonly idempotent: boolean;
  readonly cacheable: boolean;
}

export interface HttpMethodMetadata {
  readonly description: string;
  readonly attributes: HttpAttributes;
}

export interface HttpMethod {
  readonly name: string;
  readonly metadata: HttpMethodMetadata;
  readonly category: HttpMethodCategory;
  readonly capabilities: HttpMethodCapabilities;
}

export interface HttpMethodLookup {
  lookup(name: string): HttpMethod | undefined;
}

export interface HttpMethodRegistry extends HttpMethodLookup {
  register(method: HttpMethod): void;
  entries(): readonly HttpMethod[];
}

export class DefaultHttpMethodRegistry implements HttpMethodRegistry {
  private readonly methods = new Map<string, HttpMethod>();

  public constructor(methods: readonly HttpMethod[] = STANDARD_HTTP_METHODS) {
    methods.forEach((method) => this.register(method));
  }

  public register(method: HttpMethod): void {
    this.methods.set(method.name.toUpperCase(), method);
  }

  public lookup(name: string): HttpMethod | undefined {
    return this.methods.get(name.toUpperCase());
  }

  public entries(): readonly HttpMethod[] {
    return Array.from(this.methods.values());
  }
}

export const createHttpMethod = (
  name: string,
  category: HttpMethodCategory,
  description: string,
  capabilities: HttpMethodCapabilities,
  attributes: HttpAttributes = {},
): HttpMethod => ({
  name: name.toUpperCase(),
  category,
  capabilities,
  metadata: { description, attributes },
});

export const STANDARD_HTTP_METHODS: readonly HttpMethod[] = [
  createHttpMethod('GET', 'safe', 'Retrieve a resource representation.', {
    safe: true,
    idempotent: true,
    cacheable: true,
  }),
  createHttpMethod('POST', 'unsafe', 'Submit a resource representation for processing.', {
    safe: false,
    idempotent: false,
    cacheable: true,
  }),
  createHttpMethod('PUT', 'idempotent', 'Replace a resource representation.', {
    safe: false,
    idempotent: true,
    cacheable: false,
  }),
  createHttpMethod('PATCH', 'unsafe', 'Apply a partial resource modification.', {
    safe: false,
    idempotent: false,
    cacheable: false,
  }),
  createHttpMethod('DELETE', 'idempotent', 'Remove a resource representation.', {
    safe: false,
    idempotent: true,
    cacheable: false,
  }),
  createHttpMethod('HEAD', 'safe', 'Retrieve response metadata.', {
    safe: true,
    idempotent: true,
    cacheable: true,
  }),
  createHttpMethod('OPTIONS', 'safe', 'Describe communication options.', {
    safe: true,
    idempotent: true,
    cacheable: false,
  }),
  createHttpMethod('TRACE', 'safe', 'Perform a message loop-back test.', {
    safe: true,
    idempotent: true,
    cacheable: false,
  }),
  createHttpMethod('CONNECT', 'unsafe', 'Establish a tunnel to a server.', {
    safe: false,
    idempotent: false,
    cacheable: false,
  }),
];
