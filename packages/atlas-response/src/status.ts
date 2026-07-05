import type { HttpStatus } from '@atlas/atlas-http';
import type { ResponseAttributes } from './shared';

export type ResponseStatusCategory = 'informational' | 'success' | 'redirection' | 'client-error' | 'server-error' | 'custom';

export type ResponseStatusCode = number;

export interface ResponseStatusMetadata {
  readonly attributes: ResponseAttributes;
}

export interface ResponseStatus {
  readonly code: ResponseStatusCode;
  readonly phrase: string;
  readonly category: ResponseStatusCategory;
  readonly metadata: ResponseStatusMetadata;
  isInformational(): boolean;
  isSuccess(): boolean;
  isRedirect(): boolean;
  isClientError(): boolean;
  isServerError(): boolean;
}

export interface ResponseStatusRegistry {
  register(status: ResponseStatus): void;
  lookup(code: ResponseStatusCode): ResponseStatus | undefined;
  entries(): readonly ResponseStatus[];
}

export const getResponseStatusCategory = (code: ResponseStatusCode): ResponseStatusCategory => {
  if (code >= 100 && code < 200) return 'informational';
  if (code >= 200 && code < 300) return 'success';
  if (code >= 300 && code < 400) return 'redirection';
  if (code >= 400 && code < 500) return 'client-error';
  if (code >= 500 && code < 600) return 'server-error';
  return 'custom';
};

export const createResponseStatus = (
  code: ResponseStatusCode,
  phrase: string,
  attributes: ResponseAttributes = {},
): ResponseStatus => {
  const category = getResponseStatusCategory(code);
  return {
    code,
    phrase,
    category,
    metadata: { attributes },
    isInformational: () => category === 'informational',
    isSuccess: () => category === 'success',
    isRedirect: () => category === 'redirection',
    isClientError: () => category === 'client-error',
    isServerError: () => category === 'server-error',
  };
};

export const createResponseStatusFromHttpStatus = (status: HttpStatus): ResponseStatus =>
  createResponseStatus(status.code, status.phrase, status.metadata.attributes);

export class DefaultResponseStatusRegistry implements ResponseStatusRegistry {
  private readonly values = new Map<ResponseStatusCode, ResponseStatus>();

  public constructor(statuses: readonly ResponseStatus[] = []) {
    statuses.forEach((status) => this.register(status));
  }

  public register(status: ResponseStatus): void {
    this.values.set(status.code, status);
  }

  public lookup(code: ResponseStatusCode): ResponseStatus | undefined {
    return this.values.get(code);
  }

  public entries(): readonly ResponseStatus[] {
    return Array.from(this.values.values());
  }
}
