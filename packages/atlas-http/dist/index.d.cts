type HttpComponentKind = 'core' | 'context' | 'message' | 'headers' | 'request-line' | 'status' | 'method' | 'protocol' | 'connection' | 'server' | 'client' | 'pipeline' | 'handler' | 'endpoint' | 'metadata' | 'lifecycle' | 'provider';
type HttpRecordValue = string | number | boolean | null | readonly HttpRecordValue[] | {
    readonly [key: string]: HttpRecordValue;
};
type HttpAttributes = Readonly<Record<string, HttpRecordValue>>;
interface HttpIdentity {
    readonly id: string;
    readonly name: string;
}
interface HttpTimestamped {
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
interface HttpLifecycleRecord<TState extends string> extends HttpTimestamped {
    readonly state: TState;
    readonly transitions: readonly string[];
}
interface HttpRegistryEntry<TValue> extends HttpIdentity {
    readonly value: TValue;
}
interface HttpReadonlyRegistry<TValue> {
    has(id: string): boolean;
    get(id: string): TValue | undefined;
    entries(): readonly HttpRegistryEntry<TValue>[];
}
interface HttpMutableRegistry<TValue> extends HttpReadonlyRegistry<TValue> {
    register(entry: HttpRegistryEntry<TValue>): void;
    remove(id: string): void;
}
declare class InMemoryHttpRegistry<TValue> implements HttpMutableRegistry<TValue> {
    private readonly values;
    has(id: string): boolean;
    get(id: string): TValue | undefined;
    register(entry: HttpRegistryEntry<TValue>): void;
    remove(id: string): void;
    entries(): readonly HttpRegistryEntry<TValue>[];
}
declare const createHttpMetadataId: (kind: HttpComponentKind, id: string) => string;

interface HttpMetadataEntry<TValue = unknown> {
    readonly key: string;
    readonly value: TValue;
    readonly attributes: HttpAttributes;
}
interface HttpMetadataLifecycle extends HttpLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface HttpMetadataRegistry extends HttpMutableRegistry<HttpMetadataEntry> {
}
interface HttpMetadataCollection {
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue, attributes?: HttpAttributes): void;
    remove(key: string): void;
    entries(): readonly HttpMetadataEntry[];
}
interface HttpMetadata extends HttpMetadataCollection {
    readonly registry: HttpMetadataRegistry;
    readonly lifecycle: HttpMetadataLifecycle;
}
declare class DefaultHttpMetadata implements HttpMetadata {
    readonly registry: HttpMetadataRegistry;
    readonly lifecycle: HttpMetadataLifecycle;
    constructor(now?: Date);
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue, attributes?: HttpAttributes): void;
    remove(key: string): void;
    entries(): readonly HttpMetadataEntry[];
}

type HttpLifecycleState = 'created' | 'initialized' | 'receiving' | 'processing' | 'executing' | 'responding' | 'completed' | 'cancelled' | 'failed' | 'disposed';
interface HttpLifecycleTransition {
    readonly from: HttpLifecycleState;
    readonly to: HttpLifecycleState;
    readonly at: Date;
}
interface HttpLifecycleEvent {
    readonly state: HttpLifecycleState;
    readonly transition: HttpLifecycleTransition;
    readonly metadata: HttpMetadata;
}
interface HttpLifecycleMetadata extends HttpMetadata {
}
interface HttpLifecycle {
    readonly state: HttpLifecycleState;
    readonly metadata: HttpLifecycleMetadata;
    readonly record: HttpLifecycleRecord<HttpLifecycleState>;
    transition(state: HttpLifecycleState): void;
    transitions(): readonly HttpLifecycleTransition[];
    events(): readonly HttpLifecycleEvent[];
}
declare class DefaultHttpLifecycle implements HttpLifecycle {
    private currentState;
    private readonly history;
    private readonly eventHistory;
    readonly metadata: HttpLifecycleMetadata;
    readonly record: HttpLifecycleRecord<HttpLifecycleState>;
    constructor(metadata: HttpLifecycleMetadata, initialState?: HttpLifecycleState, now?: Date);
    get state(): HttpLifecycleState;
    transition(state: HttpLifecycleState): void;
    transitions(): readonly HttpLifecycleTransition[];
    events(): readonly HttpLifecycleEvent[];
}

