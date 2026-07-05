import { HttpMethod, HttpEndpoint, HttpRequestTarget, HttpContext } from '@atlas/atlas-http';

type RouterRecordValue = string | number | boolean | null | readonly RouterRecordValue[] | {
    readonly [key: string]: RouterRecordValue;
};
type RouterAttributes = Readonly<Record<string, RouterRecordValue>>;
interface RouterIdentity {
    readonly id: string;
    readonly name: string;
}
interface RouterTimestamped {
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
interface RouterLifecycleRecord<TState extends string> extends RouterTimestamped {
    readonly state: TState;
    readonly transitions: readonly string[];
}
interface RouterRegistryEntry<TValue> extends RouterIdentity {
    readonly value: TValue;
}
interface RouterReadonlyRegistry<TValue> {
    has(id: string): boolean;
    get(id: string): TValue | undefined;
    entries(): readonly RouterRegistryEntry<TValue>[];
}
interface RouterMutableRegistry<TValue> extends RouterReadonlyRegistry<TValue> {
    register(entry: RouterRegistryEntry<TValue>): void;
    remove(id: string): void;
}
declare class InMemoryRouterRegistry<TValue> implements RouterMutableRegistry<TValue> {
    private readonly values;
    has(id: string): boolean;
    get(id: string): TValue | undefined;
    register(entry: RouterRegistryEntry<TValue>): void;
    remove(id: string): void;
    entries(): readonly RouterRegistryEntry<TValue>[];
}

interface RouteMetadataEntry<TValue = unknown> {
    readonly key: string;
    readonly value: TValue;
    readonly attributes: RouterAttributes;
}
interface RouteMetadataLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RouteMetadataRegistry extends RouterMutableRegistry<RouteMetadataEntry> {
}
interface RouteMetadataCollection {
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue, attributes?: RouterAttributes): void;
    remove(key: string): void;
    entries(): readonly RouteMetadataEntry[];
}
interface RouteMetadata extends RouteMetadataCollection {
    readonly registry: RouteMetadataRegistry;
    readonly lifecycle: RouteMetadataLifecycle;
}
declare class DefaultRouteMetadata implements RouteMetadata {
    readonly registry: RouteMetadataRegistry;
    readonly lifecycle: RouteMetadataLifecycle;
    constructor(now?: Date);
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue, attributes?: RouterAttributes): void;
    remove(key: string): void;
    entries(): readonly RouteMetadataEntry[];
}

type RouteLifecycleState = 'created' | 'registered' | 'enabled' | 'disabled' | 'deprecated' | 'removed';
interface RouteLifecycleTransition {
    readonly from: RouteLifecycleState;
    readonly to: RouteLifecycleState;
    readonly at: Date;
}
interface RouteLifecycleEvent {
    readonly state: RouteLifecycleState;
    readonly transition: RouteLifecycleTransition;
    readonly metadata: RouteLifecycleMetadata;
}
interface RouteLifecycleMetadata extends RouteMetadata {
}
interface RouteLifecycle {
    readonly state: RouteLifecycleState;
    readonly metadata: RouteLifecycleMetadata;
    readonly record: RouterLifecycleRecord<RouteLifecycleState>;
    transition(state: RouteLifecycleState): void;
    transitions(): readonly RouteLifecycleTransition[];
    events(): readonly RouteLifecycleEvent[];
}
declare class DefaultRouteLifecycle implements RouteLifecycle {
    private currentState;
    private readonly history;
    private readonly eventHistory;
    readonly metadata: RouteLifecycleMetadata;
    readonly record: RouterLifecycleRecord<RouteLifecycleState>;
    constructor(metadata: RouteLifecycleMetadata, initialState?: RouteLifecycleState, now?: Date);
    get state(): RouteLifecycleState;
    transition(state: RouteLifecycleState): void;
    transitions(): readonly RouteLifecycleTransition[];
    events(): readonly RouteLifecycleEvent[];
}

interface RouteIdentity {
    readonly id: string;
    readonly name: string;
    readonly path: string;
    readonly method: HttpMethod;
}
interface RouteEndpoint {
    readonly endpoint: HttpEndpoint;
}
interface Route {
    readonly identity: RouteIdentity;
    readonly endpoint: HttpEndpoint;
    readonly metadata: RouteMetadata;
    readonly lifecycle: RouteLifecycle;
}
declare const createRouteIdentity: (id: string, name: string, path: string, method: HttpMethod) => RouteIdentity;
declare const routeTargetToIdentityPath: (target: HttpRequestTarget) => string;
declare const createRoute: (identity: RouteIdentity, endpoint: HttpEndpoint, metadata: RouteMetadata, lifecycle: RouteLifecycle) => Route;

