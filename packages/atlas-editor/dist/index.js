import { createHistoryEntry, HistoryManager } from '@atlas/atlas-history';
import { InputManager } from '@atlas/atlas-input';
import { DefaultPluginManager } from '@atlas/atlas-plugin';
import { RendererRuntime } from '@atlas/atlas-renderer';
import { SelectionManager } from '@atlas/atlas-selection';

// src/types.ts
var EditorLifecycleStage = /* @__PURE__ */ ((EditorLifecycleStage2) => {
  EditorLifecycleStage2["Created"] = "created";
  EditorLifecycleStage2["Initialized"] = "initialized";
  EditorLifecycleStage2["Running"] = "running";
  EditorLifecycleStage2["Suspended"] = "suspended";
  EditorLifecycleStage2["Disposed"] = "disposed";
  return EditorLifecycleStage2;
})(EditorLifecycleStage || {});
var EditorRuntimeStatus = /* @__PURE__ */ ((EditorRuntimeStatus2) => {
  EditorRuntimeStatus2["Idle"] = "idle";
  EditorRuntimeStatus2["Ready"] = "ready";
  EditorRuntimeStatus2["Running"] = "running";
  EditorRuntimeStatus2["Suspended"] = "suspended";
  EditorRuntimeStatus2["Disposed"] = "disposed";
  return EditorRuntimeStatus2;
})(EditorRuntimeStatus || {});

// src/state.ts
var DEFAULT_EDITOR_NAME = "Atlas Editor";
var DEFAULT_EDITOR_VERSION = "0.1.0";
function createEditorMetadata(options) {
  return {
    id: options.id,
    name: options.name ?? DEFAULT_EDITOR_NAME,
    version: options.version ?? DEFAULT_EDITOR_VERSION,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    metadata: options.metadata ?? {}
  };
}
function createEditorRuntimeState() {
  return {
    status: "idle" /* Idle */,
    lifecycle: "created" /* Created */,
    activeWorkspaceId: null,
    activeDocumentId: null,
    activeTool: null,
    mode: null,
    activeSessionId: null,
    revision: 0
  };
}
function reviseEditorState(state, patch) {
  return { ...state, ...patch, revision: state.revision + 1 };
}

// src/commands.ts
function createCommand(id, name, apply) {
  return { id, name, apply };
}
function createSetLifecycleCommand(status, lifecycle) {
  return createCommand(`editor.lifecycle.${lifecycle}`, `Set lifecycle ${lifecycle}`, (state) => reviseEditorState(state, { status, lifecycle }));
}
function createSetActiveWorkspaceCommand(workspaceId) {
  return createCommand("editor.workspace.activate", "Set active workspace", (state) => reviseEditorState(state, { activeWorkspaceId: workspaceId }));
}
function createSetActiveDocumentCommand(documentId) {
  return createCommand("editor.document.activate", "Set active document", (state) => reviseEditorState(state, { activeDocumentId: documentId }));
}
function createSetActiveToolCommand(tool) {
  return createCommand("editor.tool.activate", "Set active tool", (state) => reviseEditorState(state, { activeTool: tool }));
}
function createSetEditorModeCommand(mode) {
  return createCommand("editor.mode.activate", "Set editor mode", (state) => reviseEditorState(state, { mode }));
}
function createStartSessionCommand(sessionId) {
  return createCommand("editor.session.activate", "Set active session", (state) => reviseEditorState(state, { activeSessionId: sessionId }));
}

// src/registries.ts
var WorkspaceManager = class {
  workspaces = /* @__PURE__ */ new Map();
  register(workspace) {
    this.workspaces.set(workspace.id, workspace);
  }
  get(id) {
    return this.workspaces.get(id) ?? null;
  }
  list() {
    return [...this.workspaces.values()];
  }
};
var DocumentManager = class {
  documents = /* @__PURE__ */ new Map();
  register(id, document, workspaceId = null, metadata = {}) {
    this.documents.set(id, { id, document, workspaceId, metadata });
  }
  get(id) {
    return this.documents.get(id) ?? null;
  }
  list() {
    return [...this.documents.values()];
  }
};
var ToolManager = class {
  tools = /* @__PURE__ */ new Map();
  register(tool) {
    this.tools.set(tool.id, tool);
  }
  get(id) {
    return this.tools.get(id) ?? null;
  }
  list() {
    return [...this.tools.values()];
  }
};
var ModeManager = class {
  modes = /* @__PURE__ */ new Map();
  register(id, mode) {
    this.modes.set(id, mode);
  }
  get(id) {
    return this.modes.get(id) ?? null;
  }
  list() {
    return [...this.modes.values()];
  }
  ids() {
    return [...this.modes.keys()];
  }
};
var SessionManager = class {
  sessions = /* @__PURE__ */ new Map();
  create(id, name, state, metadata = {}) {
    const session = { id, name, state, metadata };
    this.sessions.set(id, session);
    return session;
  }
  get(id) {
    return this.sessions.get(id) ?? null;
  }
  restore(id) {
    return this.sessions.get(id)?.state ?? null;
  }
  list() {
    return [...this.sessions.values()];
  }
};
var IntegrationContext = class {
  constructor(services) {
    this.services = services;
  }
  services;
  inspect() {
    return ["history", "input", "plugins", "renderer", "selection", ...this.services.capabilities];
  }
};
var HistoryIntegration = class {
  constructor(manager) {
    this.manager = manager;
  }
  manager;
  recordState(id, label, state) {
    const entry = createHistoryEntry(id, label, state);
    this.manager.push(entry);
    return entry;
  }
};
var CommandIntegration = class {
  constructor(bus) {
    this.bus = bus;
  }
  bus;
  execute(command, context) {
    return this.bus.execute(command, context);
  }
};
var RendererIntegration = class {
  constructor(renderer) {
    this.renderer = renderer;
  }
  renderer;
  render(document) {
    return this.renderer.render(document);
  }
};
var InputIntegration = class {
  constructor(manager) {
    this.manager = manager;
  }
  manager;
  record(event) {
    this.manager.record(event);
  }
};
var SelectionIntegration = class {
  constructor(manager) {
    this.manager = manager;
  }
  manager;
};
var PluginIntegration = class {
  constructor(manager) {
    this.manager = manager;
  }
  manager;
  plugins = /* @__PURE__ */ new Map();
  register(plugin) {
    this.plugins.set(plugin.descriptor.id, plugin);
    this.manager.register(plugin);
  }
  list() {
    return [...this.plugins.values()];
  }
  runtime() {
    return this.manager;
  }
};