interface HttpHeader {
    readonly name: string;
    readonly value: string;
    readonly attributes: HttpAttributes;
}
interface HttpHeaderMetadata {
    readonly attributes: HttpAttributes;
}
interface HttpHeaderLifecycle extends HttpLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface HttpHeaderCollection {
    has(name: string): boolean;
    get(name: string): HttpHeader | undefined;
    set(header: HttpHeader): void;
    remove(name: string): void;
    entries(): readonly HttpHeader[];
}
interface HttpHeaders extends HttpHeaderCollection {
    readonly metadata: HttpHeaderMetadata;
    readonly lifecycle: HttpHeaderLifecycle;
}
interface HttpMessageHeaders extends HttpHeaders {
}
declare const normalizeHttpHeaderName: (name: string) => string;
declare class DefaultHttpHeaders implements HttpHeaders {
    private readonly headers;
    readonly metadata: HttpHeaderMetadata;
    readonly lifecycle: HttpHeaderLifecycle;
    constructor(headers?: readonly HttpHeader[], now?: Date, attributes?: HttpAttributes);
    has(name: string): boolean;
    get(name: string): HttpHeader | undefined;
    set(header: HttpHeader): void;
    remove(name: string): void;
    entries(): readonly HttpHeader[];
}

type HttpMethodCategory = 'safe' | 'unsafe' | 'idempotent' | 'cacheable' | 'extension';
interface HttpMethodCapabilities {
    readonly safe: boolean;
    readonly idempotent: boolean;
    readonly cacheable: boolean;
}
interface HttpMethodMetadata {
    readonly description: string;
    readonly attributes: HttpAttributes;
}
interface HttpMethod {
    readonly name: string;
    readonly metadata: HttpMethodMetadata;
    readonly category: HttpMethodCategory;
    readonly capabilities: HttpMethodCapabilities;
}
interface HttpMethodLookup {
    lookup(name: string): HttpMethod | undefined;
}
interface HttpMethodRegistry extends HttpMethodLookup {
    register(method: HttpMethod): void;
    entries(): readonly HttpMethod[];
}
declare class DefaultHttpMethodRegistry implements HttpMethodRegistry {
    private readonly methods;
    constructor(methods?: readonly HttpMethod[]);
    register(method: HttpMethod): void;
    lookup(name: string): HttpMethod | undefined;
    entries(): readonly HttpMethod[];
}
declare const createHttpMethod: (name: string, category: HttpMethodCategory, description: string, capabilities: HttpMethodCapabilities, attributes?: HttpAttributes) => HttpMethod;
declare const STANDARD_HTTP_METHODS: readonly HttpMethod[];

type HttpStatusCategory = 'informational' | 'success' | 'redirection' | 'client-error' | 'server-error' | 'custom';
interface HttpStatusMetadata {
    readonly attributes: HttpAttributes;
}
interface HttpStatus {
    readonly code: number;
    readonly phrase: string;
    readonly category: HttpStatusCategory;
    readonly metadata: HttpStatusMetadata;
}
interface HttpStatusLookup {
    lookup(code: number): HttpStatus | undefined;
}
interface HttpStatusRegistry extends HttpStatusLookup {
    register(status: HttpStatus): void;
    entries(): readonly HttpStatus[];
}
declare const getHttpStatusCategory: (code: number) => HttpStatusCategory;
declare class DefaultHttpStatusRegistry implements HttpStatusRegistry {
    private readonly statuses;
    constructor(statuses?: readonly HttpStatus[]);
    register(status: HttpStatus): void;
    lookup(code: number): HttpStatus | undefined;
    entries(): readonly HttpStatus[];
}
declare const createHttpStatus: (code: number, phrase: string, attributes?: HttpAttributes) => HttpStatus;
declare const STANDARD_HTTP_STATUSES: readonly HttpStatus[];

