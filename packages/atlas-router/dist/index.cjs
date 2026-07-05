'use strict';

// src/shared.ts
var InMemoryRouterRegistry = class {
  values = /* @__PURE__ */ new Map();
  has(id) {
    return this.values.has(id);
  }
  get(id) {
    return this.values.get(id)?.value;
  }
  register(entry) {
    this.values.set(entry.id, entry);
  }
  remove(id) {
    this.values.delete(id);
  }
  entries() {
    return Array.from(this.values.values());
  }
};

// src/metadata.ts
var DefaultRouteMetadata = class {
  registry = new InMemoryRouterRegistry();
  lifecycle;
  constructor(now = /* @__PURE__ */ new Date()) {
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
  }
  has(key) {
    return this.registry.has(key);
  }
  get(key) {
    return this.registry.get(key)?.value;
  }
  set(key, value, attributes = {}) {
    this.registry.register({
      id: key,
      name: key,
      value: { key, value, attributes }
    });
  }
  remove(key) {
    this.registry.remove(key);
  }
  entries() {
    return this.registry.entries().map((entry) => entry.value);
  }
};

// src/lifecycle.ts
var DefaultRouteLifecycle = class {
  currentState;
  history = [];
  eventHistory = [];
  metadata;
  record;
  constructor(metadata, initialState = "created", now = /* @__PURE__ */ new Date()) {
    this.currentState = initialState;
    this.metadata = metadata;
    this.record = {
      state: initialState,
      transitions: [initialState],
      createdAt: now,
      updatedAt: now
    };
  }
  get state() {
    return this.currentState;
  }
  transition(state) {
    const transition = { from: this.currentState, to: state, at: /* @__PURE__ */ new Date() };
    this.history.push(transition);
    this.eventHistory.push({ state, transition, metadata: this.metadata });
    this.currentState = state;
  }
  transitions() {
    return [...this.history];
  }
  events() {
    return [...this.eventHistory];
  }
};

// src/route.ts
var createRouteIdentity = (id, name, path, method) => ({
  id,
  name,
  path,
  method
});
var routeTargetToIdentityPath = (target) => target.value;
var createRoute = (identity, endpoint, metadata, lifecycle) => ({
  identity,
  endpoint,
  metadata,
  lifecycle
});

// src/registry.ts
var DefaultRouteRegistry = class {
  values = /* @__PURE__ */ new Map();
  metadata;
  lifecycle;
  constructor(metadata, now = /* @__PURE__ */ new Date()) {
    this.metadata = metadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
  }
  register(route) {
    this.values.set(route.identity.id, route);
  }
  unregister(route) {
    this.values.delete(route.identity.id);
  }
  has(identity) {
    return this.values.has(identity.id);
  }
  get(identity) {
    return this.values.get(identity.id);
  }
  routes() {
    return Array.from(this.values.values());
  }
  entries() {
    return this.routes().map((route) => ({
      identity: route.identity,
      route
    }));
  }
};

// src/group.ts
var createRouteGroup = (configuration, registry, metadata, lifecycle) => ({
  configuration,
  registry,
  metadata,
  lifecycle
});
var getRouteGroupRoutes = (group) => group.registry.routes();

// src/collection.ts
var DefaultRouteCollection = class _DefaultRouteCollection {
  constructor(routes, metadata, lifecycle) {
    this.metadata = metadata;
    this.lifecycle = lifecycle;
    this.values = [...routes];
  }
  metadata;
  lifecycle;
  values;
  size() {
    return this.values.length;
  }
  isEmpty() {
    return this.values.length === 0;
  }
  contains(route) {
    return this.values.some((value) => value.identity.id === route.identity.id);
  }
  iterator() {
    return [...this.values];
  }
  filter(filter) {
    return new _DefaultRouteCollection(this.values.filter(filter), this.metadata, this.lifecycle);
  }
  toArray() {
    return [...this.values];
  }
};

// src/parameters.ts
var DefaultRouteParameters = class {
  constructor(parameters, metadata, now = /* @__PURE__ */ new Date()) {
    this.metadata = metadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
    parameters.forEach((parameter) => this.parameters.set(parameter.name, parameter));
  }
  metadata;
  parameters = /* @__PURE__ */ new Map();
  lifecycle;
  has(name) {
    return this.parameters.has(name);
  }
  get(name) {
    return this.parameters.get(name)?.value;
  }
  keys() {
    return Array.from(this.parameters.keys());
  }
  values() {
    return Array.from(this.parameters.values());
  }
};

