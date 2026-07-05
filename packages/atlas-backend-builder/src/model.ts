// Atlas Backend Builder System - Provider-independent backend composition contracts.

export type BackendBuilderDiagnosticSeverity = 'info' | 'warning' | 'error';
export type BackendCapabilityType = 'runtime' | 'config' | 'container' | 'module' | 'database' | 'cache' | 'queue' | 'worker' | 'scheduler' | 'mail' | 'search' | 'notification' | 'storage' | 'custom';
export type BackendCompositionStrategy = 'replace' | 'merge' | 'append' | 'conditional';

export interface BackendBuilderDiagnostic { readonly code: string; readonly message: string; readonly severity: BackendBuilderDiagnosticSeverity; }

export interface BackendCapability { readonly id: string; readonly type: BackendCapabilityType; readonly enabled: boolean; readonly configKey: string | undefined; }
export const createBackendCapability = (id: string, type: BackendCapabilityType, options: { enabled?: boolean; configKey?: string } = {}): BackendCapability => ({ id, type, enabled: options.enabled ?? true, configKey: options.configKey });

export interface BackendManifest {
  readonly id: string;
  readonly version: string;
  readonly capabilities: readonly BackendCapability[];
  readonly compositionStrategy: BackendCompositionStrategy;
  readonly dependencies: readonly string[];
}
export const createBackendManifest = (id: string, version: string, capabilities: readonly BackendCapability[], options: { compositionStrategy?: BackendCompositionStrategy; dependencies?: readonly string[] } = {}): BackendManifest => ({ id, version, capabilities, compositionStrategy: options.compositionStrategy ?? 'replace', dependencies: options.dependencies ?? [] });

export interface BackendCapabilityRegistry { register(capability: BackendCapability): void; unregister(id: string): void; get(id: string): BackendCapability | undefined; list(): readonly BackendCapability[]; }
export class InMemoryBackendCapabilityRegistry implements BackendCapabilityRegistry {
  private readonly caps = new Map<string, BackendCapability>();
  public register(capability: BackendCapability): void { this.caps.set(capability.id, capability); }
  public unregister(id: string): void { this.caps.delete(id); }
  public get(id: string): BackendCapability | undefined { return this.caps.get(id); }
  public list(): readonly BackendCapability[] { return Array.from(this.caps.values()); }
}
export const createBackendCapabilityRegistry = (): BackendCapabilityRegistry => new InMemoryBackendCapabilityRegistry();

export interface BackendConfigComposition { readonly manifestId: string; readonly configKey: string; readonly merged: boolean; }
export const createBackendConfigComposition = (manifestId: string, configKey: string, merged = false): BackendConfigComposition => ({ manifestId, configKey, merged });

export interface BackendRuntimeComposition { readonly runtimeId: string; readonly autoStart: boolean; }
export const createBackendRuntimeComposition = (runtimeId: string, autoStart = false): BackendRuntimeComposition => ({ runtimeId, autoStart });

export interface BackendContainerComposition { readonly containerId: string; readonly singleton: boolean; }
export const createBackendContainerComposition = (containerId: string, singleton = true): BackendContainerComposition => ({ containerId, singleton });

export interface BackendModuleComposition { readonly moduleId: string; readonly autoLoad: boolean; }
export const createBackendModuleComposition = (moduleId: string, autoLoad = true): BackendModuleComposition => ({ moduleId, autoLoad });

export interface BackendDatabaseComposition { readonly configId: string; readonly autoConnect: boolean; }
export const createBackendDatabaseComposition = (configId: string, autoConnect = false): BackendDatabaseComposition => ({ configId, autoConnect });

export interface BackendCacheStorageComposition { readonly cacheKey: string; readonly storageKey: string | undefined; }
export const createBackendCacheStorageComposition = (cacheKey: string, storageKey: string | undefined = undefined): BackendCacheStorageComposition => ({ cacheKey, storageKey });

export interface BackendQueueWorkerComposition { readonly queueId: string; readonly workerId: string; }
export const createBackendQueueWorkerComposition = (queueId: string, workerId: string): BackendQueueWorkerComposition => ({ queueId, workerId });

export interface BackendSchedulerComposition { readonly scheduleId: string; readonly jobId: string; }
export const createBackendSchedulerComposition = (scheduleId: string, jobId: string): BackendSchedulerComposition => ({ scheduleId, jobId });

export interface BackendMailSearchNotificationComposition { readonly mailKey: string | undefined; readonly searchKey: string | undefined; readonly notificationKey: string | undefined; }
export const createBackendMailSearchNotificationComposition = (mailKey: string | undefined = undefined, searchKey: string | undefined = undefined, notificationKey: string | undefined = undefined): BackendMailSearchNotificationComposition => ({ mailKey, searchKey, notificationKey });

export interface BackendDiagnosticsComposition { readonly diagnosticsEnabled: boolean; readonly logLevel: 'debug' | 'info' | 'warn' | 'error'; }
export const createBackendDiagnosticsComposition = (diagnosticsEnabled = true, logLevel: 'debug' | 'info' | 'warn' | 'error' = 'info'): BackendDiagnosticsComposition => ({ diagnosticsEnabled, logLevel });

export interface BackendBuildPlan { readonly manifestId: string; readonly steps: readonly string[]; readonly status: 'pending' | 'building' | 'completed' | 'failed'; }
export const createBackendBuildPlan = (manifestId: string, steps: readonly string[] = [], status: 'pending' | 'building' | 'completed' | 'failed' = 'pending'): BackendBuildPlan => ({ manifestId, steps, status });

export interface BackendTestingHarness { readonly manifestId: string; readonly testMode: boolean; readonly mocks: Readonly<Record<string, unknown>>; }
export const createBackendTestingHarness = (manifestId: string, testMode = true, mocks: Readonly<Record<string, unknown>> = {}): BackendTestingHarness => ({ manifestId, testMode, mocks });

export interface AppsApiBoundary { readonly boundaryId: string; readonly exposedEndpoints: readonly string[]; }
export const createAppsApiBoundary = (boundaryId: string, exposedEndpoints: readonly string[] = []): AppsApiBoundary => ({ boundaryId, exposedEndpoints });

export const createBackendBuilderDiagnostic = (code: string, message: string, severity: BackendBuilderDiagnosticSeverity = 'info'): BackendBuilderDiagnostic => ({ code, message, severity });
