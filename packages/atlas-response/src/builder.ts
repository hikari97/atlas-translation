import type { HttpHeaders, HttpProtocol, HttpStatus } from '@atlas/atlas-http';
import {
  DefaultHttpHeaders,
  DefaultHttpProtocolRegistry,
  createHttpStatus,
} from '@atlas/atlas-http';
import type { ResponseAttachment } from './attachment';
import type { ResponseBody } from './body';
import { DefaultResponseBody, createEmptyResponseBody } from './body';
import type { ResponseCache } from './cache';
import { createResponseCache } from './cache';
import type { ResponseContext } from './context';
import { createResponseContext } from './context';
import type { ResponseCookie } from './cookies';
import { DefaultResponseCookies } from './cookies';
import type { ResponseHeaders } from './headers';
import { DefaultResponseHeaders } from './headers';
import type { HttpResponse } from './http-response';
import { createHttpResponse, createHttpResponseIdentity } from './http-response';
import type { ResponseLifecycle } from './lifecycle';
import { DefaultResponseLifecycle } from './lifecycle';
import type { ResponseMetadata } from './metadata';
import { DefaultResponseMetadata } from './metadata';
import { createResponseStatus } from './status';

export interface ResponseBuilderState {
  readonly status: HttpStatus;
  readonly headers: HttpHeaders;
  readonly body: ResponseBody;
  readonly protocol: HttpProtocol;
  readonly cookies: DefaultResponseCookies;
  readonly cache: ResponseCache;
  readonly attachment: ResponseAttachment | undefined;
}

export interface ResponseBuilderContext {
  readonly metadata: ResponseMetadata;
  readonly lifecycle: ResponseLifecycle;
  readonly responseContext: ResponseContext;
}

export interface ResponseBuilderResult {
  readonly response: HttpResponse;
  readonly context: ResponseBuilderContext;
}

export interface ResponseBuilder {
  status(code: number): this;
  header(name: string, value: string): this;
  cookie(cookie: ResponseCookie): this;
  cache(policy: ResponseCache): this;
  body(body: ResponseBody): this;
  attachment(attachment: ResponseAttachment): this;
  ok(): this;
  created(): this;
  accepted(): this;
  noContent(): this;
  badRequest(): this;
  unauthorized(): this;
  forbidden(): this;
  notFound(): this;
  conflict(): this;
  unprocessable(): this;
  internalServerError(): this;
  serviceUnavailable(): this;
  badGateway(): this;
  json(value: unknown): this;
  text(value: string): this;
  html(value: string): this;
  xml(value: string): this;
  build(): HttpResponse;
  buildResult(): ResponseBuilderResult;
}

const defaultProtocol = (): HttpProtocol => {
  const protocol = new DefaultHttpProtocolRegistry().lookup('HTTP/1.1');
  if (protocol === undefined) {
    throw new Error('HTTP/1.1 protocol must be registered.');
  }
  return protocol;
};

export class DefaultResponseBuilder implements ResponseBuilder {
  private statusValue: HttpStatus = createHttpStatus(200, 'OK');

  private headersValue: HttpHeaders = new DefaultHttpHeaders();

  private responseHeadersValue: ResponseHeaders = new DefaultResponseHeaders();

  private bodyValue: ResponseBody = createEmptyResponseBody();

  private protocolValue: HttpProtocol = defaultProtocol();

  private cookiesValue = new DefaultResponseCookies();

  private cacheValue = createResponseCache('no-cache');

  private attachmentValue: ResponseAttachment | undefined;

  public constructor(
    private readonly metadata: ResponseMetadata = new DefaultResponseMetadata(),
    private readonly lifecycle: ResponseLifecycle = new DefaultResponseLifecycle(metadata),
  ) {}

  public status(code: number): this {
    this.statusValue = createHttpStatus(code, String(code));
    return this;
  }

  public header(name: string, value: string): this {
    this.headersValue.set({ name, value, attributes: {} });
    this.responseHeadersValue.set(name, value);
    return this;
  }

