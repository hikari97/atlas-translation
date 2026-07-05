import type { HttpAttributes } from './shared';

export type HttpStatusCategory = 'informational' | 'success' | 'redirection' | 'client-error' | 'server-error' | 'custom';

export interface HttpStatusMetadata {
  readonly attributes: HttpAttributes;
}

export interface HttpStatus {
  readonly code: number;
  readonly phrase: string;
  readonly category: HttpStatusCategory;
  readonly metadata: HttpStatusMetadata;
}

export interface HttpStatusLookup {
  lookup(code: number): HttpStatus | undefined;
}

export interface HttpStatusRegistry extends HttpStatusLookup {
  register(status: HttpStatus): void;
  entries(): readonly HttpStatus[];
}

export const getHttpStatusCategory = (code: number): HttpStatusCategory => {
  if (code >= 100 && code < 200) {
    return 'informational';
  }
  if (code >= 200 && code < 300) {
    return 'success';
  }
  if (code >= 300 && code < 400) {
    return 'redirection';
  }
  if (code >= 400 && code < 500) {
    return 'client-error';
  }
  if (code >= 500 && code < 600) {
    return 'server-error';
  }
  return 'custom';
};

export class DefaultHttpStatusRegistry implements HttpStatusRegistry {
  private readonly statuses = new Map<number, HttpStatus>();

  public constructor(statuses: readonly HttpStatus[] = STANDARD_HTTP_STATUSES) {
    statuses.forEach((status) => this.register(status));
  }

  public register(status: HttpStatus): void {
    this.statuses.set(status.code, status);
  }

  public lookup(code: number): HttpStatus | undefined {
    return this.statuses.get(code);
  }

  public entries(): readonly HttpStatus[] {
    return Array.from(this.statuses.values());
  }
}

export const createHttpStatus = (code: number, phrase: string, attributes: HttpAttributes = {}): HttpStatus => ({
  code,
  phrase,
  category: getHttpStatusCategory(code),
  metadata: { attributes },
});

export const STANDARD_HTTP_STATUSES: readonly HttpStatus[] = [
  createHttpStatus(100, 'Continue'),
  createHttpStatus(101, 'Switching Protocols'),
  createHttpStatus(200, 'OK'),
  createHttpStatus(201, 'Created'),
  createHttpStatus(202, 'Accepted'),
  createHttpStatus(204, 'No Content'),
  createHttpStatus(301, 'Moved Permanently'),
  createHttpStatus(302, 'Found'),
  createHttpStatus(304, 'Not Modified'),
  createHttpStatus(400, 'Bad Request'),
  createHttpStatus(401, 'Unauthorized'),
  createHttpStatus(403, 'Forbidden'),
  createHttpStatus(404, 'Not Found'),
  createHttpStatus(409, 'Conflict'),
  createHttpStatus(422, 'Unprocessable Content'),
  createHttpStatus(500, 'Internal Server Error'),
  createHttpStatus(502, 'Bad Gateway'),
  createHttpStatus(503, 'Service Unavailable'),
];
