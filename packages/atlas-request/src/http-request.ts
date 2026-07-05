import type { HttpHeaders, HttpProtocol, HttpRequestLine } from '@atlas/atlas-http';
import type { RequestLifecycle } from './lifecycle';
import type { RequestMetadata } from './metadata';
import type { RequestRegistryEntry } from './shared';

export interface HttpRequestIdentity {
  readonly id: string;
  readonly method: string;
  readonly target: string;
}

export interface HttpRequestMetadata extends RequestMetadata {}

export interface HttpRequestLifecycle extends RequestLifecycle {}

export interface HttpRequestComposition {
  readonly line: HttpRequestLine;
  readonly headers: HttpHeaders;
  readonly protocol: HttpProtocol;
  readonly context: readonly RequestRegistryEntry<unknown>[];
}

export interface HttpRequest extends HttpRequestComposition {
  readonly identity: HttpRequestIdentity;
  readonly metadata: HttpRequestMetadata;
  readonly lifecycle: HttpRequestLifecycle;
}

export const createHttpRequestIdentity = (
  id: string,
  line: HttpRequestLine,
): HttpRequestIdentity => ({
  id,
  method: line.method.name,
  target: line.target.value,
});

export const createHttpRequest = (
  identity: HttpRequestIdentity,
  composition: HttpRequestComposition,
  metadata: HttpRequestMetadata,
  lifecycle: HttpRequestLifecycle,
): HttpRequest => ({
  identity,
  line: composition.line,
  headers: composition.headers,
  protocol: composition.protocol,
  context: composition.context,
  metadata,
  lifecycle,
});
