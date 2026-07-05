import type { RequestAttributes, RequestLifecycleRecord } from './shared';

export type RequestBodyType =
  | 'empty'
  | 'json'
  | 'form-url-encoded'
  | 'multipart-form'
  | 'plain-text'
  | 'xml'
  | 'html'
  | 'binary'
  | 'octet-stream'
  | 'streaming'
  | 'custom';

export interface RequestBodyContent {
  readonly value: unknown;
  readonly contentType: string | undefined;
  readonly contentLength: number;
}

export interface RequestBodyMetadata {
  readonly attributes: RequestAttributes;
}

export interface RequestBodyLifecycle extends RequestLifecycleRecord<'created' | 'available' | 'consumed' | 'disposed'> {}

export interface RequestBody {
  readonly type: RequestBodyType;
  readonly content: RequestBodyContent;
  readonly metadata: RequestBodyMetadata;
  readonly lifecycle: RequestBodyLifecycle;
  isEmpty(): boolean;
  size(): number;
}

export class DefaultRequestBody implements RequestBody {
  public readonly lifecycle: RequestBodyLifecycle;

  public constructor(
    public readonly type: RequestBodyType,
    public readonly content: RequestBodyContent,
    public readonly metadata: RequestBodyMetadata = { attributes: {} },
    now: Date = new Date(),
  ) {
    this.lifecycle = {
      state: content.contentLength === 0 ? 'created' : 'available',
      transitions: content.contentLength === 0 ? ['created'] : ['created', 'available'],
      createdAt: now,
      updatedAt: now,
    };
  }

  public isEmpty(): boolean {
    return this.content.contentLength === 0;
  }

  public size(): number {
    return this.content.contentLength;
  }
}

export const createEmptyRequestBody = (): RequestBody =>
  new DefaultRequestBody('empty', {
    value: undefined,
    contentType: undefined,
    contentLength: 0,
  });