// src/Editor.ts
var Editor = class {
  state;
  metadata;
  services;
  workspaces = new WorkspaceManager();
  documents = new DocumentManager();
  tools = new ToolManager();
  modes = new ModeManager();
  sessions = new SessionManager();
  integration;
  constructor(options) {
    this.metadata = createEditorMetadata(options);
    this.state = createEditorRuntimeState();
    this.services = {
      history: options.services?.history ?? new HistoryManager(),
      input: options.services?.input ?? new InputManager(),
      plugins: options.services?.plugins ?? new DefaultPluginManager(),
      renderer: options.services?.renderer ?? new RendererRuntime(),
      selection: options.services?.selection ?? new SelectionManager()
    };
    this.integration = new IntegrationContext({ ...this.services, capabilities: [] });
  }
  get id() {
    return this.metadata.id;
  }
  current() {
    return this.state;
  }
  dispatch(command) {
    const previous = this.state;
    const next = command.apply(previous);
    this.state = next;
    return { commandId: command.id, accepted: previous !== next, previous, next };
  }
  initialize() {
    this.dispatch(createSetLifecycleCommand("ready" /* Ready */, "initialized" /* Initialized */));
    return Promise.resolve();
  }
  start() {
    this.dispatch(createSetLifecycleCommand("running" /* Running */, "running" /* Running */));
    return Promise.resolve();
  }
  suspend() {
    this.dispatch(createSetLifecycleCommand("suspended" /* Suspended */, "suspended" /* Suspended */));
    return Promise.resolve();
  }
  resume() {
    this.dispatch(createSetLifecycleCommand("running" /* Running */, "running" /* Running */));
    return Promise.resolve();
  }
  dispose() {
    this.dispatch(createSetLifecycleCommand("disposed" /* Disposed */, "disposed" /* Disposed */));
    return Promise.resolve();
  }
  snapshot() {
    return {
      metadata: this.metadata,
      state: this.state,
      workspaceIds: this.workspaces.list().map((workspace) => workspace.id),
      documentIds: this.documents.list().map((document) => document.id),
      toolIds: this.tools.list().map((tool) => tool.id),
      modeIds: this.modes.ids(),
      sessionIds: this.sessions.list().map((session) => session.id)
    };
  }
};
function createEditor(options) {
  return new Editor(options);
}

// src/EditorManager.ts
var EditorManager = class {
  editors = /* @__PURE__ */ new Map();
  register(editor) {
    this.editors.set(editor.id, editor);
  }
  get(id) {
    return this.editors.get(id) ?? null;
  }
  list() {
    return [...this.editors.values()];
  }
};

// src/performance.ts
var BudgetSeverity = /* @__PURE__ */ ((BudgetSeverity2) => {
  BudgetSeverity2["Warning"] = "warning";
  BudgetSeverity2["Critical"] = "critical";
  return BudgetSeverity2;
})(BudgetSeverity || {});
var RuntimeMetrics = class {
  metrics = /* @__PURE__ */ new Map();
  record(metric) {
    this.metrics.set(metric.token, metric);
  }
  snapshot() {
    return [...this.metrics.values()];
  }
};
var PerformanceBudget = class {
  rules = /* @__PURE__ */ new Map();
  lastViolations = [];
  register(rule) {
    this.rules.set(rule.id, rule);
  }
  unregister(id) {
    this.rules.delete(id);
  }
  validate(metrics) {
    const violations = metrics.flatMap((metric) => this.evaluateMetric(metric));
    this.lastViolations = violations;
    return { violations, checkedAt: (/* @__PURE__ */ new Date()).toISOString() };
  }
  violations() {
    return this.lastViolations;
  }
  evaluateMetric(metric) {
    return [...this.rules.values()].filter((rule) => rule.enabled && rule.metricToken === metric.token && metric.value > rule.threshold).map((rule) => ({
      ruleId: rule.id,
      metricToken: metric.token,
      value: metric.value,
      threshold: rule.threshold,
      severity: rule.severity
    }));
  }
};
function diagnoseEditor(state) {
  const issues = state.revision < 0 ? ["Editor revision is invalid."] : [];
  return { status: state.status, issues, revision: state.revision, checkedAt: (/* @__PURE__ */ new Date()).toISOString() };
}

export { BudgetSeverity, CommandIntegration, DocumentManager, Editor, EditorLifecycleStage, EditorManager, EditorRuntimeStatus, HistoryIntegration, InputIntegration, IntegrationContext, ModeManager, PerformanceBudget, PluginIntegration, RendererIntegration, RuntimeMetrics, SelectionIntegration, SessionManager, ToolManager, WorkspaceManager, createEditor, createEditorMetadata, createEditorRuntimeState, createSetActiveDocumentCommand, createSetActiveToolCommand, createSetActiveWorkspaceCommand, createSetEditorModeCommand, createSetLifecycleCommand, createStartSessionCommand, diagnoseEditor, reviseEditorState };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map