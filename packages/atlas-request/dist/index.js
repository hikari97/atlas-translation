// src/shared.ts
var InMemoryRequestRegistry = class {
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
var DefaultRequestMetadata = class {
  registry = new InMemoryRequestRegistry();
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
var DefaultRequestLifecycle = class {
  constructor(metadata, initialState = "created", now = /* @__PURE__ */ new Date()) {
    this.metadata = metadata;
    this.currentState = initialState;
    this.record = {
      state: initialState,
      transitions: [initialState],
      createdAt: now,
      updatedAt: now
    };
  }
  metadata;
  currentState;
  history = [];
  eventHistory = [];
  record;
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

// src/http-request.ts
var createHttpRequestIdentity = (id, line) => ({
  id,
  method: line.method.name,
  target: line.target.value
});
var createHttpRequest = (identity, composition, metadata, lifecycle) => ({
  identity,
  line: composition.line,
  headers: composition.headers,
  protocol: composition.protocol,
  context: composition.context,
  metadata,
  lifecycle
});

// src/body.ts
var DefaultRequestBody = class {
  constructor(type, content, metadata = { attributes: {} }, now = /* @__PURE__ */ new Date()) {
    this.type = type;
    this.content = content;
    this.metadata = metadata;
    this.lifecycle = {
      state: content.contentLength === 0 ? "created" : "available",
      transitions: content.contentLength === 0 ? ["created"] : ["created", "available"],
      createdAt: now,
      updatedAt: now
    };
  }
  type;
  content;
  metadata;
  lifecycle;
  isEmpty() {
    return this.content.contentLength === 0;
  }
  size() {
    return this.content.contentLength;
  }
};
var createEmptyRequestBody = () => new DefaultRequestBody("empty", {
  value: void 0,
  contentType: void 0,
  contentLength: 0
});

// src/headers.ts
var DefaultRequestHeaders = class {
  constructor(headers, metadata = { attributes: {} }, now = /* @__PURE__ */ new Date()) {
    this.headers = headers;
    this.metadata = metadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
  }
  headers;
  metadata;
  lifecycle;
  has(name) {
    return this.headers.has(name);
  }
  get(name) {
    return this.headers.get(name)?.value;
  }
  entries() {
    return this.headers.entries().map((header) => ({
      name: header.name,
      value: header.value,
      attributes: header.attributes
    }));
  }
  authorization() {
    return this.get("authorization");
  }
  contentType() {
    return this.get("content-type");
  }
  accept() {
    return this.get("accept");
  }
  host() {
    return this.get("host");
  }
  userAgent() {
    return this.get("user-agent");
  }
};

// src/query.ts
var DefaultRequestQuery = class {
  constructor(parameters = [], metadata = { attributes: {} }, now = /* @__PURE__ */ new Date()) {
    this.metadata = metadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
    parameters.forEach((parameter) => this.parameters.set(parameter.key, parameter));
  }
  metadata;
  parameters = /* @__PURE__ */ new Map();
  lifecycle;
  has(key) {
    return this.parameters.has(key);
  }
  get(key) {
    return this.parameters.get(key)?.values[0];
  }
  getAll(key) {
    return this.parameters.get(key)?.values ?? [];
  }
  keys() {
    return Array.from(this.parameters.keys());
  }
  entries() {
    return Array.from(this.parameters.values());
  }
};

// src/parameters.ts
var DefaultRequestParameters = class _DefaultRequestParameters {
  constructor(parameters = [], metadata = { attributes: {} }, now = /* @__PURE__ */ new Date()) {
    this.metadata = metadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
    parameters.forEach((parameter) => this.parameters.set(parameter.key, parameter));
  }
  metadata;
  parameters = /* @__PURE__ */ new Map();
  lifecycle;
  static fromRouteParameters(routeParameters) {
    return new _DefaultRequestParameters(routeParameters.values().map((parameter) => ({
      key: parameter.name,
      values: [String(parameter.value)],
      attributes: {}
    })));
  }
  has(key) {
    return this.parameters.has(key);
  }
  get(key) {
    return this.parameters.get(key)?.values[0];
  }
  getAll(key) {
    return this.parameters.get(key)?.values ?? [];
  }
  keys() {
    return Array.from(this.parameters.keys());
  }
  entries() {
    return Array.from(this.parameters.values());
  }
};

// src/cookies.ts
var DefaultRequestCookies = class {
  constructor(cookies = [], metadata = { attributes: {} }, now = /* @__PURE__ */ new Date()) {
    this.metadata = metadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
    cookies.forEach((cookie) => this.cookies.set(cookie.name, cookie));
  }
  metadata;
  cookies = /* @__PURE__ */ new Map();
  lifecycle;
  has(name) {
    return this.cookies.has(name);
  }
  get(name) {
    return this.cookies.get(name)?.value;
  }
  keys() {
    return Array.from(this.cookies.keys());
  }
  values() {
    return Array.from(this.cookies.values());
  }
};

// src/files.ts
var DefaultRequestFiles = class {
  constructor(files = [], metadata = { attributes: {} }, now = /* @__PURE__ */ new Date()) {
    this.metadata = metadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
    files.forEach((file) => {
      const existing = this.files.get(file.name) ?? [];
      this.files.set(file.name, [...existing, file]);
    });
  }
  metadata;
  files = /* @__PURE__ */ new Map();
  lifecycle;
  has(name) {
    return this.files.has(name);
  }
  get(name) {
    return this.files.get(name)?.[0];
  }
  getAll(name) {
    return this.files.get(name) ?? [];
  }
  keys() {
    return Array.from(this.files.keys());
  }
  values() {
    return Array.from(this.files.values()).flat();
  }
};

// src/session.ts
var DefaultRequestSession = class {
  constructor(sessionMetadata, entries = [], now = /* @__PURE__ */ new Date()) {
    this.sessionMetadata = sessionMetadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
    entries.forEach((entry) => this.store.register(entry));
  }
  sessionMetadata;
  lifecycle;
  store = new InMemoryRequestRegistry();
  has(key) {
    return this.store.has(key);
  }
  get(key) {
    return this.store.get(key);
  }
  keys() {
    return this.store.entries().map((entry) => entry.id);
  }
  metadata() {
    return this.sessionMetadata;
  }
};

// src/context.ts
var createRequestContext = (request, headers, body, query, parameters, cookies, files, session, metadata, lifecycle, state, storage = new InMemoryRequestRegistry()) => ({
  request,
  headers,
  body,
  query,
  parameters,
  cookies,
  files,
  session,
  metadata,
  lifecycle,
  state,
  storage,
  services: () => storage.entries().map((entry) => ({
    key: entry.id,
    value: entry.value
  }))
});

// src/core.ts
var createRequestCore = (context, lifecycle, metadata, registry = new InMemoryRequestRegistry()) => ({
  context,
  lifecycle,
  metadata,
  registry
});

// src/provider.ts
var createRequestProviderRegistry = () => new InMemoryRequestRegistry();
var createRequestProviderMetadata = (metadata, id, name, version, attributes = {}) => Object.assign(metadata, {
  id,
  name,
  version,
  attributes
});
var createRequestProvider = (metadata, lifecycle, capabilities) => ({
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

export { DefaultRequestBody, DefaultRequestCookies, DefaultRequestFiles, DefaultRequestHeaders, DefaultRequestLifecycle, DefaultRequestMetadata, DefaultRequestParameters, DefaultRequestQuery, DefaultRequestSession, InMemoryRequestRegistry, createEmptyRequestBody, createHttpRequest, createHttpRequestIdentity, createRequestContext, createRequestCore, createRequestProvider, createRequestProviderMetadata, createRequestProviderRegistry };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map