type HttpProtocolVersion = 'HTTP/1.0' | 'HTTP/1.1' | 'HTTP/2' | 'HTTP/3' | string;
interface HttpProtocolCapabilities {
    readonly persistentConnections: boolean;
    readonly multiplexing: boolean;
    readonly headerCompression: boolean;
    readonly serverPush: boolean;
    readonly streamPriority: boolean;
}
interface HttpProtocolMetadata {
    readonly attributes: HttpAttributes;
}
interface HttpProtocolLifecycle extends HttpLifecycleRecord<'created' | 'active' | 'deprecated'> {
}
interface HttpProtocol {
    readonly version: HttpProtocolVersion;
    readonly capabilities: HttpProtocolCapabilities;
    readonly metadata: HttpProtocolMetadata;
    readonly lifecycle: HttpProtocolLifecycle;
}
interface HttpProtocolRegistry {
    register(protocol: HttpProtocol): void;
    lookup(version: HttpProtocolVersion): HttpProtocol | undefined;
    entries(): readonly HttpProtocol[];
}
declare class DefaultHttpProtocolRegistry implements HttpProtocolRegistry {
    private readonly protocols;
    constructor(protocols?: readonly HttpProtocol[]);
    register(protocol: HttpProtocol): void;
    lookup(version: HttpProtocolVersion): HttpProtocol | undefined;
    entries(): readonly HttpProtocol[];
}
declare const createHttpProtocol: (version: HttpProtocolVersion, capabilities: HttpProtocolCapabilities, attributes?: HttpAttributes, now?: Date) => HttpProtocol;
declare const STANDARD_HTTP_PROTOCOLS: readonly HttpProtocol[];

type HttpRequestTargetKind = 'origin-form' | 'absolute-form' | 'authority-form' | 'asterisk-form';
interface HttpRequestTarget {
    readonly value: string;
    readonly kind: HttpRequestTargetKind;
}
interface HttpRequestLineMetadata {
    readonly attributes: HttpAttributes;
}
interface HttpRequestLineLifecycle extends HttpLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface HttpRequestLine {
    readonly method: HttpMethod;
    readonly target: HttpRequestTarget;
    readonly protocol: HttpProtocol;
    readonly metadata: HttpRequestLineMetadata;
    readonly lifecycle: HttpRequestLineLifecycle;
}
declare const createHttpRequestTarget: (value: string, kind?: HttpRequestTargetKind) => HttpRequestTarget;
declare const createHttpRequestLine: (method: HttpMethod, target: HttpRequestTarget, protocol: HttpProtocol, attributes?: HttpAttributes, now?: Date) => HttpRequestLine;

type HttpMessageBodyKind = 'empty' | 'text' | 'json' | 'binary' | 'stream' | 'custom';
interface HttpMessageBody {
    readonly kind: HttpMessageBodyKind;
    readonly contentType: string | undefined;
    readonly contentLength: number | undefined;
    readonly value: unknown;
}
interface HttpMessageMetadata {
    readonly attributes: HttpAttributes;
}
interface HttpMessageLifecycle extends HttpLifecycleRecord<'created' | 'read' | 'updated' | 'disposed'> {
}
interface HttpMessage {
    readonly metadata: HttpMessageMetadata;
    readonly headers: HttpMessageHeaders;
    readonly body: HttpMessageBody;
    readonly lifecycle: HttpMessageLifecycle;
}
declare const createEmptyHttpMessageBody: () => HttpMessageBody;
declare const createHttpMessage: (headers: HttpMessageHeaders, body?: HttpMessageBody, attributes?: HttpAttributes, now?: Date) => HttpMessage;

interface HttpContextMetadata extends HttpMetadata {
}
interface HttpContextLifecycle extends HttpLifecycleRecord<'created' | 'initialized' | 'disposed'> {
}
interface HttpContextStore {
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue): void;
    remove(key: string): void;
    entries(): readonly HttpRegistryEntry<unknown>[];
}
interface HttpContextServices extends HttpMutableRegistry<unknown> {
}
interface HttpContext {
    readonly metadata: HttpContextMetadata;
    readonly lifecycle: HttpContextLifecycle;
    readonly services: HttpContextServices;
    readonly store: HttpContextStore;
}
declare class DefaultHttpContextStore implements HttpContextStore {
    private readonly values;
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue): void;
    remove(key: string): void;
    entries(): readonly HttpRegistryEntry<unknown>[];
}
declare const createHttpContext: (metadata: HttpContextMetadata, services?: HttpContextServices, store?: HttpContextStore, now?: Date) => HttpContext;

