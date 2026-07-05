// Atlas Module System - Provider-independent module contracts.

// ── TASK-002 Module Types ──

export type ModuleId = string;

export type ModuleStatus =
  | 'created'
  | 'registered'
  | 'loaded'
  | 'initialized'
  | 'active'
  | 'suspended'
  | 'disposed'
  | 'failed';

export type ModuleCapability =
  | 'core'
  | 'infrastructure'
  | 'application'
  | 'runtime'
  | 'plugin'
  | 'custom';

export type ModuleCompatibility =
  | 'compatible'
  | 'incompatible'
  | 'unknown';

export interface ModuleVersionDescriptor {
  readonly major: number;
  readonly minor: number;
  readonly patch: number;
  readonly prerelease: string | undefined;
}

export type ModuleDependencyKind = 'required' | 'optional' | 'peer';

export type ModuleLifecycleHookEvent =
  | 'on-register'
  | 'on-load'
  | 'on-initialize'
  | 'on-activate'
  | 'on-suspend'
  | 'on-dispose';

export interface ModuleLoadOptions {
  readonly strict: boolean;
  readonly includeOptional: boolean;
  readonly diagnostics: boolean;
}

export interface ModuleLoadResult {
  readonly loaded: readonly ModuleId[];
  readonly skipped: readonly ModuleId[];
  readonly diagnostics: readonly ModuleDiagnostic[];
}

export interface ModuleDiagnostic {
  readonly code: string;
  readonly message: string;
  readonly moduleId: ModuleId | undefined;
  readonly severity: 'info' | 'warning' | 'error';
}

// ── TASK-006 Module Dependency ──

export interface ModuleDependency {
  readonly moduleId: ModuleId;
  readonly kind: ModuleDependencyKind;
  readonly version: ModuleVersionDescriptor | undefined;
  readonly optional: boolean;
}

export const createModuleDependency = (
  moduleId: ModuleId,
  kind: ModuleDependencyKind = 'required',
  version: ModuleVersionDescriptor | undefined = undefined,
  optional = false,
): ModuleDependency => ({ moduleId, kind, version, optional });

export const normalizeModuleDependency = (
  input: ModuleDependency | ModuleId,
): ModuleDependency => {
  if (typeof input === 'string') {
    return createModuleDependency(input);
  }
  return {
    moduleId: input.moduleId,
    kind: input.kind,
    version: input.version,
    optional: input.optional,
  };
};

// ── TASK-003 Module Manifest ──

export interface ModuleManifest {
  readonly id: ModuleId;
  readonly name: string;
  readonly version: ModuleVersionDescriptor;
  readonly description: string | undefined;
  readonly capabilities: readonly ModuleCapability[];
  readonly dependencies: readonly ModuleDependency[];
  readonly compatibility: ModuleCompatibility;
}

export interface ModuleManifestValidation {
  readonly valid: boolean;
  readonly manifest: ModuleManifest | undefined;
  readonly diagnostics: readonly ModuleDiagnostic[];
}

export const parseModuleVersion = (version: string): ModuleVersionDescriptor => {
  const match = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([\w.]+))?$/.exec(version);
  if (!match) {
    throw new Error(`Invalid module version: ${version}`);
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ?? undefined,
  };
};

export const moduleVersionToString = (version: ModuleVersionDescriptor): string => {
  const base = `${version.major}.${version.minor}.${version.patch}`;
  return version.prerelease ? `${base}-${version.prerelease}` : base;
};

export const createModuleManifest = (
  id: ModuleId,
  name: string,
  version: ModuleVersionDescriptor | string,
  description: string | undefined = undefined,
  capabilities: readonly ModuleCapability[] = [],
  dependencies: readonly (ModuleDependency | ModuleId)[] = [],
  compatibility: ModuleCompatibility = 'compatible',
): ModuleManifest => ({
  id,
  name,
  version: typeof version === 'string' ? parseModuleVersion(version) : version,
  description,
  capabilities,
  dependencies: dependencies.map(normalizeModuleDependency),
  compatibility,
});

export const validateModuleManifest = (manifest: ModuleManifest): ModuleManifestValidation => {
  const diagnostics: ModuleDiagnostic[] = [];
  if (!manifest.id) {
    diagnostics.push({ code: 'module.manifest.missing-id', message: 'Module manifest id is required.', moduleId: undefined, severity: 'error' });
  }
  if (!manifest.name) {
    diagnostics.push({ code: 'module.manifest.missing-name', message: 'Module manifest name is required.', moduleId: manifest.id, severity: 'error' });
  }
  if (manifest.dependencies.some((dep) => !dep.moduleId)) {
    diagnostics.push({ code: 'module.manifest.invalid-dependency', message: 'Module dependency has empty id.', moduleId: manifest.id, severity: 'error' });
  }
  return { valid: diagnostics.length === 0, manifest, diagnostics };
};

