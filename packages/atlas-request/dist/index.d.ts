import { HttpRequestLine, HttpHeaders, HttpProtocol } from '@atlas/atlas-http';
import { RouteParameters } from '@atlas/atlas-router';

type RequestRecordValue = string | number | boolean | null | readonly RequestRecordValue[] | {
    readonly [key: string]: RequestRecordValue;
};
type RequestAttributes = Readonly<Record<string, RequestRecordValue>>;
interface RequestIdentity {
    readonly id: string;
    readonly name: string;
}
interface RequestTimestamped {
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
interface RequestLifecycleRecord<TState extends string> extends RequestTimestamped {
    readonly state: TState;
    readonly transitions: readonly string[];
}
interface RequestRegistryEntry<TValue> extends RequestIdentity {
    readonly value: TValue;
}
interface RequestReadonlyRegistry<TValue> {
    has(id: string): boolean;
    get(id: string): TValue | undefined;
    entries(): readonly RequestRegistryEntry<TValue>[];
}
interface RequestMutableRegistry<TValue> extends RequestReadonlyRegistry<TValue> {
    register(entry: RequestRegistryEntry<TValue>): void;
    remove(id: string): void;
}
declare class InMemoryRequestRegistry<TValue> implements RequestMutableRegistry<TValue> {
    private readonly values;
    has(id: string): boolean;
    get(id: string): TValue | undefined;
    register(entry: RequestRegistryEntry<TValue>): void;
    remove(id: string): void;
    entries(): readonly RequestRegistryEntry<TValue>[];
}

interface RequestMetadataEntry<TValue = unknown> {
    readonly key: string;
    readonly value: TValue;
    readonly attributes: RequestAttributes;
}
interface RequestMetadataLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RequestMetadataRegistry extends RequestMutableRegistry<RequestMetadataEntry> {
}
interface RequestMetadataCollection {
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue, attributes?: RequestAttributes): void;
    remove(key: string): void;
    entries(): readonly RequestMetadataEntry[];
}
interface RequestMetadata extends RequestMetadataCollection {
    readonly registry: RequestMetadataRegistry;
    readonly lifecycle: RequestMetadataLifecycle;
}
declare class DefaultRequestMetadata implements RequestMetadata {
    readonly registry: RequestMetadataRegistry;
    readonly lifecycle: RequestMetadataLifecycle;
    constructor(now?: Date);
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue, attributes?: RequestAttributes): void;
    remove(key: string): void;
    entries(): readonly RequestMetadataEntry[];
}

type RequestLifecycleState = 'created' | 'initialized' | 'middleware' | 'validation' | 'authorization' | 'controller' | 'completed' | 'cancelled' | 'failed';
interface RequestLifecycleTransition {
    readonly from: RequestLifecycleState;
    readonly to: RequestLifecycleState;
    readonly at: Date;
}
interface RequestLifecycleMetadata extends RequestMetadata {
}
interface RequestLifecycleEvent {
    readonly state: RequestLifecycleState;
    readonly transition: RequestLifecycleTransition;
    readonly metadata: RequestLifecycleMetadata;
}
interface RequestLifecycle {
    readonly state: RequestLifecycleState;
    readonly metadata: RequestLifecycleMetadata;
    readonly record: RequestLifecycleRecord<RequestLifecycleState>;
    transition(state: RequestLifecycleState): void;
    transitions(): readonly RequestLifecycleTransition[];
    events(): readonly RequestLifecycleEvent[];
}
declare class DefaultRequestLifecycle implements RequestLifecycle {
    readonly metadata: RequestLifecycleMetadata;
    private currentState;
    private readonly history;
    private readonly eventHistory;
    readonly record: RequestLifecycleRecord<RequestLifecycleState>;
    constructor(metadata: RequestLifecycleMetadata, initialState?: RequestLifecycleState, now?: Date);
    get state(): RequestLifecycleState;
    transition(state: RequestLifecycleState): void;
    transitions(): readonly RequestLifecycleTransition[];
    events(): readonly RequestLifecycleEvent[];
}

interface HttpRequestIdentity {
    readonly id: string;
    readonly method: string;
    readonly target: string;
}
interface HttpRequestMetadata extends RequestMetadata {
}
interface HttpRequestLifecycle extends RequestLifecycle {
}
interface HttpRequestComposition {
    readonly line: HttpRequestLine;
    readonly headers: HttpHeaders;
    readonly protocol: HttpProtocol;
    readonly context: readonly RequestRegistryEntry<unknown>[];
}
interface HttpRequest extends HttpRequestComposition {
    readonly identity: HttpRequestIdentity;
    readonly metadata: HttpRequestMetadata;
    readonly lifecycle: HttpRequestLifecycle;
}
declare const createHttpRequestIdentity: (id: string, line: HttpRequestLine) => HttpRequestIdentity;
declare const createHttpRequest: (identity: HttpRequestIdentity, composition: HttpRequestComposition, metadata: HttpRequestMetadata, lifecycle: HttpRequestLifecycle) => HttpRequest;