interface HttpRegistry extends HttpMutableRegistry<unknown> {
}
interface HttpCore {
    readonly registry: HttpRegistry;
    readonly context: HttpContext;
    readonly lifecycle: HttpLifecycle;
    readonly metadata: HttpMetadata;
}
declare const createHttpCore: (context: HttpContext, lifecycle: HttpLifecycle, metadata: HttpMetadata, registry?: HttpRegistry) => HttpCore;

type HttpConnectionState = 'open' | 'active' | 'idle' | 'closing' | 'closed';
interface HttpConnectionCapabilities {
    readonly persistent: boolean;
    readonly keepAlive: boolean;
    readonly multiplexing: boolean;
    readonly streams: boolean;
}
interface HttpConnectionMetadata {
    readonly id: string;
    readonly attributes: HttpAttributes;
}
interface HttpConnectionLifecycle extends HttpLifecycleRecord<HttpConnectionState> {
}
interface HttpConnection {
    readonly state: HttpConnectionState;
    readonly lifecycle: HttpConnectionLifecycle;
    readonly metadata: HttpConnectionMetadata;
    readonly capabilities: HttpConnectionCapabilities;
}
declare const createHttpConnection: (id: string, capabilities: HttpConnectionCapabilities, state?: HttpConnectionState, attributes?: HttpAttributes, now?: Date) => HttpConnection;

interface HttpServerConfiguration {
    readonly host: string;
    readonly port: number;
    readonly protocol: string;
    readonly environment: string;
}
interface HttpServerMetadata {
    readonly id: string;
    readonly attributes: HttpAttributes;
}
type HttpServerLifecycleState = 'initialized' | 'running' | 'stopping' | 'stopped';
interface HttpServerLifecycle extends HttpLifecycleRecord<HttpServerLifecycleState> {
}
interface HttpServerProvider {
    readonly id: string;
    readonly name: string;
    start(): Promise<void>;
    stop(): Promise<void>;
}
interface HttpServer {
    readonly configuration: HttpServerConfiguration;
    readonly lifecycle: HttpServerLifecycle;
    readonly metadata: HttpServerMetadata;
    readonly provider: HttpServerProvider;
}
declare const createHttpServer: (configuration: HttpServerConfiguration, provider: HttpServerProvider, id: string, attributes?: HttpAttributes, now?: Date) => HttpServer;

interface HttpClientConfiguration {
    readonly baseUrl: string | undefined;
    readonly timeoutMs: number | undefined;
    readonly defaultHeaders: readonly HttpHeader[];
}
interface HttpClientMetadata {
    readonly id: string;
    readonly attributes: HttpAttributes;
}
type HttpClientLifecycleState = 'initialized' | 'ready' | 'busy' | 'closed';
interface HttpClientLifecycle extends HttpLifecycleRecord<HttpClientLifecycleState> {
}
interface HttpClientProvider<TRequest = unknown, TResponse = unknown> {
    readonly id: string;
    readonly name: string;
    send(request: TRequest): Promise<TResponse>;
    cancel(id: string): Promise<void>;
    close(): Promise<void>;
}
interface HttpClient<TRequest = unknown, TResponse = unknown> {
    readonly configuration: HttpClientConfiguration;
    readonly lifecycle: HttpClientLifecycle;
    readonly metadata: HttpClientMetadata;
    readonly provider: HttpClientProvider<TRequest, TResponse>;
}
declare const createHttpClient: <TRequest = unknown, TResponse = unknown>(configuration: HttpClientConfiguration, provider: HttpClientProvider<TRequest, TResponse>, id: string, attributes?: HttpAttributes, now?: Date) => HttpClient<TRequest, TResponse>;

