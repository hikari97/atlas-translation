import type { ResponseAttachment } from './attachment';
import type { ResponseBody } from './body';
import type { ResponseCache } from './cache';
import type { ResponseCookies } from './cookies';
import type { ResponseHeaders } from './headers';
import type { HttpResponse } from './http-response';
import type { ResponseLifecycle } from './lifecycle';
import type { ResponseMetadata } from './metadata';
import type { ResponseStatus } from './status';
import type { ResponseMutableRegistry, ResponseRegistryEntry } from './shared';
import { InMemoryResponseRegistry } from './shared';

export interface ResponseContextState {
  readonly responseId: string;
  readonly serviceKeys: readonly string[];
  readonly attributes: readonly ResponseRegistryEntry<unknown>[];
}

export interface ResponseContextMetadata extends ResponseMetadata {}

export interface ResponseContextLifecycle extends ResponseLifecycle {}

export interface ResponseContextStorage extends ResponseMutableRegistry<unknown> {}

export interface ResponseContextService {
  readonly key: string;
  readonly value: unknown;
}

export interface ResponseContext {
  readonly response: HttpResponse;
  readonly status: ResponseStatus;
  readonly headers: ResponseHeaders;
  readonly body: ResponseBody;
  readonly cookies: ResponseCookies;
  readonly cache: ResponseCache;
  readonly attachment: ResponseAttachment | undefined;
  readonly metadata: ResponseContextMetadata;
  readonly lifecycle: ResponseContextLifecycle;
  readonly state: ResponseContextState;
  readonly storage: ResponseContextStorage;
  services(): readonly ResponseContextService[];
}

export const createResponseContext = (
  response: HttpResponse,
  status: ResponseStatus,
  headers: ResponseHeaders,
  body: ResponseBody,
  cookies: ResponseCookies,
  cache: ResponseCache,
  attachment: ResponseAttachment | undefined,
  metadata: ResponseContextMetadata,
  lifecycle: ResponseContextLifecycle,
  state: ResponseContextState,
  storage: ResponseContextStorage = new InMemoryResponseRegistry<unknown>(),
): ResponseContext => ({
  response,
  status,
  headers,
  body,
  cookies,
  cache,
  attachment,
  metadata,
  lifecycle,
  state,
  storage,
  services: () => storage.entries().map((entry) => ({
    key: entry.id,
    value: entry.value,
  })),
});