  public cookie(cookie: ResponseCookie): this {
    this.cookiesValue.add(cookie);
    return this;
  }

  public cache(policy: ResponseCache): this {
    this.cacheValue = policy;
    return this;
  }

  public body(body: ResponseBody): this {
    this.bodyValue = body;
    return this;
  }

  public attachment(attachment: ResponseAttachment): this {
    this.attachmentValue = attachment;
    return this;
  }

  public ok(): this {
    this.statusValue = createHttpStatus(200, 'OK');
    return this;
  }

  public created(): this {
    this.statusValue = createHttpStatus(201, 'Created');
    return this;
  }

  public accepted(): this {
    this.statusValue = createHttpStatus(202, 'Accepted');
    return this;
  }

  public noContent(): this {
    this.statusValue = createHttpStatus(204, 'No Content');
    return this;
  }

  public badRequest(): this {
    this.statusValue = createHttpStatus(400, 'Bad Request');
    return this;
  }

  public unauthorized(): this {
    this.statusValue = createHttpStatus(401, 'Unauthorized');
    return this;
  }

  public forbidden(): this {
    this.statusValue = createHttpStatus(403, 'Forbidden');
    return this;
  }

  public notFound(): this {
    this.statusValue = createHttpStatus(404, 'Not Found');
    return this;
  }

  public conflict(): this {
    this.statusValue = createHttpStatus(409, 'Conflict');
    return this;
  }

  public unprocessable(): this {
    this.statusValue = createHttpStatus(422, 'Unprocessable Content');
    return this;
  }

  public internalServerError(): this {
    this.statusValue = createHttpStatus(500, 'Internal Server Error');
    return this;
  }

  public serviceUnavailable(): this {
    this.statusValue = createHttpStatus(503, 'Service Unavailable');
    return this;
  }

  public badGateway(): this {
    this.statusValue = createHttpStatus(502, 'Bad Gateway');
    return this;
  }

  public json(value: unknown): this {
    this.bodyValue = new DefaultResponseBody('json', {
      value,
      contentType: 'application/json',
      contentLength: 0,
    });
    return this;
  }

  public text(value: string): this {
    this.bodyValue = new DefaultResponseBody('plain-text', {
      value,
      contentType: 'text/plain',
      contentLength: value.length,
    });
    return this;
  }

  public html(value: string): this {
    this.bodyValue = new DefaultResponseBody('html', {
      value,
      contentType: 'text/html',
      contentLength: value.length,
    });
    return this;
  }

  public xml(value: string): this {
    this.bodyValue = new DefaultResponseBody('xml', {
      value,
      contentType: 'application/xml',
      contentLength: value.length,
    });
    return this;
  }

  public build(): HttpResponse {
    return this.composeResponse();
  }

  public buildResult(): ResponseBuilderResult {
    const response = this.composeResponse();
    const responseContext = createResponseContext(
      response,
      createResponseStatus(this.statusValue.code, this.statusValue.phrase, this.statusValue.metadata.attributes),
      this.responseHeadersValue,
      this.bodyValue,
      this.cookiesValue,
      this.cacheValue,
      this.attachmentValue,
      this.metadata,
      this.lifecycle,
      {
        responseId: response.identity.id,
        attributes: [],
        serviceKeys: ['response', 'status', 'headers', 'body', 'cookies', 'cache', 'attachment'],
      },
    );

    return {
      response,
      context: {
        metadata: this.metadata,
        lifecycle: this.lifecycle,
        responseContext,
      },
    };
  }

  private composeResponse(): HttpResponse {
    this.lifecycle.transition('ready');
    return createHttpResponse(
      createHttpResponseIdentity('response', this.statusValue),
      {
        status: this.statusValue,
        headers: this.headersValue,
        body: this.bodyValue,
        protocol: this.protocolValue,
      },
      this.metadata,
      this.lifecycle,
    );
  }
}

export interface ResponseBuilderFactory {
  create(): ResponseBuilder;
}

export const createResponseBuilderFactory = (): ResponseBuilderFactory => ({
  create: () => new DefaultResponseBuilder(),
});
