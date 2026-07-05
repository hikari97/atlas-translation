import type { ResponseAttributes, ResponseLifecycleRecord } from './shared';

export type ResponseBodyType = 'empty' | 'json' | 'xml' | 'plain-text' | 'html' | 'binary' | 'file' | 'stream' | 'custom';

export interface ResponseBodyContent {
  readonly value: unknown;
  readonly contentType: string | undefined;
  readonly contentLength: number;
}

export interface ResponseBodyMetadata {
  readonly attributes: ResponseAttributes;
}

export interface ResponseBodyLifecycle extends ResponseLifecycleRecord<'created' | 'available' | 'consumed' | 'disposed'> {}

export interface ResponseBody {
  readonly type: ResponseBodyType;
  readonly content: ResponseBodyContent;
  readonly metadata: ResponseBodyMetadata;
  readonly lifecycle: ResponseBodyLifecycle;
  isEmpty(): boolean;
  size(): number;
}

export class DefaultResponseBody implements ResponseBody {
  public readonly lifecycle: ResponseBodyLifecycle;

  public constructor(
    public readonly type: ResponseBodyType,
    public readonly content: ResponseBodyContent,
    public readonly metadata: ResponseBodyMetadata = { attributes: {} },
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

export const createEmptyResponseBody = (): ResponseBody =>
  new DefaultResponseBody('empty', {
    value: undefined,
    contentType: undefined,
    contentLength: 0,
  });
