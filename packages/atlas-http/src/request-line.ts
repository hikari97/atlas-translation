import type { HttpAttributes, HttpLifecycleRecord } from './shared';
import type { HttpMethod } from './method';
import type { HttpProtocol } from './protocol';

export type HttpRequestTargetKind = 'origin-form' | 'absolute-form' | 'authority-form' | 'asterisk-form';

export interface HttpRequestTarget {
  readonly value: string;
  readonly kind: HttpRequestTargetKind;
}

export interface HttpRequestLineMetadata {
  readonly attributes: HttpAttributes;
}

export interface HttpRequestLineLifecycle extends HttpLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface HttpRequestLine {
  readonly method: HttpMethod;
  readonly target: HttpRequestTarget;
  readonly protocol: HttpProtocol;
  readonly metadata: HttpRequestLineMetadata;
  readonly lifecycle: HttpRequestLineLifecycle;
}

export const createHttpRequestTarget = (value: string, kind: HttpRequestTargetKind = 'origin-form'): HttpRequestTarget => ({
  value,
  kind,
});

export const createHttpRequestLine = (
  method: HttpMethod,
  target: HttpRequestTarget,
  protocol: HttpProtocol,
  attributes: HttpAttributes = {},
  now: Date = new Date(),
): HttpRequestLine => ({
  method,
  target,
  protocol,
  metadata: { attributes },
  lifecycle: {
    state: 'active',
    transitions: ['created', 'active'],
    createdAt: now,
    updatedAt: now,
  },
});
