import type { RequestAttributes, RequestLifecycleRecord } from './shared';

export interface RequestCookie {
  readonly name: string;
  readonly value: string;
  readonly attributes: RequestAttributes;
}

export interface RequestCookieCollection {
  has(name: string): boolean;
  get(name: string): string | undefined;
  keys(): readonly string[];
  values(): readonly RequestCookie[];
}

export interface RequestCookieMetadata {
  readonly attributes: RequestAttributes;
}

export interface RequestCookieLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RequestCookies extends RequestCookieCollection {
  readonly metadata: RequestCookieMetadata;
  readonly lifecycle: RequestCookieLifecycle;
}

export class DefaultRequestCookies implements RequestCookies {
  private readonly cookies = new Map<string, RequestCookie>();

  public readonly lifecycle: RequestCookieLifecycle;

  public constructor(cookies: readonly RequestCookie[] = [], public readonly metadata: RequestCookieMetadata = { attributes: {} }, now: Date = new Date()) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
    cookies.forEach((cookie) => this.cookies.set(cookie.name, cookie));
  }

  public has(name: string): boolean {
    return this.cookies.has(name);
  }

  public get(name: string): string | undefined {
    return this.cookies.get(name)?.value;
  }

  public keys(): readonly string[] {
    return Array.from(this.cookies.keys());
  }

  public values(): readonly RequestCookie[] {
    return Array.from(this.cookies.values());
  }
}