// ── TASK-005 Module Metadata ──

export interface ModuleMetadata {
  readonly id: ModuleId;
  readonly name: string;
  readonly version: ModuleVersionDescriptor;
  readonly labels: readonly string[];
  readonly tags: readonly string[];
  readonly source: string | undefined;
  readonly status: ModuleStatus;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createModuleMetadata = (
  manifest: ModuleManifest,
  options: {
    readonly labels?: readonly string[];
    readonly tags?: readonly string[];
    readonly source?: string;
    readonly status?: ModuleStatus;
    readonly attributes?: Readonly<Record<string, string>>;
  } = {},
): ModuleMetadata => ({
  id: manifest.id,
  name: manifest.name,
  version: manifest.version,
  labels: options.labels ?? [],
  tags: options.tags ?? [],
  source: options.source,
  status: options.status ?? 'created',
  attributes: options.attributes ?? {},
});

export const moduleIdentityEqual = (left: ModuleMetadata, right: ModuleMetadata): boolean =>
  left.id === right.id && moduleVersionToString(left.version) === moduleVersionToString(right.version);

// ── TASK-011 Module Lifecycle ──

export interface ModuleLifecycleHook {
  readonly event: ModuleLifecycleHookEvent;
  readonly handler: (context: ModuleContext) => void | Promise<void>;
}

export type ModuleLifecyclePhase = 'created' | 'registered' | 'loaded' | 'initialized' | 'active' | 'suspended' | 'disposed';

export interface ModuleLifecycle {
  readonly phase: ModuleLifecyclePhase;
  readonly history: readonly { readonly phase: ModuleLifecyclePhase; readonly at: Date }[];
  register(): void;
  load(): void;
  initialize(): void;
  activate(): void;
  suspend(): void;
  dispose(): void;
}

export class DefaultModuleLifecycle implements ModuleLifecycle {
  private phaseValue: ModuleLifecyclePhase = 'created';
  private readonly historyValue: { phase: ModuleLifecyclePhase; at: Date }[] = [];

  public get phase(): ModuleLifecyclePhase {
    return this.phaseValue;
  }

  public get history(): readonly { readonly phase: ModuleLifecyclePhase; readonly at: Date }[] {
    return this.historyValue;
  }

  private transition(phase: ModuleLifecyclePhase): void {
    this.phaseValue = phase;
    this.historyValue.push({ phase, at: new Date() });
  }

  public register(): void {
    if (this.phaseValue !== 'created') throw new Error('Module can only be registered from created state.');
    this.transition('registered');
  }

  public load(): void {
    if (this.phaseValue !== 'registered') throw new Error('Module can only be loaded from registered state.');
    this.transition('loaded');
  }

  public initialize(): void {
    if (this.phaseValue !== 'loaded') throw new Error('Module can only be initialized from loaded state.');
    this.transition('initialized');
  }

  public activate(): void {
    if (this.phaseValue !== 'initialized') throw new Error('Module can only be activated from initialized state.');
    this.transition('active');
  }

  public suspend(): void {
    if (this.phaseValue !== 'active') throw new Error('Module can only be suspended from active state.');
    this.transition('suspended');
  }

  public dispose(): void {
    if (this.phaseValue === 'disposed') throw new Error('Module is already disposed.');
    this.transition('disposed');
  }
}

export const createModuleLifecycle = (): ModuleLifecycle => new DefaultModuleLifecycle();

// ── TASK-012 Module Context ──

export interface ModuleContext {
  readonly moduleId: ModuleId;
  readonly attributes: ReadonlyMap<string, unknown>;
  get<T>(key: string): T | undefined;
  set(key: string, value: unknown): void;
}

export class InMemoryModuleContext implements ModuleContext {
  private readonly values: Map<string, unknown>;

  public constructor(public readonly moduleId: ModuleId, entries: ReadonlyArray<readonly [string, unknown]> = []) {
    this.values = new Map(entries);
  }

  public get<T>(key: string): T | undefined {
    return this.values.get(key) as T | undefined;
  }

  public get attributes(): ReadonlyMap<string, unknown> {
    return this.values;
  }

