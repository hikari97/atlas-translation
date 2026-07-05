import type { ResponseAttributes, ResponseLifecycleRecord } from './shared';

export interface ResponseHeader {
  readonly name: string;
  readonly values: readonly string[];
  readonly attributes: ResponseAttributes;
}

export interface ResponseHeaderCollection {
  has(name: string): boolean;
  get(name: string): string | undefined;
  set(name: string, value: string): this;
  append(name: string, value: string): this;
  remove(name: string): this;
  clear(): this;
  entries(): readonly ResponseHeader[];
}

export interface ResponseHeaderMetadata {
  readonly attributes: ResponseAttributes;
}

export interface ResponseHeaderLifecycle extends ResponseLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface ResponseHeaders extends ResponseHeaderCollection {
  readonly metadata: ResponseHeaderMetadata;
  readonly lifecycle: ResponseHeaderLifecycle;
}

const normalizeResponseHeaderName = (name: string): string => name.trim().toLowerCase();

export class DefaultResponseHeaders implements ResponseHeaders {
  private readonly values = new Map<string, ResponseHeader>();

  public readonly lifecycle: ResponseHeaderLifecycle;

  public constructor(headers: readonly ResponseHeader[] = [], public readonly metadata: ResponseHeaderMetadata = { attributes: {} }, now: Date = new Date()) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
    headers.forEach((header) => this.values.set(normalizeResponseHeaderName(header.name), header));
  }

  public has(name: string): boolean {
    return this.values.has(normalizeResponseHeaderName(name));
  }

  public get(name: string): string | undefined {
    return this.values.get(normalizeResponseHeaderName(name))?.values[0];
  }

  public set(name: string, value: string): this {
    this.values.set(normalizeResponseHeaderName(name), { name, values: [value], attributes: {} });
    return this;
  }

  public append(name: string, value: string): this {
    const key = normalizeResponseHeaderName(name);
    const current = this.values.get(key);
    this.values.set(key, {
      name,
      values: [...(current?.values ?? []), value],
      attributes: current?.attributes ?? {},
    });
    return this;
  }

  public remove(name: string): this {
    this.values.delete(normalizeResponseHeaderName(name));
    return this;
  }

  public clear(): this {
    this.values.clear();
    return this;
  }

  public entries(): readonly ResponseHeader[] {
    return Array.from(this.values.values());
  }
}