type RequestBodyType = 'empty' | 'json' | 'form-url-encoded' | 'multipart-form' | 'plain-text' | 'xml' | 'html' | 'binary' | 'octet-stream' | 'streaming' | 'custom';
interface RequestBodyContent {
    readonly value: unknown;
    readonly contentType: string | undefined;
    readonly contentLength: number;
}
interface RequestBodyMetadata {
    readonly attributes: RequestAttributes;
}
interface RequestBodyLifecycle extends RequestLifecycleRecord<'created' | 'available' | 'consumed' | 'disposed'> {
}
interface RequestBody {
    readonly type: RequestBodyType;
    readonly content: RequestBodyContent;
    readonly metadata: RequestBodyMetadata;
    readonly lifecycle: RequestBodyLifecycle;
    isEmpty(): boolean;
    size(): number;
}
declare class DefaultRequestBody implements RequestBody {
    readonly type: RequestBodyType;
    readonly content: RequestBodyContent;
    readonly metadata: RequestBodyMetadata;
    readonly lifecycle: RequestBodyLifecycle;
    constructor(type: RequestBodyType, content: RequestBodyContent, metadata?: RequestBodyMetadata, now?: Date);
    isEmpty(): boolean;
    size(): number;
}
declare const createEmptyRequestBody: () => RequestBody;

interface RequestHeader {
    readonly name: string;
    readonly value: string;
    readonly attributes: RequestAttributes;
}
interface RequestHeaderCollection {
    has(name: string): boolean;
    get(name: string): string | undefined;
    entries(): readonly RequestHeader[];
}
interface RequestHeaderMetadata {
    readonly attributes: RequestAttributes;
}
interface RequestHeaderLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RequestHeaders extends RequestHeaderCollection {
    readonly metadata: RequestHeaderMetadata;
    readonly lifecycle: RequestHeaderLifecycle;
    authorization(): string | undefined;
    contentType(): string | undefined;
    accept(): string | undefined;
    host(): string | undefined;
    userAgent(): string | undefined;
}
declare class DefaultRequestHeaders implements RequestHeaders {
    private readonly headers;
    readonly metadata: RequestHeaderMetadata;
    readonly lifecycle: RequestHeaderLifecycle;
    constructor(headers: HttpHeaders, metadata?: RequestHeaderMetadata, now?: Date);
    has(name: string): boolean;
    get(name: string): string | undefined;
    entries(): readonly RequestHeader[];
    authorization(): string | undefined;
    contentType(): string | undefined;
    accept(): string | undefined;
    host(): string | undefined;
    userAgent(): string | undefined;
}

interface RequestQueryParameter {
    readonly key: string;
    readonly values: readonly string[];
    readonly attributes: RequestAttributes;
}
interface RequestQueryCollection {
    has(key: string): boolean;
    get(key: string): string | undefined;
    getAll(key: string): readonly string[];
    keys(): readonly string[];
    entries(): readonly RequestQueryParameter[];
}
interface RequestQueryMetadata {
    readonly attributes: RequestAttributes;
}
interface RequestQueryLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RequestQuery extends RequestQueryCollection {
    readonly metadata: RequestQueryMetadata;
    readonly lifecycle: RequestQueryLifecycle;
}
declare class DefaultRequestQuery implements RequestQuery {
    readonly metadata: RequestQueryMetadata;
    private readonly parameters;
    readonly lifecycle: RequestQueryLifecycle;
    constructor(parameters?: readonly RequestQueryParameter[], metadata?: RequestQueryMetadata, now?: Date);
    has(key: string): boolean;
    get(key: string): string | undefined;
    getAll(key: string): readonly string[];
    keys(): readonly string[];
    entries(): readonly RequestQueryParameter[];
}

interface RequestParameter {
    readonly key: string;
    readonly values: readonly string[];
    readonly attributes: RequestAttributes;
}
interface RequestParameterCollection {
    has(key: string): boolean;
    get(key: string): string | undefined;
    getAll(key: string): readonly string[];
    keys(): readonly string[];
    entries(): readonly RequestParameter[];
}
interface RequestParameterMetadata {
    readonly attributes: RequestAttributes;
}
interface RequestParameterLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RequestParameters extends RequestParameterCollection {
    readonly metadata: RequestParameterMetadata;
    readonly lifecycle: RequestParameterLifecycle;
}
declare class DefaultRequestParameters implements RequestParameters {
    readonly metadata: RequestParameterMetadata;
    private readonly parameters;
    readonly lifecycle: RequestParameterLifecycle;
    constructor(parameters?: readonly RequestParameter[], metadata?: RequestParameterMetadata, now?: Date);
    static fromRouteParameters(routeParameters: RouteParameters): RequestParameters;
    has(key: string): boolean;
    get(key: string): string | undefined;
    getAll(key: string): readonly string[];
    keys(): readonly string[];
    entries(): readonly RequestParameter[];
}

