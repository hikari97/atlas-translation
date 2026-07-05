import type { ResponseAttributes, ResponseLifecycleRecord } from './shared';

export type ResponseCookieSameSite = 'strict' | 'lax' | 'none';

export interface ResponseCookieMetadata {
  readonly domain: string | undefined;
  readonly path: string | undefined;
  readonly maxAge: number | undefined;
  readonly expires: Date | undefined;
  readonly httpOnly: boolean;
  readonly secure: boolean;
  readonly sameSite: ResponseCookieSameSite | undefined;
  readonly attributes: ResponseAttributes;
}

export interface ResponseCookie {
  readonly name: string;
  readonly value: string;
  readonly metadata: ResponseCookieMetadata;
}

export interface ResponseCookieCollection {
  add(cookie: ResponseCookie): this;
  remove(name: string): this;
  clear(): this;
  has(name: string): boolean;
  get(name: string): ResponseCookie | undefined;
  values(): readonly ResponseCookie[];
}

export interface ResponseCookieLifecycle extends ResponseLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface ResponseCookies extends ResponseCookieCollection {
  readonly metadata: ResponseAttributes;
  readonly lifecycle: ResponseCookieLifecycle;
}

export class DefaultResponseCookies implements ResponseCookies {
  private readonly cookies = new Map<string, ResponseCookie>();

  public readonly lifecycle: ResponseCookieLifecycle;

  public constructor(cookies: readonly ResponseCookie[] = [], public readonly metadata: ResponseAttributes = {}, now: Date = new Date()) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
    cookies.forEach((cookie) => this.cookies.set(cookie.name, cookie));
  }

  public add(cookie: ResponseCookie): this {
    this.cookies.set(cookie.name, cookie);
    return this;
  }

  public remove(name: string): this {
    this.cookies.delete(name);
    return this;
  }

  public clear(): this {
    this.cookies.clear();
    return this;
  }

  public has(name: string): boolean {
    return this.cookies.has(name);
  }

  public get(name: string): ResponseCookie | undefined {
    return this.cookies.get(name);
  }

  public values(): readonly ResponseCookie[] {
    return Array.from(this.cookies.values());
  }
}