interface RouteRegistryEntry {
    readonly identity: RouteIdentity;
    readonly route: Route;
}
interface RouteRegistryMetadata extends RouteMetadata {
}
interface RouteRegistryLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RouteRegistryLookup {
    has(identity: RouteIdentity): boolean;
    get(identity: RouteIdentity): Route | undefined;
}
interface RouteRegistry extends RouteRegistryLookup {
    readonly metadata: RouteRegistryMetadata;
    readonly lifecycle: RouteRegistryLifecycle;
    register(route: Route): void;
    unregister(route: Route): void;
    routes(): readonly Route[];
    entries(): readonly RouteRegistryEntry[];
}
declare class DefaultRouteRegistry implements RouteRegistry {
    private readonly values;
    readonly metadata: RouteRegistryMetadata;
    readonly lifecycle: RouteRegistryLifecycle;
    constructor(metadata: RouteRegistryMetadata, now?: Date);
    register(route: Route): void;
    unregister(route: Route): void;
    has(identity: RouteIdentity): boolean;
    get(identity: RouteIdentity): Route | undefined;
    routes(): readonly Route[];
    entries(): readonly RouteRegistryEntry[];
}

interface RouteGroupConfiguration {
    readonly id: string;
    readonly prefix: string;
    readonly version: string | undefined;
    readonly attributes: RouterAttributes;
}
interface RouteGroupRegistry extends RouteRegistry {
}
interface RouteGroupMetadata extends RouteMetadata {
}
interface RouteGroupLifecycle extends RouteLifecycle {
}
interface RouteGroup {
    readonly configuration: RouteGroupConfiguration;
    readonly registry: RouteGroupRegistry;
    readonly metadata: RouteGroupMetadata;
    readonly lifecycle: RouteGroupLifecycle;
}
declare const createRouteGroup: (configuration: RouteGroupConfiguration, registry: RouteGroupRegistry, metadata: RouteGroupMetadata, lifecycle: RouteGroupLifecycle) => RouteGroup;
declare const getRouteGroupRoutes: (group: RouteGroup) => readonly Route[];

interface RouteCollectionMetadata extends RouteMetadata {
}
interface RouteCollectionLifecycle extends RouteLifecycle {
}
type RouteCollectionFilter = (route: Route) => boolean;
interface RouteCollectionIterator extends Iterable<Route> {
}
interface RouteCollection {
    readonly metadata: RouteCollectionMetadata;
    readonly lifecycle: RouteCollectionLifecycle;
    size(): number;
    isEmpty(): boolean;
    contains(route: Route): boolean;
    iterator(): Iterable<Route>;
    filter(filter: RouteCollectionFilter): RouteCollection;
    toArray(): readonly Route[];
}
declare class DefaultRouteCollection implements RouteCollection {
    readonly metadata: RouteCollectionMetadata;
    readonly lifecycle: RouteCollectionLifecycle;
    private readonly values;
    constructor(routes: readonly Route[], metadata: RouteCollectionMetadata, lifecycle: RouteCollectionLifecycle);
    size(): number;
    isEmpty(): boolean;
    contains(route: Route): boolean;
    iterator(): Iterable<Route>;
    filter(filter: RouteCollectionFilter): RouteCollection;
    toArray(): readonly Route[];
}

interface RouteParameter<TValue = unknown> {
    readonly name: string;
    readonly value: TValue;
    readonly metadata: RouteParameterMetadata;
}
interface RouteParameterMetadata extends RouteMetadata {
}
interface RouteParameterLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RouteParameterCollection {
    has(name: string): boolean;
    get<TValue>(name: string): TValue | undefined;
    keys(): readonly string[];
    values(): readonly RouteParameter[];
}
interface RouteParameters extends RouteParameterCollection {
    readonly metadata: RouteParameterMetadata;
    readonly lifecycle: RouteParameterLifecycle;
}
declare class DefaultRouteParameters implements RouteParameters {
    readonly metadata: RouteParameterMetadata;
    private readonly parameters;
    readonly lifecycle: RouteParameterLifecycle;
    constructor(parameters: readonly RouteParameter[], metadata: RouteParameterMetadata, now?: Date);
    has(name: string): boolean;
    get<TValue>(name: string): TValue | undefined;
    keys(): readonly string[];
    values(): readonly RouteParameter[];
}