  public set(key: string, value: unknown): void {
    this.values.set(key, value);
  }
}

export const createModuleContext = (
  moduleId: ModuleId,
  entries: ReadonlyArray<readonly [string, unknown]> = [],
): ModuleContext => new InMemoryModuleContext(moduleId, entries);

// ── TASK-004 Module Definition ──

export interface ModuleDefinitionSetup {
  readonly onRegister?: (context: ModuleContext) => void | Promise<void>;
  readonly onLoad?: (context: ModuleContext) => void | Promise<void>;
  readonly onInitialize?: (context: ModuleContext) => void | Promise<void>;
  readonly onActivate?: (context: ModuleContext) => void | Promise<void>;
  readonly onSuspend?: (context: ModuleContext) => void | Promise<void>;
  readonly onDispose?: (context: ModuleContext) => void | Promise<void>;
}

export interface ModuleDefinition {
  readonly manifest: ModuleManifest;
  readonly metadata: ModuleMetadata;
  readonly setup: ModuleDefinitionSetup;
  readonly hooks: readonly ModuleLifecycleHook[];
}

export const defineModule = (
  manifest: ModuleManifest,
  setup: ModuleDefinitionSetup = {},
  options: {
    readonly labels?: readonly string[];
    readonly tags?: readonly string[];
    readonly source?: string;
    readonly hooks?: readonly ModuleLifecycleHook[];
  } = {},
): ModuleDefinition => {
  const validation = validateModuleManifest(manifest);
  if (!validation.valid) {
    throw new Error(`Invalid module manifest: ${validation.diagnostics.map((d) => d.message).join('; ')}`);
  }
  return {
    manifest: { ...manifest },
    metadata: createModuleMetadata(manifest, { labels: options.labels, tags: options.tags, source: options.source }),
    setup,
    hooks: options.hooks ? [...options.hooks] : [],
  };
};

// ── TASK-007 Module Registry ──

export class ModuleRegistrationError extends Error {
  public constructor(message: string, public readonly moduleId: ModuleId) {
    super(message);
    this.name = 'ModuleRegistrationError';
  }
}

export interface ModuleRegistryEntry {
  readonly definition: ModuleDefinition;
  readonly registeredAt: Date;
}

export interface ModuleRegistry {
  register(definition: ModuleDefinition): void;
  unregister(moduleId: ModuleId): void;
  has(moduleId: ModuleId): boolean;
  resolve(moduleId: ModuleId): ModuleRegistryEntry | undefined;
  entries(): readonly ModuleRegistryEntry[];
  size(): number;
}

export class InMemoryModuleRegistry implements ModuleRegistry {
  private readonly store = new Map<ModuleId, ModuleRegistryEntry>();

  public register(definition: ModuleDefinition): void {
    const id = definition.manifest.id;
    if (this.store.has(id)) {
      throw new ModuleRegistrationError(`Module "${id}" is already registered.`, id);
    }
    this.store.set(id, { definition, registeredAt: new Date() });
  }

  public unregister(moduleId: ModuleId): void {
    this.store.delete(moduleId);
  }

  public has(moduleId: ModuleId): boolean {
    return this.store.has(moduleId);
  }

  public resolve(moduleId: ModuleId): ModuleRegistryEntry | undefined {
    return this.store.get(moduleId);
  }

  public entries(): readonly ModuleRegistryEntry[] {
    return Array.from(this.store.values());
  }

  public size(): number {
    return this.store.size;
  }
}

export const createModuleRegistry = (): ModuleRegistry => new InMemoryModuleRegistry();

// ── TASK-009 Module Graph ──

export interface ModuleGraphNode {
  readonly moduleId: ModuleId;
  readonly dependencies: readonly ModuleId[];
  readonly dependents: readonly ModuleId[];
}

export interface ModuleGraph {
  readonly nodes: readonly ModuleGraphNode[];
  addNode(moduleId: ModuleId): void;
  addEdge(from: ModuleId, to: ModuleId): void;
  getNode(moduleId: ModuleId): ModuleGraphNode | undefined;
  topologicalSort(): readonly ModuleId[];
}

export class InMemoryModuleGraph implements ModuleGraph {
  private readonly nodeMap = new Map<ModuleId, { deps: Set<ModuleId>; dependents: Set<ModuleId> }>();

  public get nodes(): readonly ModuleGraphNode[] {
    return Array.from(this.nodeMap.entries()).map(([moduleId, data]) => ({
      moduleId,
      dependencies: Array.from(data.deps),
      dependents: Array.from(data.dependents),
    }));
  }

  public addNode(moduleId: ModuleId): void {
    if (!this.nodeMap.has(moduleId)) {
      this.nodeMap.set(moduleId, { deps: new Set(), dependents: new Set() });
    }
  }

  public addEdge(from: ModuleId, to: ModuleId): void {
    this.addNode(from);
    this.addNode(to);
    this.nodeMap.get(from)!.deps.add(to);
    this.nodeMap.get(to)!.dependents.add(from);
  }

  public getNode(moduleId: ModuleId): ModuleGraphNode | undefined {
    const data = this.nodeMap.get(moduleId);
    if (!data) return undefined;
    return { moduleId, dependencies: Array.from(data.deps), dependents: Array.from(data.dependents) };
  }

