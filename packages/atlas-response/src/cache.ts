import type { ResponseAttributes, ResponseLifecycleRecord } from './shared';

export type ResponseCachePolicy = 'no-cache' | 'no-store' | 'private' | 'public' | 'custom';

export interface ResponseCacheDirective {
  readonly name: string;
  readonly value: string | number | boolean | undefined;
}

export interface ResponseCacheMetadata {
  readonly attributes: ResponseAttributes;
}

export interface ResponseCacheLifecycle extends ResponseLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface ResponseCache {
  readonly policy: ResponseCachePolicy;
  readonly directives: readonly ResponseCacheDirective[];
  readonly metadata: ResponseCacheMetadata;
  readonly lifecycle: ResponseCacheLifecycle;
}

export const createResponseCache = (
  policy: ResponseCachePolicy,
  directives: readonly ResponseCacheDirective[] = [],
  metadata: ResponseCacheMetadata = { attributes: {} },
  now: Date = new Date(),
): ResponseCache => ({
  policy,
  directives,
  metadata,
  lifecycle: {
    state: 'active',
    transitions: ['created', 'active'],
    createdAt: now,
    updatedAt: now,
  },
});