type HttpPipelineStageExecutor = (context: HttpContext) => Promise<void>;
interface HttpPipelineStage {
    readonly id: string;
    readonly name: string;
    readonly order: number;
    readonly execute: HttpPipelineStageExecutor;
}
interface HttpPipelineMetadata extends HttpMetadata {
}
type HttpPipelineLifecycleState = 'initialized' | 'executing' | 'complete' | 'disposed';
interface HttpPipelineLifecycle extends HttpLifecycleRecord<HttpPipelineLifecycleState> {
}
interface HttpPipelineRegistry extends HttpMutableRegistry<HttpPipelineStage> {
}
interface HttpPipeline {
    readonly registry: HttpPipelineRegistry;
    readonly lifecycle: HttpPipelineLifecycle;
    readonly metadata: HttpPipelineMetadata;
}
declare const createHttpPipeline: (metadata: HttpPipelineMetadata, registry?: HttpPipelineRegistry, now?: Date) => HttpPipeline;
declare const getOrderedHttpPipelineStages: (pipeline: HttpPipeline) => readonly HttpPipelineStage[];
declare const reorderHttpPipelineStage: (pipeline: HttpPipeline, stageId: string, order: number) => HttpPipelineStage | undefined;
declare const executeHttpPipelineStage: (stage: HttpPipelineStage, context: HttpContext) => Promise<void>;
declare const executeHttpPipeline: (pipeline: HttpPipeline, context: HttpContext) => Promise<void>;

interface HttpHandlerContext {
    readonly context: HttpContext;
    readonly chain: HttpHandlerChain | undefined;
}
interface HttpHandlerMetadata extends HttpMetadata {
}
type HttpHandlerLifecycleState = 'initialized' | 'executing' | 'disposed';
interface HttpHandlerLifecycle extends HttpLifecycleRecord<HttpHandlerLifecycleState> {
}
interface HttpHandler {
    readonly metadata: HttpHandlerMetadata;
    readonly lifecycle: HttpHandlerLifecycle;
    handle(context: HttpContext): Promise<void>;
}
interface HttpHandlerChain {
    readonly handlers: readonly HttpHandler[];
    next(context: HttpContext): Promise<void>;
}
declare class SequentialHttpHandlerChain implements HttpHandlerChain {
    readonly handlers: readonly HttpHandler[];
    private index;
    constructor(handlers: readonly HttpHandler[]);
    next(context: HttpContext): Promise<void>;
}
declare const createHttpHandlerLifecycle: (now?: Date) => HttpHandlerLifecycle;

interface HttpEndpointExecutionPolicy {
    readonly name: string;
    readonly attributes: HttpAttributes;
}
interface HttpEndpointConfiguration {
    readonly id: string;
    readonly method: HttpMethod;
    readonly target: HttpRequestTarget;
    readonly attributes: HttpAttributes;
    readonly policies: readonly HttpEndpointExecutionPolicy[];
}
interface HttpEndpointMetadata extends HttpMetadata {
}
type HttpEndpointLifecycleState = 'initialized' | 'active' | 'disabled' | 'removed';
interface HttpEndpointLifecycle extends HttpLifecycleRecord<HttpEndpointLifecycleState> {
}
interface HttpEndpointHandler extends HttpHandler {
}
interface HttpEndpoint {
    readonly method: HttpMethod;
    readonly target: HttpRequestTarget;
    readonly handler: HttpEndpointHandler;
    readonly metadata: HttpEndpointMetadata;
    readonly lifecycle: HttpEndpointLifecycle;
    readonly configuration: HttpEndpointConfiguration;
    readonly policies: readonly HttpEndpointExecutionPolicy[];
}
declare const createHttpEndpoint: (configuration: HttpEndpointConfiguration, handler: HttpEndpointHandler, metadata: HttpEndpointMetadata, now?: Date) => HttpEndpoint;

interface HttpProviderCapabilities {
    readonly server: boolean;
    readonly client: boolean;
    readonly streaming: boolean;
    readonly multiplexing: boolean;
    readonly edgeRuntime: boolean;
}
interface HttpProviderMetadata {
    readonly id: string;
    readonly name: string;
    readonly version: string;
    readonly attributes: HttpAttributes;
}
type HttpProviderLifecycleState = 'created' | 'initialized' | 'healthy' | 'shutting-down' | 'stopped';
interface HttpProviderLifecycle extends HttpLifecycleRecord<HttpProviderLifecycleState> {
}
interface HttpProvider {
    readonly metadata: HttpProviderMetadata;
    readonly lifecycle: HttpProviderLifecycle;
    readonly capabilities: HttpProviderCapabilities;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    healthCheck(): Promise<HttpProviderHealth>;
}
interface HttpProviderHealth {
    readonly healthy: boolean;
    readonly checkedAt: Date;
    readonly message: string | undefined;
}
interface HttpProviderRegistry extends HttpMutableRegistry<HttpProvider> {
}
declare const createHttpProvider: (metadata: HttpProviderMetadata, capabilities: HttpProviderCapabilities, now?: Date) => HttpProvider;
declare const createHttpProviderRegistry: () => HttpProviderRegistry;

