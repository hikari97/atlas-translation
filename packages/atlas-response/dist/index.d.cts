import { HttpStatus, HttpHeaders, HttpProtocol } from '@atlas/atlas-http';

type ResponseRecordValue = string | number | boolean | null | readonly ResponseRecordValue[] | {
    readonly [key: string]: ResponseRecordValue;
};
type ResponseAttributes = Readonly<Record<string, ResponseRecordValue>>;
interface ResponseIdentity {
    readonly id: string;
    readonly name: string;
}
interface ResponseTimestamped {
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
interface ResponseLifecycleRecord<TState extends string> extends ResponseTimestamped {
    readonly state: TState;
    readonly transitions: readonly string[];
}
interface ResponseRegistryEntry<TValue> extends ResponseIdentity {
    readonly value: TValue;
}
interface ResponseReadonlyRegistry<TValue> {
    has(id: string): boolean;
    get(id: string): TValue | undefined;
    entries(): readonly ResponseRegistryEntry<TValue>[];
}
interface ResponseMutableRegistry<TValue> extends ResponseReadonlyRegistry<TValue> {
    register(entry: ResponseRegistryEntry<TValue>): void;
    remove(id: string): void;
}
declare class InMemoryResponseRegistry<TValue> implements ResponseMutableRegistry<TValue> {
    private readonly values;
    has(id: string): boolean;
    get(id: string): TValue | undefined;
    register(entry: ResponseRegistryEntry<TValue>): void;
    remove(id: string): void;
    entries(): readonly ResponseRegistryEntry<TValue>[];
}

interface ResponseMetadataEntry<TValue = unknown> {
    readonly key: string;
    readonly value: TValue;
    readonly attributes: ResponseAttributes;
}
interface ResponseMetadataLifecycle extends ResponseLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface ResponseMetadataRegistry extends ResponseMutableRegistry<ResponseMetadataEntry> {
}
interface ResponseMetadataCollection {
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue, attributes?: ResponseAttributes): void;
    remove(key: string): void;
    entries(): readonly ResponseMetadataEntry[];
}
interface ResponseMetadata extends ResponseMetadataCollection {
    readonly registry: ResponseMetadataRegistry;
    readonly lifecycle: ResponseMetadataLifecycle;
}
declare class DefaultResponseMetadata implements ResponseMetadata {
    readonly registry: ResponseMetadataRegistry;
    readonly lifecycle: ResponseMetadataLifecycle;
    constructor(now?: Date);
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue, attributes?: ResponseAttributes): void;
    remove(key: string): void;
    entries(): readonly ResponseMetadataEntry[];
}

type ResponseLifecycleState = 'created' | 'initialized' | 'building' | 'serializing' | 'compressing' | 'ready' | 'sending' | 'sent' | 'cancelled' | 'failed';
interface ResponseLifecycleTransition {
    readonly from: ResponseLifecycleState;
    readonly to: ResponseLifecycleState;
    readonly at: Date;
}
interface ResponseLifecycleMetadata extends ResponseMetadata {
}
interface ResponseLifecycleEvent {
    readonly state: ResponseLifecycleState;
    readonly transition: ResponseLifecycleTransition;
    readonly metadata: ResponseLifecycleMetadata;
}
interface ResponseLifecycle {
    readonly state: ResponseLifecycleState;
    readonly metadata: ResponseLifecycleMetadata;
    readonly record: ResponseLifecycleRecord<ResponseLifecycleState>;
    transition(state: ResponseLifecycleState): void;
    transitions(): readonly ResponseLifecycleTransition[];
    events(): readonly ResponseLifecycleEvent[];
}
declare class DefaultResponseLifecycle implements ResponseLifecycle {
    readonly metadata: ResponseLifecycleMetadata;
    private currentState;
    private readonly history;
    private readonly eventHistory;
    readonly record: ResponseLifecycleRecord<ResponseLifecycleState>;
    constructor(metadata: ResponseLifecycleMetadata, initialState?: ResponseLifecycleState, now?: Date);
    get state(): ResponseLifecycleState;
    transition(state: ResponseLifecycleState): void;
    transitions(): readonly ResponseLifecycleTransition[];
    events(): readonly ResponseLifecycleEvent[];
}

