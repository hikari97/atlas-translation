// src/shared.ts
var InMemoryHttpRegistry = class {
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
var createHttpMetadataId = (kind, id) => `${kind}:${id}`;

// src/metadata.ts
var DefaultHttpMetadata = class {
  registry = new InMemoryHttpRegistry();
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
var DefaultHttpLifecycle = class {
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
    const at = /* @__PURE__ */ new Date();
    const transition = { from: this.currentState, to: state, at };
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

// src/headers.ts
var normalizeHttpHeaderName = (name) => name.trim().toLowerCase();
var DefaultHttpHeaders = class {
  headers = /* @__PURE__ */ new Map();
  metadata;
  lifecycle;
  constructor(headers = [], now = /* @__PURE__ */ new Date(), attributes = {}) {
    this.metadata = { attributes };
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
    headers.forEach((header) => this.set(header));
  }
  has(name) {
    return this.headers.has(normalizeHttpHeaderName(name));
  }
  get(name) {
    return this.headers.get(normalizeHttpHeaderName(name));
  }
  set(header) {
    this.headers.set(normalizeHttpHeaderName(header.name), header);
  }
  remove(name) {
    this.headers.delete(normalizeHttpHeaderName(name));
  }
  entries() {
    return Array.from(this.headers.values());
  }
};

// src/method.ts
var DefaultHttpMethodRegistry = class {
  methods = /* @__PURE__ */ new Map();
  constructor(methods = STANDARD_HTTP_METHODS) {
    methods.forEach((method) => this.register(method));
  }
  register(method) {
    this.methods.set(method.name.toUpperCase(), method);
  }
  lookup(name) {
    return this.methods.get(name.toUpperCase());
  }
  entries() {
    return Array.from(this.methods.values());
  }
};
var createHttpMethod = (name, category, description, capabilities, attributes = {}) => ({
  name: name.toUpperCase(),
  category,
  capabilities,
  metadata: { description, attributes }
});
var STANDARD_HTTP_METHODS = [
  createHttpMethod("GET", "safe", "Retrieve a resource representation.", {
    safe: true,
    idempotent: true,
    cacheable: true
  }),
  createHttpMethod("POST", "unsafe", "Submit a resource representation for processing.", {
    safe: false,
    idempotent: false,
    cacheable: true
  }),
  createHttpMethod("PUT", "idempotent", "Replace a resource representation.", {
    safe: false,
    idempotent: true,
    cacheable: false
  }),
  createHttpMethod("PATCH", "unsafe", "Apply a partial resource modification.", {
    safe: false,
    idempotent: false,
    cacheable: false
  }),
  createHttpMethod("DELETE", "idempotent", "Remove a resource representation.", {
    safe: false,
    idempotent: true,
    cacheable: false
  }),
  createHttpMethod("HEAD", "safe", "Retrieve response metadata.", {
    safe: true,
    idempotent: true,
    cacheable: true
  }),
  createHttpMethod("OPTIONS", "safe", "Describe communication options.", {
    safe: true,
    idempotent: true,
    cacheable: false
  }),
  createHttpMethod("TRACE", "safe", "Perform a message loop-back test.", {
    safe: true,
    idempotent: true,
    cacheable: false
  }),
  createHttpMethod("CONNECT", "unsafe", "Establish a tunnel to a server.", {
    safe: false,
    idempotent: false,
    cacheable: false
  })
];

// src/status.ts
var getHttpStatusCategory = (code) => {
  if (code >= 100 && code < 200) {
    return "informational";
  }
  if (code >= 200 && code < 300) {
    return "success";
  }
  if (code >= 300 && code < 400) {
    return "redirection";
  }
  if (code >= 400 && code < 500) {
    return "client-error";
  }
  if (code >= 500 && code < 600) {
    return "server-error";
  }
  return "custom";
};
var DefaultHttpStatusRegistry = class {
  statuses = /* @__PURE__ */ new Map();
  constructor(statuses = STANDARD_HTTP_STATUSES) {
    statuses.forEach((status) => this.register(status));
  }
  register(status) {
    this.statuses.set(status.code, status);
  }
  lookup(code) {
    return this.statuses.get(code);
  }
  entries() {
    return Array.from(this.statuses.values());
  }
};
var createHttpStatus = (code, phrase, attributes = {}) => ({
  code,
  phrase,
  category: getHttpStatusCategory(code),
  metadata: { attributes }
});
var STANDARD_HTTP_STATUSES = [
  createHttpStatus(100, "Continue"),
  createHttpStatus(101, "Switching Protocols"),
  createHttpStatus(200, "OK"),
  createHttpStatus(201, "Created"),
  createHttpStatus(202, "Accepted"),
  createHttpStatus(204, "No Content"),
  createHttpStatus(301, "Moved Permanently"),
  createHttpStatus(302, "Found"),
  createHttpStatus(304, "Not Modified"),
  createHttpStatus(400, "Bad Request"),
  createHttpStatus(401, "Unauthorized"),
  createHttpStatus(403, "Forbidden"),
  createHttpStatus(404, "Not Found"),
  createHttpStatus(409, "Conflict"),
  createHttpStatus(422, "Unprocessable Content"),
  createHttpStatus(500, "Internal Server Error"),
  createHttpStatus(502, "Bad Gateway"),
  createHttpStatus(503, "Service Unavailable")
];

// src/protocol.ts
var DefaultHttpProtocolRegistry = class {
  protocols = /* @__PURE__ */ new Map();
  constructor(protocols = STANDARD_HTTP_PROTOCOLS) {
    protocols.forEach((protocol) => this.register(protocol));
  }
  register(protocol) {
    this.protocols.set(protocol.version, protocol);
  }
  lookup(version) {
    return this.protocols.get(version);
  }
  entries() {
    return Array.from(this.protocols.values());
  }
};
var createHttpProtocol = (version, capabilities, attributes = {}, now = /* @__PURE__ */ new Date()) => ({
  version,
  capabilities,
  metadata: { attributes },
  lifecycle: {
    state: "active",
    transitions: ["created", "active"],
    createdAt: now,
    updatedAt: now
  }
});
var STANDARD_HTTP_PROTOCOLS = [
  createHttpProtocol("HTTP/1.0", {
    persistentConnections: false,
    multiplexing: false,
    headerCompression: false,
    serverPush: false,
    streamPriority: false
  }),
  createHttpProtocol("HTTP/1.1", {
    persistentConnections: true,
    multiplexing: false,
    headerCompression: false,
    serverPush: false,
    streamPriority: false
  }),
  createHttpProtocol("HTTP/2", {
    persistentConnections: true,
    multiplexing: true,
    headerCompression: true,
    serverPush: true,
    streamPriority: true
  }),
  createHttpProtocol("HTTP/3", {
    persistentConnections: true,
    multiplexing: true,
    headerCompression: true,
    serverPush: false,
    streamPriority: true
  })
];

// src/request-line.ts
var createHttpRequestTarget = (value, kind = "origin-form") => ({
  value,
  kind
});
var createHttpRequestLine = (method, target, protocol, attributes = {}, now = /* @__PURE__ */ new Date()) => ({
  method,
  target,
  protocol,
  metadata: { attributes },
  lifecycle: {
    state: "active",
    transitions: ["created", "active"],
    createdAt: now,
    updatedAt: now
  }
});

// src/message.ts
var createEmptyHttpMessageBody = () => ({
  kind: "empty",
  contentType: void 0,
  contentLength: void 0,
  value: void 0
});
var createHttpMessage = (headers, body = createEmptyHttpMessageBody(), attributes = {}, now = /* @__PURE__ */ new Date()) => ({
  metadata: { attributes },
  headers,
  body,
  lifecycle: {
    state: "created",
    transitions: ["created"],
    createdAt: now,
    updatedAt: now
  }
});

// src/context.ts
var DefaultHttpContextStore = class {
  values = new InMemoryHttpRegistry();
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
var createHttpContext = (metadata, services = new InMemoryHttpRegistry(), store = new DefaultHttpContextStore(), now = /* @__PURE__ */ new Date()) => ({
  metadata,
  services,
  store,
  lifecycle: {
    state: "initialized",
    transitions: ["created", "initialized"],
    createdAt: now,
    updatedAt: now
  }
});

// src/core.ts
var createHttpCore = (context, lifecycle, metadata, registry = new InMemoryHttpRegistry()) => ({
  registry,
  context,
  lifecycle,
  metadata
});

// src/connection.ts
var createHttpConnection = (id, capabilities, state = "open", attributes = {}, now = /* @__PURE__ */ new Date()) => ({
  state,
  capabilities,
  metadata: { id, attributes },
  lifecycle: {
    state,
    transitions: [state],
    createdAt: now,
    updatedAt: now
  }
});

// src/server.ts
var createHttpServer = (configuration, provider, id, attributes = {}, now = /* @__PURE__ */ new Date()) => ({
  configuration,
  provider,
  metadata: { id, attributes },
  lifecycle: {
    state: "initialized",
    transitions: ["initialized"],
    createdAt: now,
    updatedAt: now
  }
});

// src/client.ts
var createHttpClient = (configuration, provider, id, attributes = {}, now = /* @__PURE__ */ new Date()) => ({
  configuration,
  provider,
  metadata: { id, attributes },
  lifecycle: {
    state: "ready",
    transitions: ["initialized", "ready"],
    createdAt: now,
    updatedAt: now
  }
});

// src/pipeline.ts
var createHttpPipeline = (metadata, registry = new InMemoryHttpRegistry(), now = /* @__PURE__ */ new Date()) => ({
  registry,
  metadata,
  lifecycle: {
    state: "initialized",
    transitions: ["initialized"],
    createdAt: now,
    updatedAt: now
  }
});
var getOrderedHttpPipelineStages = (pipeline) => pipeline.registry.entries().map((entry) => entry.value).sort((left, right) => left.order - right.order);
var reorderHttpPipelineStage = (pipeline, stageId, order) => {
  const stage = pipeline.registry.get(stageId);
  if (stage === void 0) {
    return void 0;
  }
  const reordered = {
    ...stage,
    order
  };
  pipeline.registry.register({
    id: reordered.id,
    name: reordered.name,
    value: reordered
  });
  return reordered;
};
var executeHttpPipelineStage = async (stage, context) => {
  await stage.execute(context);
};
var executeHttpPipeline = async (pipeline, context) => {
  const stages = getOrderedHttpPipelineStages(pipeline);
  for (const stage of stages) {
    await executeHttpPipelineStage(stage, context);
  }
};

// src/handler.ts
var SequentialHttpHandlerChain = class {
  constructor(handlers) {
    this.handlers = handlers;
  }
  handlers;
  index = 0;
  async next(context) {
    const handler = this.handlers[this.index];
    if (handler === void 0) {
      return;
    }
    this.index += 1;
    await handler.handle(context);
  }
};
var createHttpHandlerLifecycle = (now = /* @__PURE__ */ new Date()) => ({
  state: "initialized",
  transitions: ["initialized"],
  createdAt: now,
  updatedAt: now
});

// src/endpoint.ts
var createHttpEndpoint = (configuration, handler, metadata, now = /* @__PURE__ */ new Date()) => ({
  method: configuration.method,
  target: configuration.target,
  handler,
  metadata,
  configuration,
  policies: configuration.policies,
  lifecycle: {
    state: "active",
    transitions: ["initialized", "active"],
    createdAt: now,
    updatedAt: now
  }
});

// src/provider.ts
var createHttpProvider = (metadata, capabilities, now = /* @__PURE__ */ new Date()) => ({
  metadata,
  capabilities,
  lifecycle: {
    state: "created",
    transitions: ["created"],
    createdAt: now,
    updatedAt: now
  },
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
var createHttpProviderRegistry = () => new InMemoryHttpRegistry();

export { DefaultHttpContextStore, DefaultHttpHeaders, DefaultHttpLifecycle, DefaultHttpMetadata, DefaultHttpMethodRegistry, DefaultHttpProtocolRegistry, DefaultHttpStatusRegistry, InMemoryHttpRegistry, STANDARD_HTTP_METHODS, STANDARD_HTTP_PROTOCOLS, STANDARD_HTTP_STATUSES, SequentialHttpHandlerChain, createEmptyHttpMessageBody, createHttpClient, createHttpConnection, createHttpContext, createHttpCore, createHttpEndpoint, createHttpHandlerLifecycle, createHttpMessage, createHttpMetadataId, createHttpMethod, createHttpPipeline, createHttpProtocol, createHttpProvider, createHttpProviderRegistry, createHttpRequestLine, createHttpRequestTarget, createHttpServer, createHttpStatus, executeHttpPipeline, executeHttpPipelineStage, getHttpStatusCategory, getOrderedHttpPipelineStages, normalizeHttpHeaderName, reorderHttpPipelineStage };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map