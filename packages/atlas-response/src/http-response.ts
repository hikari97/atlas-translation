import type { HttpHeaders, HttpProtocol, HttpStatus } from '@atlas/atlas-http';
import type { ResponseBody } from './body';
import type { ResponseLifecycle } from './lifecycle';
import type { ResponseMetadata } from './metadata';

export interface HttpResponseIdentity {
  readonly id: string;
  readonly statusCode: number;
}

export interface HttpResponseMetadata extends ResponseMetadata {}

export interface HttpResponseLifecycle extends ResponseLifecycle {}

export interface HttpResponseComposition {
  readonly status: HttpStatus;
  readonly headers: HttpHeaders;
  readonly body: ResponseBody;
  readonly protocol: HttpProtocol;
}

export interface HttpResponse extends HttpResponseComposition {
  readonly identity: HttpResponseIdentity;
  readonly metadata: HttpResponseMetadata;
  readonly lifecycle: HttpResponseLifecycle;
}

export const createHttpResponseIdentity = (id: string, status: HttpStatus): HttpResponseIdentity => ({
  id,
  statusCode: status.code,
});

export const createHttpResponse = (
  identity: HttpResponseIdentity,
  composition: HttpResponseComposition,
  metadata: HttpResponseMetadata,
  lifecycle: HttpResponseLifecycle,
): HttpResponse => ({
  identity,
  status: composition.status,
  headers: composition.headers,
  body: composition.body,
  protocol: composition.protocol,
  metadata,
  lifecycle,
});