type ResponseBodyType = 'empty' | 'json' | 'xml' | 'plain-text' | 'html' | 'binary' | 'file' | 'stream' | 'custom';
interface ResponseBodyContent {
    readonly value: unknown;
    readonly contentType: string | undefined;
    readonly contentLength: number;
}
interface ResponseBodyMetadata {
    readonly attributes: ResponseAttributes;
}
interface ResponseBodyLifecycle extends ResponseLifecycleRecord<'created' | 'available' | 'consumed' | 'disposed'> {
}
interface ResponseBody {
    readonly type: ResponseBodyType;
    readonly content: ResponseBodyContent;
    readonly metadata: ResponseBodyMetadata;
    readonly lifecycle: ResponseBodyLifecycle;
    isEmpty(): boolean;
    size(): number;
}
declare class DefaultResponseBody implements ResponseBody {
    readonly type: ResponseBodyType;
    readonly content: ResponseBodyContent;
    readonly metadata: ResponseBodyMetadata;
    readonly lifecycle: ResponseBodyLifecycle;
    constructor(type: ResponseBodyType, content: ResponseBodyContent, metadata?: ResponseBodyMetadata, now?: Date);
    isEmpty(): boolean;
    size(): number;
}
declare const createEmptyResponseBody: () => ResponseBody;