export { DefaultHttpContextStore, DefaultHttpHeaders, DefaultHttpLifecycle, DefaultHttpMetadata, DefaultHttpMethodRegistry, DefaultHttpProtocolRegistry, DefaultHttpStatusRegistry, type HttpAttributes, type HttpClient, type HttpClientConfiguration, type HttpClientLifecycle, type HttpClientLifecycleState, type HttpClientMetadata, type HttpClientProvider, type HttpComponentKind, type HttpConnection, type HttpConnectionCapabilities, type HttpConnectionLifecycle, type HttpConnectionMetadata, type HttpConnectionState, type HttpContext, type HttpContextLifecycle, type HttpContextMetadata, type HttpContextServices, type HttpContextStore, type HttpCore, type HttpEndpoint, type HttpEndpointConfiguration, type HttpEndpointExecutionPolicy, type HttpEndpointHandler, type HttpEndpointLifecycle, type HttpEndpointLifecycleState, type HttpEndpointMetadata, type HttpHandler, type HttpHandlerChain, type HttpHandlerContext, type HttpHandlerLifecycle, type HttpHandlerLifecycleState, type HttpHandlerMetadata, type HttpHeader, type HttpHeaderCollection, type HttpHeaderLifecycle, type HttpHeaderMetadata, type HttpHeaders, type HttpIdentity, type HttpLifecycle, type HttpLifecycleEvent, type HttpLifecycleMetadata, type HttpLifecycleRecord, type HttpLifecycleState, type HttpLifecycleTransition, type HttpMessage, type HttpMessageBody, type HttpMessageBodyKind, type HttpMessageHeaders, type HttpMessageLifecycle, type HttpMessageMetadata, type HttpMetadata, type HttpMetadataCollection, type HttpMetadataEntry, type HttpMetadataLifecycle, type HttpMetadataRegistry, type HttpMethod, type HttpMethodCapabilities, type HttpMethodCategory, type HttpMethodLookup, type HttpMethodMetadata, type HttpMethodRegistry, type HttpMutableRegistry, type HttpPipeline, type HttpPipelineLifecycle, type HttpPipelineLifecycleState, type HttpPipelineMetadata, type HttpPipelineRegistry, type HttpPipelineStage, type HttpPipelineStageExecutor, type HttpProtocol, type HttpProtocolCapabilities, type HttpProtocolLifecycle, type HttpProtocolMetadata, type HttpProtocolRegistry, type HttpProtocolVersion, type HttpProvider, type HttpProviderCapabilities, type HttpProviderHealth, type HttpProviderLifecycle, type HttpProviderLifecycleState, type HttpProviderMetadata, type HttpProviderRegistry, type HttpReadonlyRegistry, type HttpRecordValue, type HttpRegistry, type HttpRegistryEntry, type HttpRequestLine, type HttpRequestLineLifecycle, type HttpRequestLineMetadata, type HttpRequestTarget, type HttpRequestTargetKind, type HttpServer, type HttpServerConfiguration, type HttpServerLifecycle, type HttpServerLifecycleState, type HttpServerMetadata, type HttpServerProvider, type HttpStatus, type HttpStatusCategory, type HttpStatusLookup, type HttpStatusMetadata, type HttpStatusRegistry, type HttpTimestamped, InMemoryHttpRegistry, STANDARD_HTTP_METHODS, STANDARD_HTTP_PROTOCOLS, STANDARD_HTTP_STATUSES, SequentialHttpHandlerChain, createEmptyHttpMessageBody, createHttpClient, createHttpConnection, createHttpContext, createHttpCore, createHttpEndpoint, createHttpHandlerLifecycle, createHttpMessage, createHttpMetadataId, createHttpMethod, createHttpPipeline, createHttpProtocol, createHttpProvider, createHttpProviderRegistry, createHttpRequestLine, createHttpRequestTarget, createHttpServer, createHttpStatus, executeHttpPipeline, executeHttpPipelineStage, getHttpStatusCategory, getOrderedHttpPipelineStages, normalizeHttpHeaderName, reorderHttpPipelineStage };
