import type { HttpHeaders } from '@atlas/atlas-http';
import type { RequestAttributes, RequestLifecycleRecord } from './shared';

export interface RequestHeader {
  readonly name: string;
  readonly value: string;
  readonly attributes: RequestAttributes;
}

export interface RequestHeaderCollection {
  has(name: string): boolean;
  get(name: string): string | undefined;
  entries(): readonly RequestHeader[];
}

export interface RequestHeaderMetadata {
  readonly attributes: RequestAttributes;
}

export interface RequestHeaderLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RequestHeaders extends RequestHeaderCollection {
  readonly metadata: RequestHeaderMetadata;
  readonly lifecycle: RequestHeaderLifecycle;
  authorization(): string | undefined;
  contentType(): string | undefined;
  accept(): string | undefined;
  host(): string | undefined;
  userAgent(): string | undefined;
}

export class DefaultRequestHeaders implements RequestHeaders {
  public readonly lifecycle: RequestHeaderLifecycle;

  public constructor(
    private readonly headers: HttpHeaders,
    public readonly metadata: RequestHeaderMetadata = { attributes: {} },
    now: Date = new Date(),
  ) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
  }

  public has(name: string): boolean {
    return this.headers.has(name);
  }

  public get(name: string): string | undefined {
    return this.headers.get(name)?.value;
  }

  public entries(): readonly RequestHeader[] {
    return this.headers.entries().map((header) => ({
      name: header.name,
      value: header.value,
      attributes: header.attributes,
    }));
  }

  public authorization(): string | undefined {
    return this.get('authorization');
  }

  public contentType(): string | undefined {
    return this.get('content-type');
  }

  public accept(): string | undefined {
    return this.get('accept');
  }

  public host(): string | undefined {
    return this.get('host');
  }

  public userAgent(): string | undefined {
    return this.get('user-agent');
  }
}
