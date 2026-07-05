import type { RequestBody } from './body';
import type { RequestCookies } from './cookies';
import type { RequestFiles } from './files';
import type { RequestHeaders } from './headers';
import type { HttpRequest } from './http-request';
import type { RequestLifecycle } from './lifecycle';
import type { RequestMetadata } from './metadata';
import type { RequestParameters } from './parameters';
import type { RequestQuery } from './query';
import type { RequestSession } from './session';
import type { RequestMutableRegistry, RequestRegistryEntry } from './shared';
import { InMemoryRequestRegistry } from './shared';

export interface RequestContextState {
  readonly requestId: string;
  readonly attributes: readonly RequestRegistryEntry<unknown>[];
  readonly serviceKeys: readonly string[];
}

export interface RequestContextMetadata extends RequestMetadata {}

export interface RequestContextLifecycle extends RequestLifecycle {}

export interface RequestContextStorage extends RequestMutableRegistry<unknown> {}

export interface RequestContextService {
  readonly key: string;
  readonly value: unknown;
}

export interface RequestContext {
  readonly request: HttpRequest;
  readonly headers: RequestHeaders;
  readonly body: RequestBody;
  readonly query: RequestQuery;
  readonly parameters: RequestParameters;
  readonly cookies: RequestCookies;
  readonly files: RequestFiles;
  readonly session: RequestSession;
  readonly metadata: RequestContextMetadata;
  readonly lifecycle: RequestContextLifecycle;
  readonly state: RequestContextState;
  readonly storage: RequestContextStorage;
  services(): readonly RequestContextService[];
}

export const createRequestContext = (
  request: HttpRequest,
  headers: RequestHeaders,
  body: RequestBody,
  query: RequestQuery,
  parameters: RequestParameters,
  cookies: RequestCookies,
  files: RequestFiles,
  session: RequestSession,
  metadata: RequestContextMetadata,
  lifecycle: RequestContextLifecycle,
  state: RequestContextState,
  storage: RequestContextStorage = new InMemoryRequestRegistry<unknown>(),
): RequestContext => ({
  request,
  headers,
  body,
  query,
  parameters,
  cookies,
  files,
  session,
  metadata,
  lifecycle,
  state,
  storage,
  services: () => storage.entries().map((entry) => ({
    key: entry.id,
    value: entry.value,
  })),
});