type RouteConstraintKind = 'numeric' | 'uuid' | 'alpha' | 'alphanumeric' | 'regex' | 'custom';
interface RouteConstraintMetadata extends RouteMetadata {
}
interface RouteConstraintLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RouteConstraint {
    readonly id: string;
    readonly name: string;
    readonly kind: RouteConstraintKind;
    readonly metadata: RouteConstraintMetadata;
    evaluate(route: Route, parameters: RouteParameters): boolean;
}
interface RouteConstraintEvaluation {
    readonly constraint: RouteConstraint;
    readonly passed: boolean;
}
interface RouteConstraintRegistry extends RouterMutableRegistry<RouteConstraint> {
}
interface RouteConstraints {
    readonly registry: RouteConstraintRegistry;
    readonly metadata: RouteConstraintMetadata;
    readonly lifecycle: RouteConstraintLifecycle;
    evaluate(route: Route, parameters: RouteParameters): boolean;
    evaluations(route: Route, parameters: RouteParameters): readonly RouteConstraintEvaluation[];
}
declare class DefaultRouteConstraints implements RouteConstraints {
    readonly metadata: RouteConstraintMetadata;
    readonly registry: RouteConstraintRegistry;
    readonly lifecycle: RouteConstraintLifecycle;
    constructor(metadata: RouteConstraintMetadata, constraints?: readonly RouteConstraint[], now?: Date);
    evaluate(route: Route, parameters: RouteParameters): boolean;
    evaluations(route: Route, parameters: RouteParameters): readonly RouteConstraintEvaluation[];
}
declare const createRouteConstraint: (id: string, name: string, kind: RouteConstraintKind, metadata: RouteConstraintMetadata, evaluate: (route: Route, parameters: RouteParameters) => boolean) => RouteConstraint;

type RouteMatchStrategy = 'exact' | 'prefix' | 'wildcard' | 'parameter' | 'regex' | 'custom';
interface RouteMatch {
    readonly route: Route;
    readonly parameters: RouteParameters;
    readonly score: number;
    readonly strategy: RouteMatchStrategy;
}
interface RouteMatchResult {
    readonly matched: boolean;
    readonly match: RouteMatch | undefined;
    readonly metadata: RouteMatcherMetadata;
}
interface RouteMatcherMetadata extends RouteMetadata {
}
interface RouteMatcherLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RouteMatcher {
    readonly metadata: RouteMatcherMetadata;
    readonly lifecycle: RouteMatcherLifecycle;
    readonly strategy: RouteMatchStrategy;
    match(route: Route, context: HttpContext): RouteMatchResult;
}
declare const createRouteMatchResult: (matched: boolean, metadata: RouteMatcherMetadata, match?: RouteMatch | undefined) => RouteMatchResult;

interface RouteCandidate {
    readonly route: Route;
    readonly score: number;
    readonly order: number;
    readonly match: RouteMatchResult;
}
type RouteResolutionPolicy = 'exact' | 'highest-score' | 'static-priority' | 'registration-order' | 'custom';
interface RouteResolution {
    readonly resolved: boolean;
    readonly route: Route | undefined;
    readonly endpoint: HttpEndpoint | undefined;
    readonly candidate: RouteCandidate | undefined;
    readonly policy: RouteResolutionPolicy;
}
interface RouteResolverMetadata extends RouteMetadata {
}
interface RouteResolverLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {
}
interface RouteResolver {
    readonly metadata: RouteResolverMetadata;
    readonly lifecycle: RouteResolverLifecycle;
    readonly policy: RouteResolutionPolicy;
    resolve(matches: readonly RouteMatchResult[]): RouteResolution;
}
declare const createRouteCandidates: (matches: readonly RouteMatchResult[]) => readonly RouteCandidate[];
declare class HighestScoreRouteResolver implements RouteResolver {
    readonly metadata: RouteResolverMetadata;
    readonly lifecycle: RouteResolverLifecycle;
    readonly policy: RouteResolutionPolicy;
    constructor(metadata: RouteResolverMetadata, now?: Date);
    resolve(matches: readonly RouteMatchResult[]): RouteResolution;
}

interface RouteContextState {
    readonly httpContext: HttpContext | undefined;
    readonly matches: readonly RouteMatchResult[];
    readonly parameters: RouteParameters | undefined;
    readonly constraints: readonly RouteConstraintEvaluation[];
    readonly resolution: RouteResolution | undefined;
}
interface RouteContextMetadata extends RouteMetadata {
}
interface RouteContextLifecycle extends RouteLifecycle {
}
interface RouteContextStorage {
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue): void;
    remove(key: string): void;
    entries(): readonly RouterRegistryEntry<unknown>[];
}
interface RouteContext {
    readonly metadata: RouteContextMetadata;
    readonly lifecycle: RouteContextLifecycle;
    readonly state: RouteContextState;
    readonly storage: RouteContextStorage;
}
declare class DefaultRouteContextStorage implements RouteContextStorage {
    private readonly values;
    has(key: string): boolean;
    get<TValue>(key: string): TValue | undefined;
    set<TValue>(key: string, value: TValue): void;
    remove(key: string): void;
    entries(): readonly RouterRegistryEntry<unknown>[];
}
declare const createRouteContext: (metadata: RouteContextMetadata, lifecycle: RouteContextLifecycle, state: RouteContextState, storage?: RouteContextStorage) => RouteContext;

