import type { HttpAttributes, HttpLifecycleRecord } from './shared';
import type { HttpMessageHeaders } from './headers';

export type HttpMessageBodyKind = 'empty' | 'text' | 'json' | 'binary' | 'stream' | 'custom';

export interface HttpMessageBody {
  readonly kind: HttpMessageBodyKind;
  readonly contentType: string | undefined;
  readonly contentLength: number | undefined;
  readonly value: unknown;
}

export interface HttpMessageMetadata {
  readonly attributes: HttpAttributes;
}

export interface HttpMessageLifecycle extends HttpLifecycleRecord<'created' | 'read' | 'updated' | 'disposed'> {}

export interface HttpMessage {
  readonly metadata: HttpMessageMetadata;
  readonly headers: HttpMessageHeaders;
  readonly body: HttpMessageBody;
  readonly lifecycle: HttpMessageLifecycle;
}

export const createEmptyHttpMessageBody = (): HttpMessageBody => ({
  kind: 'empty',
  contentType: undefined,
  contentLength: undefined,
  value: undefined,
});

export const createHttpMessage = (
  headers: HttpMessageHeaders,
  body: HttpMessageBody = createEmptyHttpMessageBody(),
  attributes: HttpAttributes = {},
  now: Date = new Date(),
): HttpMessage => ({
  metadata: { attributes },
  headers,
  body,
  lifecycle: {
    state: 'created',
    transitions: ['created'],
    createdAt: now,
    updatedAt: now,
  },
});