interface RequestCookie {
    readonly name: string;
    readonly value: string;
    readonly attributes: RequestAttributes;
}
interface RequestCookieCollection {
    has(name: string): boolean;
    get(name: string): string | undefined;
    keys(): readonly string[];
    values(): readonly RequestCookie[];
}
interface RequestCookieMetadata {
    readonly attributes: RequestAttributes;
}
interface RequestCookieLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RequestCookies extends RequestCookieCollection {
    readonly metadata: RequestCookieMetadata;
    readonly lifecycle: RequestCookieLifecycle;
}
declare class DefaultRequestCookies implements RequestCookies {
    readonly metadata: RequestCookieMetadata;
    private readonly cookies;
    readonly lifecycle: RequestCookieLifecycle;
    constructor(cookies?: readonly RequestCookie[], metadata?: RequestCookieMetadata, now?: Date);
    has(name: string): boolean;
    get(name: string): string | undefined;
    keys(): readonly string[];
    values(): readonly RequestCookie[];
}

interface RequestFileMetadata {
    readonly originalFilename: string;
    readonly mimeType: string;
    readonly size: number;
    readonly attributes: RequestAttributes;
}
interface RequestFile {
    readonly name: string;
    readonly metadata: RequestFileMetadata;
    readonly content: unknown;
}
interface RequestFileCollectionMetadata {
    readonly attributes: RequestAttributes;
}
interface RequestFileCollection {
    has(name: string): boolean;
    get(name: string): RequestFile | undefined;
    getAll(name: string): readonly RequestFile[];
    keys(): readonly string[];
    values(): readonly RequestFile[];
}
interface RequestFileLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RequestFiles extends RequestFileCollection {
    readonly metadata: RequestFileCollectionMetadata;
    readonly lifecycle: RequestFileLifecycle;
}
declare class DefaultRequestFiles implements RequestFiles {
    readonly metadata: RequestFileCollectionMetadata;
    private readonly files;
    readonly lifecycle: RequestFileLifecycle;
    constructor(files?: readonly RequestFile[], metadata?: RequestFileCollectionMetadata, now?: Date);
    has(name: string): boolean;
    get(name: string): RequestFile | undefined;
    getAll(name: string): readonly RequestFile[];
    keys(): readonly string[];
    values(): readonly RequestFile[];
}

interface RequestSessionIdentifier {
    readonly id: string;
}
interface RequestSessionMetadata {
    readonly identifier: RequestSessionIdentifier;
    readonly attributes: RequestAttributes;
}
interface RequestSessionLifecycle extends RequestLifecycleRecord<'created' | 'active' | 'expired' | 'disposed'> {
}
interface RequestSessionStore extends RequestMutableRegistry<unknown> {
}
interface RequestSession {
    readonly store: RequestSessionStore;
    readonly lifecycle: RequestSessionLifecycle;
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    keys(): readonly string[];
    metadata(): RequestSessionMetadata;
}
declare class DefaultRequestSession implements RequestSession {
    private readonly sessionMetadata;
    readonly lifecycle: RequestSessionLifecycle;
    readonly store: RequestSessionStore;
    constructor(sessionMetadata: RequestSessionMetadata, entries?: readonly RequestRegistryEntry<unknown>[], now?: Date);
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    keys(): readonly string[];
    metadata(): RequestSessionMetadata;
}

interface RequestContextState {
    readonly requestId: string;
    readonly attributes: readonly RequestRegistryEntry<unknown>[];
    readonly serviceKeys: readonly string[];
}
interface RequestContextMetadata extends RequestMetadata {
}
interface RequestContextLifecycle extends RequestLifecycle {
}
interface RequestContextStorage extends RequestMutableRegistry<unknown> {
}
interface RequestContextService {
    readonly key: string;
    readonly value: unknown;
}
interface RequestContext {
    readonly request: HttpRequest;
    readonly headers: RequestHeaders;
    readonly body: RequestBody;
    readonly query: RequestQuery;
    readonly parameters: RequestParameters;
    readonly cookies: RequestCookies;
    readonly files: RequestFiles;
    readonly session: RequestSession;
    readonly metadata: RequestContextMetadata;
    readonly lifecycle: RequestContextLifecycle;
    readonly state: RequestContextState;
    readonly storage: RequestContextStorage;
    services(): readonly RequestContextService[];
}
declare const createRequestContext: (request: HttpRequest, headers: RequestHeaders, body: RequestBody, query: RequestQuery, parameters: RequestParameters, cookies: RequestCookies, files: RequestFiles, session: RequestSession, metadata: RequestContextMetadata, lifecycle: RequestContextLifecycle, state: RequestContextState, storage?: RequestContextStorage) => RequestContext;

