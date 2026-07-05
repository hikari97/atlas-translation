'use strict';

var atlasHttp = require('@atlas/atlas-http');

// src/shared.ts
var InMemoryResponseRegistry = class {
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
var DefaultResponseMetadata = class {
  registry = new InMemoryResponseRegistry();
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
var DefaultResponseLifecycle = class {
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

// src/body.ts
var DefaultResponseBody = class {
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
var createEmptyResponseBody = () => new DefaultResponseBody("empty", {
  value: void 0,
  contentType: void 0,
  contentLength: 0
});

// src/status.ts
var getResponseStatusCategory = (code) => {
  if (code >= 100 && code < 200) return "informational";
  if (code >= 200 && code < 300) return "success";
  if (code >= 300 && code < 400) return "redirection";
  if (code >= 400 && code < 500) return "client-error";
  if (code >= 500 && code < 600) return "server-error";
  return "custom";
};
var createResponseStatus = (code, phrase, attributes = {}) => {
  const category = getResponseStatusCategory(code);
  return {
    code,
    phrase,
    category,
    metadata: { attributes },
    isInformational: () => category === "informational",
    isSuccess: () => category === "success",
    isRedirect: () => category === "redirection",
    isClientError: () => category === "client-error",
    isServerError: () => category === "server-error"
  };
};
var createResponseStatusFromHttpStatus = (status) => createResponseStatus(status.code, status.phrase, status.metadata.attributes);
var DefaultResponseStatusRegistry = class {
  values = /* @__PURE__ */ new Map();
  constructor(statuses = []) {
    statuses.forEach((status) => this.register(status));
  }
  register(status) {
    this.values.set(status.code, status);
  }
  lookup(code) {
    return this.values.get(code);
  }
  entries() {
    return Array.from(this.values.values());
  }
};

// src/headers.ts
var normalizeResponseHeaderName = (name) => name.trim().toLowerCase();
var DefaultResponseHeaders = class {
  constructor(headers = [], metadata = { attributes: {} }, now = /* @__PURE__ */ new Date()) {
    this.metadata = metadata;
    this.lifecycle = {
      state: "active",
      transitions: ["created", "active"],
      createdAt: now,
      updatedAt: now
    };
    headers.forEach((header) => this.values.set(normalizeResponseHeaderName(header.name), header));
  }
  metadata;
  values = /* @__PURE__ */ new Map();
  lifecycle;
  has(name) {
    return this.values.has(normalizeResponseHeaderName(name));
  }
  get(name) {
    return this.values.get(normalizeResponseHeaderName(name))?.values[0];
  }
  set(name, value) {
    this.values.set(normalizeResponseHeaderName(name), { name, values: [value], attributes: {} });
    return this;
  }
  append(name, value) {
    const key = normalizeResponseHeaderName(name);
    const current = this.values.get(key);
    this.values.set(key, {
      name,
      values: [...current?.values ?? [], value],
      attributes: current?.attributes ?? {}
    });
    return this;
  }
  remove(name) {
    this.values.delete(normalizeResponseHeaderName(name));
    return this;
  }
  clear() {
    this.values.clear();
    return this;
  }
  entries() {
    return Array.from(this.values.values());
  }
};

// src/cookies.ts
var DefaultResponseCookies = class {
  constructor(cookies = [], metadata = {}, now = /* @__PURE__ */ new Date()) {
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
  add(cookie) {
    this.cookies.set(cookie.name, cookie);
    return this;
  }
  remove(name) {
    this.cookies.delete(name);
    return this;
  }
  clear() {
    this.cookies.clear();
    return this;
  }
  has(name) {
    return this.cookies.has(name);
  }
  get(name) {
    return this.cookies.get(name);
  }
  values() {
    return Array.from(this.cookies.values());
  }
};

// src/cache.ts
var createResponseCache = (policy, directives = [], metadata = { attributes: {} }, now = /* @__PURE__ */ new Date()) => ({
  policy,
  directives,
  metadata,
  lifecycle: {
    state: "active",
    transitions: ["created", "active"],
    createdAt: now,
    updatedAt: now
  }
});

// src/attachment.ts
var createResponseAttachment = (reference, disposition, metadata, now = /* @__PURE__ */ new Date()) => ({
  reference,
  disposition,
  metadata,
  lifecycle: {
    state: "active",
    transitions: ["created", "active"],
    createdAt: now,
    updatedAt: now
  }
});

// src/http-response.ts
var createHttpResponseIdentity = (id, status) => ({
  id,
  statusCode: status.code
});
var createHttpResponse = (identity, composition, metadata, lifecycle) => ({
  identity,
  status: composition.status,
  headers: composition.headers,
  body: composition.body,
  protocol: composition.protocol,
  metadata,
  lifecycle
});

// src/context.ts
var createResponseContext = (response, status, headers, body, cookies, cache, attachment, metadata, lifecycle, state, storage = new InMemoryResponseRegistry()) => ({
  response,
  status,
  headers,
  body,
  cookies,
  cache,
  attachment,
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
var createResponseCore = (context, lifecycle, metadata, registry = new InMemoryResponseRegistry()) => ({
  context,
  lifecycle,
  metadata,
  registry
});
var defaultProtocol = () => {
  const protocol = new atlasHttp.DefaultHttpProtocolRegistry().lookup("HTTP/1.1");
  if (protocol === void 0) {
    throw new Error("HTTP/1.1 protocol must be registered.");
  }
  return protocol;
};
var DefaultResponseBuilder = class {
  constructor(metadata = new DefaultResponseMetadata(), lifecycle = new DefaultResponseLifecycle(metadata)) {
    this.metadata = metadata;
    this.lifecycle = lifecycle;
  }
  metadata;
  lifecycle;
  statusValue = atlasHttp.createHttpStatus(200, "OK");
  headersValue = new atlasHttp.DefaultHttpHeaders();
  responseHeadersValue = new DefaultResponseHeaders();
  bodyValue = createEmptyResponseBody();
  protocolValue = defaultProtocol();
  cookiesValue = new DefaultResponseCookies();
  cacheValue = createResponseCache("no-cache");
  attachmentValue;
  status(code) {
    this.statusValue = atlasHttp.createHttpStatus(code, String(code));
    return this;
  }
  header(name, value) {
    this.headersValue.set({ name, value, attributes: {} });
    this.responseHeadersValue.set(name, value);
    return this;
  }
  cookie(cookie) {
    this.cookiesValue.add(cookie);
    return this;
  }
  cache(policy) {
    this.cacheValue = policy;
    return this;
  }
  body(body) {
    this.bodyValue = body;
    return this;
  }
  attachment(attachment) {
    this.attachmentValue = attachment;
    return this;
  }
  ok() {
    this.statusValue = atlasHttp.createHttpStatus(200, "OK");
    return this;
  }
  created() {
    this.statusValue = atlasHttp.createHttpStatus(201, "Created");
    return this;
  }
  accepted() {
    this.statusValue = atlasHttp.createHttpStatus(202, "Accepted");
    return this;
  }
  noContent() {
    this.statusValue = atlasHttp.createHttpStatus(204, "No Content");
    return this;
  }
  badRequest() {
    this.statusValue = atlasHttp.createHttpStatus(400, "Bad Request");
    return this;
  }
  unauthorized() {
    this.statusValue = atlasHttp.createHttpStatus(401, "Unauthorized");
    return this;
  }
  forbidden() {
    this.statusValue = atlasHttp.createHttpStatus(403, "Forbidden");
    return this;
  }
  notFound() {
    this.statusValue = atlasHttp.createHttpStatus(404, "Not Found");
    return this;
  }
  conflict() {
    this.statusValue = atlasHttp.createHttpStatus(409, "Conflict");
    return this;
  }
  unprocessable() {
    this.statusValue = atlasHttp.createHttpStatus(422, "Unprocessable Content");
    return this;
  }
  internalServerError() {
    this.statusValue = atlasHttp.createHttpStatus(500, "Internal Server Error");
    return this;
  }
  serviceUnavailable() {
    this.statusValue = atlasHttp.createHttpStatus(503, "Service Unavailable");
    return this;
  }
  badGateway() {
    this.statusValue = atlasHttp.createHttpStatus(502, "Bad Gateway");
    return this;
  }
  json(value) {
    this.bodyValue = new DefaultResponseBody("json", {
      value,
      contentType: "application/json",
      contentLength: 0
    });
    return this;
  }
  text(value) {
    this.bodyValue = new DefaultResponseBody("plain-text", {
      value,
      contentType: "text/plain",
      contentLength: value.length
    });
    return this;
  }
  html(value) {
    this.bodyValue = new DefaultResponseBody("html", {
      value,
      contentType: "text/html",
      contentLength: value.length
    });
    return this;
  }
  xml(value) {
    this.bodyValue = new DefaultResponseBody("xml", {
      value,
      contentType: "application/xml",
      contentLength: value.length
    });
    return this;
  }
  build() {
    return this.composeResponse();
  }
  buildResult() {
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
        serviceKeys: ["response", "status", "headers", "body", "cookies", "cache", "attachment"]
      }
    );
    return {
      response,
      context: {
        metadata: this.metadata,
        lifecycle: this.lifecycle,
        responseContext
      }
    };
  }
  composeResponse() {
    this.lifecycle.transition("ready");
    return createHttpResponse(
      createHttpResponseIdentity("response", this.statusValue),
      {
        status: this.statusValue,
        headers: this.headersValue,
        body: this.bodyValue,
        protocol: this.protocolValue
      },
      this.metadata,
      this.lifecycle
    );
  }
};
var createResponseBuilderFactory = () => ({
  create: () => new DefaultResponseBuilder()
});

// src/provider.ts
var createResponseProviderRegistry = () => new InMemoryResponseRegistry();
var createResponseProviderMetadata = (metadata, id, name, version, attributes = {}) => Object.assign(metadata, {
  id,
  name,
  version,
  attributes
});
var createResponseProvider = (metadata, lifecycle, capabilities, send = async () => {
}) => ({
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
  },
  send
});

exports.DefaultResponseBody = DefaultResponseBody;
exports.DefaultResponseBuilder = DefaultResponseBuilder;
exports.DefaultResponseCookies = DefaultResponseCookies;
exports.DefaultResponseHeaders = DefaultResponseHeaders;
exports.DefaultResponseLifecycle = DefaultResponseLifecycle;
exports.DefaultResponseMetadata = DefaultResponseMetadata;
exports.DefaultResponseStatusRegistry = DefaultResponseStatusRegistry;
exports.InMemoryResponseRegistry = InMemoryResponseRegistry;
exports.createEmptyResponseBody = createEmptyResponseBody;
exports.createHttpResponse = createHttpResponse;
exports.createHttpResponseIdentity = createHttpResponseIdentity;
exports.createResponseAttachment = createResponseAttachment;
exports.createResponseBuilderFactory = createResponseBuilderFactory;
exports.createResponseCache = createResponseCache;
exports.createResponseContext = createResponseContext;
exports.createResponseCore = createResponseCore;
exports.createResponseProvider = createResponseProvider;
exports.createResponseProviderMetadata = createResponseProviderMetadata;
exports.createResponseProviderRegistry = createResponseProviderRegistry;
exports.createResponseStatus = createResponseStatus;
exports.createResponseStatusFromHttpStatus = createResponseStatusFromHttpStatus;
exports.getResponseStatusCategory = getResponseStatusCategory;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map