  public topologicalSort(): readonly ModuleId[] {
    const result: ModuleId[] = [];
    const visited = new Set<ModuleId>();
    const visiting = new Set<ModuleId>();
    const visit = (id: ModuleId): void => {
      if (visited.has(id)) return;
      if (visiting.has(id)) return;
      visiting.add(id);
      const data = this.nodeMap.get(id);
      if (data) {
        for (const dep of data.deps) visit(dep);
      }
      visiting.delete(id);
      visited.add(id);
      result.push(id);
    };
    for (const id of this.nodeMap.keys()) visit(id);
    return result;
  }
}

export const createModuleGraph = (): ModuleGraph => new InMemoryModuleGraph();

// ── TASK-010 Module Cycle Detection ──

export interface ModuleCycleDetectionResult {
  readonly hasCycle: boolean;
  readonly cycles: readonly ModuleId[][];
}

export const detectModuleCycles = (graph: ModuleGraph): ModuleCycleDetectionResult => {
  const adjacency = new Map<ModuleId, readonly ModuleId[]>();
  for (const node of graph.nodes) {
    adjacency.set(node.moduleId, node.dependencies);
  }
  const cycles: ModuleId[][] = [];
  const visited = new Set<ModuleId>();
  const stack: ModuleId[] = [];
  const dfs = (id: ModuleId): void => {
    if (stack.includes(id)) {
      const cycleStart = stack.indexOf(id);
      cycles.push([...stack.slice(cycleStart), id]);
      return;
    }
    if (visited.has(id)) return;
    visited.add(id);
    stack.push(id);
    const deps = adjacency.get(id) ?? [];
    for (const dep of deps) dfs(dep);
    stack.pop();
  };
  for (const id of adjacency.keys()) dfs(id);
  return { hasCycle: cycles.length > 0, cycles };
};

// ── TASK-008 Module Loader ──

export const loadModules = (
  definitions: readonly ModuleDefinition[],
  options: ModuleLoadOptions = { strict: true, includeOptional: true, diagnostics: false },
): ModuleLoadResult => {
  const loaded: ModuleId[] = [];
  const skipped: ModuleId[] = [];
  const diagnostics: ModuleDiagnostic[] = [];
  const seen = new Set<ModuleId>();
  const byId = new Map(definitions.map((d) => [d.manifest.id, d] as const));
  const visit = (def: ModuleDefinition): void => {
    const id = def.manifest.id;
    if (seen.has(id)) return;
    seen.add(id);
    for (const dep of def.manifest.dependencies) {
      if (!options.includeOptional && dep.optional) {
        skipped.push(dep.moduleId);
        continue;
      }
      const depDef = byId.get(dep.moduleId);
      if (!depDef) {
        diagnostics.push({ code: 'module.load.missing-dependency', message: `Missing dependency "${dep.moduleId}" for module "${id}".`, moduleId: id, severity: 'error' });
        if (options.strict) return;
        continue;
      }
      visit(depDef);
    }
    loaded.push(id);
  };
  for (const def of definitions) visit(def);
  return { loaded, skipped, diagnostics };
};

// ── TASK-013 Config Integration ──

export interface ModuleConfigBinding {
  readonly moduleId: ModuleId;
  readonly configKey: string;
  readonly required: boolean;
}

export const createModuleConfigBinding = (
  moduleId: ModuleId,
  configKey: string,
  required = true,
): ModuleConfigBinding => ({ moduleId, configKey, required });

// ── TASK-014 Container Integration ──

export interface ModuleContainerBinding {
  readonly moduleId: ModuleId;
  readonly serviceId: string;
  readonly scope: 'singleton' | 'transient' | 'scoped';
}

export const createModuleContainerBinding = (
  moduleId: ModuleId,
  serviceId: string,
  scope: ModuleContainerBinding['scope'] = 'singleton',
): ModuleContainerBinding => ({ moduleId, serviceId, scope });

// ── TASK-015 Runtime Integration ──

export interface ModuleRuntimeBinding {
  readonly moduleId: ModuleId;
  readonly runtimeId: string;
  readonly autoStart: boolean;
}

export const createModuleRuntimeBinding = (
  moduleId: ModuleId,
  runtimeId: string,
  autoStart = false,
): ModuleRuntimeBinding => ({ moduleId, runtimeId, autoStart });

// ── TASK-016 Plugin Bridge ──

export interface ModulePluginBridge {
  readonly moduleId: ModuleId;
  readonly pluginId: string;
  readonly enabled: boolean;
}

export const createModulePluginBridge = (
  moduleId: ModuleId,
  pluginId: string,
  enabled = true,
): ModulePluginBridge => ({ moduleId, pluginId, enabled });

// ── TASK-017 Diagnostics ──

export const createModuleDiagnostic = (
  code: string,
  message: string,
  moduleId: ModuleId | undefined = undefined,
  severity: ModuleDiagnostic['severity'] = 'info',
): ModuleDiagnostic => ({ code, message, moduleId, severity });