type ResponseStatusCategory = 'informational' | 'success' | 'redirection' | 'client-error' | 'server-error' | 'custom';
type ResponseStatusCode = number;
interface ResponseStatusMetadata {
    readonly attributes: ResponseAttributes;
}
interface ResponseStatus {
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
interface ResponseStatusRegistry {
    register(status: ResponseStatus): void;
    lookup(code: ResponseStatusCode): ResponseStatus | undefined;
    entries(): readonly ResponseStatus[];
}
declare const getResponseStatusCategory: (code: ResponseStatusCode) => ResponseStatusCategory;
declare const createResponseStatus: (code: ResponseStatusCode, phrase: string, attributes?: ResponseAttributes) => ResponseStatus;
declare const createResponseStatusFromHttpStatus: (status: HttpStatus) => ResponseStatus;
declare class DefaultResponseStatusRegistry implements ResponseStatusRegistry {
    private readonly values;
    constructor(statuses?: readonly ResponseStatus[]);
    register(status: ResponseStatus): void;
    lookup(code: ResponseStatusCode): ResponseStatus | undefined;
    entries(): readonly ResponseStatus[];
}

interface ResponseHeader {
    readonly name: string;
    readonly values: readonly string[];
    readonly attributes: ResponseAttributes;
}
interface ResponseHeaderCollection {
    has(name: string): boolean;
    get(name: string): string | undefined;
    set(name: string, value: string): this;
    append(name: string, value: string): this;
    remove(name: string): this;
    clear(): this;
    entries(): readonly ResponseHeader[];
}
interface ResponseHeaderMetadata {
    readonly attributes: ResponseAttributes;
}
interface ResponseHeaderLifecycle extends ResponseLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface ResponseHeaders extends ResponseHeaderCollection {
    readonly metadata: ResponseHeaderMetadata;
    readonly lifecycle: ResponseHeaderLifecycle;
}
declare class DefaultResponseHeaders implements ResponseHeaders {
    readonly metadata: ResponseHeaderMetadata;
    private readonly values;
    readonly lifecycle: ResponseHeaderLifecycle;
    constructor(headers?: readonly ResponseHeader[], metadata?: ResponseHeaderMetadata, now?: Date);
    has(name: string): boolean;
    get(name: string): string | undefined;
    set(name: string, value: string): this;
    append(name: string, value: string): this;
    remove(name: string): this;
    clear(): this;
    entries(): readonly ResponseHeader[];
}

type ResponseCookieSameSite = 'strict' | 'lax' | 'none';
interface ResponseCookieMetadata {
    readonly domain: string | undefined;
    readonly path: string | undefined;
    readonly maxAge: number | undefined;
    readonly expires: Date | undefined;
    readonly httpOnly: boolean;
    readonly secure: boolean;
    readonly sameSite: ResponseCookieSameSite | undefined;
    readonly attributes: ResponseAttributes;
}
interface ResponseCookie {
    readonly name: string;
    readonly value: string;
    readonly metadata: ResponseCookieMetadata;
}
interface ResponseCookieCollection {
    add(cookie: ResponseCookie): this;
    remove(name: string): this;
    clear(): this;
    has(name: string): boolean;
    get(name: string): ResponseCookie | undefined;
    values(): readonly ResponseCookie[];
}
interface ResponseCookieLifecycle extends ResponseLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface ResponseCookies extends ResponseCookieCollection {
    readonly metadata: ResponseAttributes;
    readonly lifecycle: ResponseCookieLifecycle;
}
declare class DefaultResponseCookies implements ResponseCookies {
    readonly metadata: ResponseAttributes;
    private readonly cookies;
    readonly lifecycle: ResponseCookieLifecycle;
    constructor(cookies?: readonly ResponseCookie[], metadata?: ResponseAttributes, now?: Date);
    add(cookie: ResponseCookie): this;
    remove(name: string): this;
    clear(): this;
    has(name: string): boolean;
    get(name: string): ResponseCookie | undefined;
    values(): readonly ResponseCookie[];
}

type ResponseCachePolicy = 'no-cache' | 'no-store' | 'private' | 'public' | 'custom';
interface ResponseCacheDirective {
    readonly name: string;
    readonly value: string | number | boolean | undefined;
}
interface ResponseCacheMetadata {
    readonly attributes: ResponseAttributes;
}
interface ResponseCacheLifecycle extends ResponseLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface ResponseCache {
    readonly policy: ResponseCachePolicy;
    readonly directives: readonly ResponseCacheDirective[];
    readonly metadata: ResponseCacheMetadata;
    readonly lifecycle: ResponseCacheLifecycle;
}
declare const createResponseCache: (policy: ResponseCachePolicy, directives?: readonly ResponseCacheDirective[], metadata?: ResponseCacheMetadata, now?: Date) => ResponseCache;

type ResponseAttachmentDisposition = 'attachment' | 'inline';
type ResponseAttachmentReferenceKind = 'local-file' | 'virtual-file' | 'stream-reference' | 'custom';
interface ResponseAttachmentReference {
    readonly kind: ResponseAttachmentReferenceKind;
    readonly value: string;
}
interface ResponseAttachmentMetadata {
    readonly filename: string;
    readonly mimeType: string;
    readonly size: number | undefined;
    readonly lastModified: Date | undefined;
    readonly attributes: ResponseAttributes;
}
interface ResponseAttachmentLifecycle extends ResponseLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface ResponseAttachment {
    readonly reference: ResponseAttachmentReference;
    readonly disposition: ResponseAttachmentDisposition;
    readonly metadata: ResponseAttachmentMetadata;
    readonly lifecycle: ResponseAttachmentLifecycle;
}
declare const createResponseAttachment: (reference: ResponseAttachmentReference, disposition: ResponseAttachmentDisposition, metadata: ResponseAttachmentMetadata, now?: Date) => ResponseAttachment;

interface HttpResponseIdentity {
    readonly id: string;
    readonly statusCode: number;
}
interface HttpResponseMetadata extends ResponseMetadata {
}
interface HttpResponseLifecycle extends ResponseLifecycle {
}
interface HttpResponseComposition {
    readonly status: HttpStatus;
    readonly headers: HttpHeaders;
    readonly body: ResponseBody;
    readonly protocol: HttpProtocol;
}
interface HttpResponse extends HttpResponseComposition {
    readonly identity: HttpResponseIdentity;
    readonly metadata: HttpResponseMetadata;
    readonly lifecycle: HttpResponseLifecycle;
}
declare const createHttpResponseIdentity: (id: string, status: HttpStatus) => HttpResponseIdentity;
declare const createHttpResponse: (identity: HttpResponseIdentity, composition: HttpResponseComposition, metadata: HttpResponseMetadata, lifecycle: HttpResponseLifecycle) => HttpResponse;

interface ResponseContextState {
    readonly responseId: string;
    readonly serviceKeys: readonly string[];
    readonly attributes: readonly ResponseRegistryEntry<unknown>[];
}
interface ResponseContextMetadata extends ResponseMetadata {
}
interface ResponseContextLifecycle extends ResponseLifecycle {
}
interface ResponseContextStorage extends ResponseMutableRegistry<unknown> {
}
interface ResponseContextService {
    readonly key: string;
    readonly value: unknown;
}
interface ResponseContext {
    readonly response: HttpResponse;
    readonly status: ResponseStatus;
    readonly headers: ResponseHeaders;
    readonly body: ResponseBody;
    readonly cookies: ResponseCookies;
    readonly cache: ResponseCache;
    readonly attachment: ResponseAttachment | undefined;
    readonly metadata: ResponseContextMetadata;
    readonly lifecycle: ResponseContextLifecycle;
    readonly state: ResponseContextState;
    readonly storage: ResponseContextStorage;
    services(): readonly ResponseContextService[];
}
declare const createResponseContext: (response: HttpResponse, status: ResponseStatus, headers: ResponseHeaders, body: ResponseBody, cookies: ResponseCookies, cache: ResponseCache, attachment: ResponseAttachment | undefined, metadata: ResponseContextMetadata, lifecycle: ResponseContextLifecycle, state: ResponseContextState, storage?: ResponseContextStorage) => ResponseContext;

interface ResponseRegistry extends ResponseMutableRegistry<unknown> {
}
interface ResponseCore {
    readonly context: ResponseContext;
    readonly lifecycle: ResponseLifecycle;
    readonly metadata: ResponseMetadata;
    readonly registry: ResponseRegistry;
}
declare const createResponseCore: (context: ResponseContext, lifecycle: ResponseLifecycle, metadata: ResponseMetadata, registry?: ResponseRegistry) => ResponseCore;

interface ResponseBuilderState {
    readonly status: HttpStatus;
    readonly headers: HttpHeaders;
    readonly body: ResponseBody;
    readonly protocol: HttpProtocol;
    readonly cookies: DefaultResponseCookies;
    readonly cache: ResponseCache;
    readonly attachment: ResponseAttachment | undefined;
}
interface ResponseBuilderContext {
    readonly metadata: ResponseMetadata;
    readonly lifecycle: ResponseLifecycle;
    readonly responseContext: ResponseContext;
}
interface ResponseBuilderResult {
    readonly response: HttpResponse;
    readonly context: ResponseBuilderContext;
}
interface ResponseBuilder {
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
declare class DefaultResponseBuilder implements ResponseBuilder {
    private readonly metadata;
    private readonly lifecycle;
    private statusValue;
    private headersValue;
    private responseHeadersValue;
    private bodyValue;
    private protocolValue;
    private cookiesValue;
    private cacheValue;
    private attachmentValue;
    constructor(metadata?: ResponseMetadata, lifecycle?: ResponseLifecycle);
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
    private composeResponse;
}
interface ResponseBuilderFactory {
    create(): ResponseBuilder;
}
declare const createResponseBuilderFactory: () => ResponseBuilderFactory;

interface ResponseProviderCapabilities {
    readonly responseDelivery: boolean;
    readonly headerDelivery: boolean;
    readonly cookieDelivery: boolean;
    readonly attachmentDelivery: boolean;
}
interface ResponseProviderMetadata extends ResponseMetadata {
    readonly id: string;
    readonly name: string;
    readonly version: string;
    readonly attributes: ResponseAttributes;
}
interface ResponseProviderLifecycle extends ResponseLifecycle {
}
interface ResponseProviderHealth {
    readonly healthy: boolean;
    readonly checkedAt: Date;
    readonly message: string | undefined;
}
interface ResponseProvider {
    readonly metadata: ResponseProviderMetadata;
    readonly lifecycle: ResponseProviderLifecycle;
    readonly capabilities: ResponseProviderCapabilities;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    healthCheck(): Promise<ResponseProviderHealth>;
    send(response: HttpResponse): Promise<void>;
}
interface ResponseProviderRegistry extends ResponseMutableRegistry<ResponseProvider> {
}
declare const createResponseProviderRegistry: () => ResponseProviderRegistry;
declare const createResponseProviderMetadata: (metadata: ResponseMetadata, id: string, name: string, version: string, attributes?: ResponseAttributes) => ResponseProviderMetadata;
declare const createResponseProvider: (metadata: ResponseProviderMetadata, lifecycle: ResponseProviderLifecycle, capabilities: ResponseProviderCapabilities, send?: (response: HttpResponse) => Promise<void>) => ResponseProvider;

export { DefaultResponseBody, DefaultResponseBuilder, DefaultResponseCookies, DefaultResponseHeaders, DefaultResponseLifecycle, DefaultResponseMetadata, DefaultResponseStatusRegistry, type HttpResponse, type HttpResponseComposition, type HttpResponseIdentity, type HttpResponseLifecycle, type HttpResponseMetadata, InMemoryResponseRegistry, type ResponseAttachment, type ResponseAttachmentDisposition, type ResponseAttachmentLifecycle, type ResponseAttachmentMetadata, type ResponseAttachmentReference, type ResponseAttachmentReferenceKind, type ResponseAttributes, type ResponseBody, type ResponseBodyContent, type ResponseBodyLifecycle, type ResponseBodyMetadata, type ResponseBodyType, type ResponseBuilder, type ResponseBuilderContext, type ResponseBuilderFactory, type ResponseBuilderResult, type ResponseBuilderState, type ResponseCache, type ResponseCacheDirective, type ResponseCacheLifecycle, type ResponseCacheMetadata, type ResponseCachePolicy, type ResponseContext, type ResponseContextLifecycle, type ResponseContextMetadata, type ResponseContextService, type ResponseContextState, type ResponseContextStorage, type ResponseCookie, type ResponseCookieCollection, type ResponseCookieLifecycle, type ResponseCookieMetadata, type ResponseCookieSameSite, type ResponseCookies, type ResponseCore, type ResponseHeader, type ResponseHeaderCollection, type ResponseHeaderLifecycle, type ResponseHeaderMetadata, type ResponseHeaders, type ResponseIdentity, type ResponseLifecycle, type ResponseLifecycleEvent, type ResponseLifecycleMetadata, type ResponseLifecycleRecord, type ResponseLifecycleState, type ResponseLifecycleTransition, type ResponseMetadata, type ResponseMetadataCollection, type ResponseMetadataEntry, type ResponseMetadataLifecycle, type ResponseMetadataRegistry, type ResponseMutableRegistry, type ResponseProvider, type ResponseProviderCapabilities, type ResponseProviderHealth, type ResponseProviderLifecycle, type ResponseProviderMetadata, type ResponseProviderRegistry, type ResponseReadonlyRegistry, type ResponseRecordValue, type ResponseRegistry, type ResponseRegistryEntry, type ResponseStatus, type ResponseStatusCategory, type ResponseStatusCode, type ResponseStatusMetadata, type ResponseStatusRegistry, type ResponseTimestamped, createEmptyResponseBody, createHttpResponse, createHttpResponseIdentity, createResponseAttachment, createResponseBuilderFactory, createResponseCache, createResponseContext, createResponseCore, createResponseProvider, createResponseProviderMetadata, createResponseProviderRegistry, createResponseStatus, createResponseStatusFromHttpStatus, getResponseStatusCategory };