interface RequestRegistry extends RequestMutableRegistry<unknown> {
}
interface RequestCore {
    readonly context: RequestContext;
    readonly lifecycle: RequestLifecycle;
    readonly metadata: RequestMetadata;
    readonly registry: RequestRegistry;
}
declare const createRequestCore: (context: RequestContext, lifecycle: RequestLifecycle, metadata: RequestMetadata, registry?: RequestRegistry) => RequestCore;

interface RequestProviderCapabilities {
    readonly requestAggregation: boolean;
    readonly bodyAccess: boolean;
    readonly cookieAccess: boolean;
    readonly fileAccess: boolean;
    readonly sessionAccess: boolean;
}
interface RequestProviderMetadata extends RequestMetadata {
    readonly id: string;
    readonly name: string;
    readonly version: string;
    readonly attributes: RequestAttributes;
}
interface RequestProviderLifecycle extends RequestLifecycle {
}
interface RequestProviderHealth {
    readonly healthy: boolean;
    readonly checkedAt: Date;
    readonly message: string | undefined;
}
interface RequestProvider {
    readonly metadata: RequestProviderMetadata;
    readonly lifecycle: RequestProviderLifecycle;
    readonly capabilities: RequestProviderCapabilities;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    healthCheck(): Promise<RequestProviderHealth>;
}
interface RequestProviderRegistry extends RequestMutableRegistry<RequestProvider> {
}
declare const createRequestProviderRegistry: () => RequestProviderRegistry;
declare const createRequestProviderMetadata: (metadata: RequestMetadata, id: string, name: string, version: string, attributes?: RequestAttributes) => RequestProviderMetadata;
declare const createRequestProvider: (metadata: RequestProviderMetadata, lifecycle: RequestProviderLifecycle, capabilities: RequestProviderCapabilities) => RequestProvider;

export { DefaultRequestBody, DefaultRequestCookies, DefaultRequestFiles, DefaultRequestHeaders, DefaultRequestLifecycle, DefaultRequestMetadata, DefaultRequestParameters, DefaultRequestQuery, DefaultRequestSession, type HttpRequest, type HttpRequestComposition, type HttpRequestIdentity, type HttpRequestLifecycle, type HttpRequestMetadata, InMemoryRequestRegistry, type RequestAttributes, type RequestBody, type RequestBodyContent, type RequestBodyLifecycle, type RequestBodyMetadata, type RequestBodyType, type RequestContext, type RequestContextLifecycle, type RequestContextMetadata, type RequestContextService, type RequestContextState, type RequestContextStorage, type RequestCookie, type RequestCookieCollection, type RequestCookieLifecycle, type RequestCookieMetadata, type RequestCookies, type RequestCore, type RequestFile, type RequestFileCollection, type RequestFileCollectionMetadata, type RequestFileLifecycle, type RequestFileMetadata, type RequestFiles, type RequestHeader, type RequestHeaderCollection, type RequestHeaderLifecycle, type RequestHeaderMetadata, type RequestHeaders, type RequestIdentity, type RequestLifecycle, type RequestLifecycleEvent, type RequestLifecycleMetadata, type RequestLifecycleRecord, type RequestLifecycleState, type RequestLifecycleTransition, type RequestMetadata, type RequestMetadataCollection, type RequestMetadataEntry, type RequestMetadataLifecycle, type RequestMetadataRegistry, type RequestMutableRegistry, type RequestParameter, type RequestParameterCollection, type RequestParameterLifecycle, type RequestParameterMetadata, type RequestParameters, type RequestProvider, type RequestProviderCapabilities, type RequestProviderHealth, type RequestProviderLifecycle, type RequestProviderMetadata, type RequestProviderRegistry, type RequestQuery, type RequestQueryCollection, type RequestQueryLifecycle, type RequestQueryMetadata, type RequestQueryParameter, type RequestReadonlyRegistry, type RequestRecordValue, type RequestRegistry, type RequestRegistryEntry, type RequestSession, type RequestSessionIdentifier, type RequestSessionLifecycle, type RequestSessionMetadata, type RequestSessionStore, type RequestTimestamped, createEmptyRequestBody, createHttpRequest, createHttpRequestIdentity, createRequestContext, createRequestCore, createRequestProvider, createRequestProviderMetadata, createRequestProviderRegistry };