// src/constraints.ts
var DefaultRouteConstraints = class {
  constructor(metadata, constraints = [], now = /* @__PURE__ */ new Date()) {
    this.metadata = metadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
    constraints.forEach((constraint) => this.registry.register({
      id: constraint.id,
      name: constraint.name,
      value: constraint
    }));
  }
  metadata;
  registry = new InMemoryRouterRegistry();
  lifecycle;
  evaluate(route, parameters) {
    return this.evaluations(route, parameters).every((evaluation) => evaluation.passed);
  }
  evaluations(route, parameters) {
    return this.registry.entries().map((entry) => ({
      constraint: entry.value,
      passed: entry.value.evaluate(route, parameters)
    }));
  }
};
var createRouteConstraint = (id, name, kind, metadata, evaluate) => ({
  id,
  name,
  kind,
  metadata,
  evaluate
});

// src/matcher.ts
var createRouteMatchResult = (matched, metadata, match = void 0) => ({
  matched,
  match,
  metadata
});

// src/resolver.ts
var createRouteCandidates = (matches) => matches.filter((result) => result.matched && result.match !== void 0).map((result, order) => ({
  route: result.match.route,
  score: result.match.score,
  order,
  match: result
}));
var HighestScoreRouteResolver = class {
  constructor(metadata, now = /* @__PURE__ */ new Date()) {
    this.metadata = metadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
  }
  metadata;
  lifecycle;
  policy = "highest-score";
  resolve(matches) {
    const candidates = createRouteCandidates(matches);
    const candidate = [...candidates].sort((left, right) => right.score - left.score || left.order - right.order)[0];
    return {
      resolved: candidate !== void 0,
      route: candidate?.route,
      endpoint: candidate?.route.endpoint,
      candidate,
      policy: this.policy
    };
  }
};

// src/context.ts
var DefaultRouteContextStorage = class {
  values = new InMemoryRouterRegistry();
  has(key) {
    return this.values.has(key);
  }
  get(key) {
    return this.values.get(key);
  }
  set(key, value) {
    this.values.register({ id: key, name: key, value });
  }
  remove(key) {
    this.values.remove(key);
  }
  entries() {
    return this.values.entries();
  }
};
var createRouteContext = (metadata, lifecycle, state, storage = new DefaultRouteContextStorage()) => ({
  metadata,
  lifecycle,
  state,
  storage
});

// src/core.ts
var createRouterCore = (context, lifecycle, metadata, registry = new InMemoryRouterRegistry()) => ({
  registry,
  context,
  lifecycle,
  metadata
});

// src/provider.ts
var createRouteProviderRegistry = () => new InMemoryRouterRegistry();
var createRouteProviderMetadata = (metadata, id, name, version, attributes = {}) => Object.assign(metadata, {
  id,
  name,
  version,
  attributes
});
var createRouteProvider = (metadata, lifecycle, capabilities) => ({
  metadata,
  lifecycle,
  capabilities,
  async initialize() {
  },
  async shutdown() {
  },
  async healthCheck() {
    return {
      healthy: true,
      checkedAt: /* @__PURE__ */ new Date(),
      message: void 0
    };
  }
});

exports.DefaultRouteCollection = DefaultRouteCollection;
exports.DefaultRouteConstraints = DefaultRouteConstraints;
exports.DefaultRouteContextStorage = DefaultRouteContextStorage;
exports.DefaultRouteLifecycle = DefaultRouteLifecycle;
exports.DefaultRouteMetadata = DefaultRouteMetadata;
exports.DefaultRouteParameters = DefaultRouteParameters;
exports.DefaultRouteRegistry = DefaultRouteRegistry;
exports.HighestScoreRouteResolver = HighestScoreRouteResolver;
exports.InMemoryRouterRegistry = InMemoryRouterRegistry;
exports.createRoute = createRoute;
exports.createRouteCandidates = createRouteCandidates;
exports.createRouteConstraint = createRouteConstraint;
exports.createRouteContext = createRouteContext;
exports.createRouteGroup = createRouteGroup;
exports.createRouteIdentity = createRouteIdentity;
exports.createRouteMatchResult = createRouteMatchResult;
exports.createRouteProvider = createRouteProvider;
exports.createRouteProviderMetadata = createRouteProviderMetadata;
exports.createRouteProviderRegistry = createRouteProviderRegistry;
exports.createRouterCore = createRouterCore;
exports.getRouteGroupRoutes = getRouteGroupRoutes;
exports.routeTargetToIdentityPath = routeTargetToIdentityPath;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map