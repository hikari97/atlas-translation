import type { HttpAttributes, HttpLifecycleRecord } from './shared';

export interface HttpHeader {
  readonly name: string;
  readonly value: string;
  readonly attributes: HttpAttributes;
}

export interface HttpHeaderMetadata {
  readonly attributes: HttpAttributes;
}

export interface HttpHeaderLifecycle extends HttpLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface HttpHeaderCollection {
  has(name: string): boolean;
  get(name: string): HttpHeader | undefined;
  set(header: HttpHeader): void;
  remove(name: string): void;
  entries(): readonly HttpHeader[];
}

export interface HttpHeaders extends HttpHeaderCollection {
  readonly metadata: HttpHeaderMetadata;
  readonly lifecycle: HttpHeaderLifecycle;
}

export interface HttpMessageHeaders extends HttpHeaders {}

export const normalizeHttpHeaderName = (name: string): string => name.trim().toLowerCase();

export class DefaultHttpHeaders implements HttpHeaders {
  private readonly headers = new Map<string, HttpHeader>();

  public readonly metadata: HttpHeaderMetadata;

  public readonly lifecycle: HttpHeaderLifecycle;

  public constructor(headers: readonly HttpHeader[] = [], now: Date = new Date(), attributes: HttpAttributes = {}) {
    this.metadata = { attributes };
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
    headers.forEach((header) => this.set(header));
  }

  public has(name: string): boolean {
    return this.headers.has(normalizeHttpHeaderName(name));
  }

  public get(name: string): HttpHeader | undefined {
    return this.headers.get(normalizeHttpHeaderName(name));
  }

  public set(header: HttpHeader): void {
    this.headers.set(normalizeHttpHeaderName(header.name), header);
  }

  public remove(name: string): void {
    this.headers.delete(normalizeHttpHeaderName(name));
  }

  public entries(): readonly HttpHeader[] {
    return Array.from(this.headers.values());
  }
}