interface RouterRegistry extends RouterMutableRegistry<unknown> {
}
interface RouterContext extends RouteContext {
}
interface RouterLifecycle extends RouteLifecycle {
}
interface RouterMetadata extends RouteMetadata {
}
interface RouterCore {
    readonly registry: RouterRegistry;
    readonly context: RouterContext;
    readonly lifecycle: RouterLifecycle;
    readonly metadata: RouterMetadata;
}
declare const createRouterCore: (context: RouterContext, lifecycle: RouterLifecycle, metadata: RouterMetadata, registry?: RouterRegistry) => RouterCore;

interface RouteProviderCapabilities {
    readonly routeRegistration: boolean;
    readonly routeResolution: boolean;
    readonly dynamicRoutes: boolean;
    readonly groupedRoutes: boolean;
}
interface RouteProviderMetadata extends RouteMetadata {
    readonly id: string;
    readonly name: string;
    readonly version: string;
    readonly attributes: RouterAttributes;
}
interface RouteProviderLifecycle extends RouteLifecycle {
}
interface RouteProviderHealth {
    readonly healthy: boolean;
    readonly checkedAt: Date;
    readonly message: string | undefined;
}
interface RouteProvider {
    readonly metadata: RouteProviderMetadata;
    readonly lifecycle: RouteProviderLifecycle;
    readonly capabilities: RouteProviderCapabilities;
    initialize(): Promise<void>;
    shutdown(): Promise<void>;
    healthCheck(): Promise<RouteProviderHealth>;
}
interface RouteProviderRegistry extends RouterMutableRegistry<RouteProvider> {
}
declare const createRouteProviderRegistry: () => RouteProviderRegistry;
declare const createRouteProviderMetadata: (metadata: RouteMetadata, id: string, name: string, version: string, attributes?: RouterAttributes) => RouteProviderMetadata;
declare const createRouteProvider: (metadata: RouteProviderMetadata, lifecycle: RouteProviderLifecycle, capabilities: RouteProviderCapabilities) => RouteProvider;

export { DefaultRouteCollection, DefaultRouteConstraints, DefaultRouteContextStorage, DefaultRouteLifecycle, DefaultRouteMetadata, DefaultRouteParameters, DefaultRouteRegistry, HighestScoreRouteResolver, InMemoryRouterRegistry, type Route, type RouteCandidate, type RouteCollection, type RouteCollectionFilter, type RouteCollectionIterator, type RouteCollectionLifecycle, type RouteCollectionMetadata, type RouteConstraint, type RouteConstraintEvaluation, type RouteConstraintKind, type RouteConstraintLifecycle, type RouteConstraintMetadata, type RouteConstraintRegistry, type RouteConstraints, type RouteContext, type RouteContextLifecycle, type RouteContextMetadata, type RouteContextState, type RouteContextStorage, type RouteEndpoint, type RouteGroup, type RouteGroupConfiguration, type RouteGroupLifecycle, type RouteGroupMetadata, type RouteGroupRegistry, type RouteIdentity, type RouteLifecycle, type RouteLifecycleEvent, type RouteLifecycleMetadata, type RouteLifecycleState, type RouteLifecycleTransition, type RouteMatch, type RouteMatchResult, type RouteMatchStrategy, type RouteMatcher, type RouteMatcherLifecycle, type RouteMatcherMetadata, type RouteMetadata, type RouteMetadataCollection, type RouteMetadataEntry, type RouteMetadataLifecycle, type RouteMetadataRegistry, type RouteParameter, type RouteParameterCollection, type RouteParameterLifecycle, type RouteParameterMetadata, type RouteParameters, type RouteProvider, type RouteProviderCapabilities, type RouteProviderHealth, type RouteProviderLifecycle, type RouteProviderMetadata, type RouteProviderRegistry, type RouteRegistry, type RouteRegistryEntry, type RouteRegistryLifecycle, type RouteRegistryLookup, type RouteRegistryMetadata, type RouteResolution, type RouteResolutionPolicy, type RouteResolver, type RouteResolverLifecycle, type RouteResolverMetadata, type RouterAttributes, type RouterContext, type RouterCore, type RouterIdentity, type RouterLifecycle, type RouterLifecycleRecord, type RouterMetadata, type RouterMutableRegistry, type RouterReadonlyRegistry, type RouterRecordValue, type RouterRegistry, type RouterRegistryEntry, type RouterTimestamped, createRoute, createRouteCandidates, createRouteConstraint, createRouteContext, createRouteGroup, createRouteIdentity, createRouteMatchResult, createRouteProvider, createRouteProviderMetadata, createRouteProviderRegistry, createRouterCore, getRouteGroupRoutes, routeTargetToIdentityPath };
