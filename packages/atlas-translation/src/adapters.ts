import type { ID, JsonObject, Timestamp } from '@atlas/atlas-types';

export interface AdapterDescriptor {
  readonly id: string;
  readonly kind: string;
  readonly metadata: JsonObject;
}

export interface AdapterProgress {
  readonly total: number;
  readonly completed: number;
  readonly failed: number;
}

export interface AdapterStatistics {
  readonly totalOperations: number;
  readonly failedOperations: number;
  readonly averageDurationMs: number;
}

export interface AdapterEvent {
  readonly type: string;
  readonly targetId: string;
  readonly metadata: JsonObject;
  readonly occurredAt: Timestamp;
}

export type EditorSession = AdapterDescriptor;
export type EditorDocument = AdapterDescriptor;
export type EditorViewport = AdapterDescriptor;
export type EditorSelection = AdapterDescriptor;
export type EditorTool = AdapterDescriptor;
export type EditorCommand = AdapterDescriptor;
export type CommandExecutor = AdapterDescriptor;
export type CommandHistory = AdapterDescriptor;
export type UndoRedoManager = AdapterDescriptor;
export type EditorEvent = AdapterEvent;

export interface Transform2D {
  readonly x: number;
  readonly y: number;
  readonly scaleX: number;
  readonly scaleY: number;
  readonly rotation: number;
}

export interface EditorObject extends AdapterDescriptor {
  readonly transform: Transform2D;
}

export type Layer = EditorObject;
export type SceneGraph = AdapterDescriptor;
export type ImageObject = EditorObject;
export type TextObject = EditorObject;
export type BubbleObject = EditorObject;
export type GroupObject = EditorObject;
export type ShapeObject = EditorObject;
export type ObjectHierarchy = AdapterDescriptor;

export type Renderer = AdapterDescriptor;
export type RenderPipeline = AdapterDescriptor;
export type DrawCommand = AdapterDescriptor;
export type RenderBackend = AdapterDescriptor;
export type RenderPass = AdapterDescriptor;
export type RenderCache = AdapterDescriptor;
export type DirtyRegion = AdapterDescriptor;
export type HitTestEngine = AdapterDescriptor;
export type RenderStatistics = AdapterStatistics;
export type RenderEvent = AdapterEvent;

export type InputEvent = AdapterEvent;
export type InputManager = AdapterDescriptor;
export type InputAdapter = AdapterDescriptor;
export type FocusManager = AdapterDescriptor;
export type ShortcutManager = AdapterDescriptor;
export type GestureManager = AdapterDescriptor;
export type InputContext = AdapterDescriptor;
export type InputRecorder = AdapterDescriptor;
export type InputPlayback = AdapterDescriptor;

export type Plugin = AdapterDescriptor;
export type PluginManager = AdapterDescriptor;
export type ExtensionPoint = AdapterDescriptor;
export type ExtensionRegistry = AdapterDescriptor;
export type PluginContext = AdapterDescriptor;
export type PluginSettings = AdapterDescriptor;
export type PluginPermissions = AdapterDescriptor;
export type PluginLoader = AdapterDescriptor;
export type PluginSandbox = AdapterDescriptor;
export type PluginEvent = AdapterEvent;

export interface IntegrationSession extends AdapterDescriptor {
  readonly createdAt: Timestamp;
}

export type ExportProvider = AdapterDescriptor;
export type ExportManager = AdapterDescriptor;
export type ExportPipeline = AdapterDescriptor;
export type ExportOptions = AdapterDescriptor;
export type ExportProgress = AdapterProgress;
export type BatchExport = AdapterDescriptor;
export type ExportCache = AdapterDescriptor;
export type ExportStatistics = AdapterStatistics;
export type ExportSession = IntegrationSession;
export type ExportEvent = AdapterEvent;

export type ImportProvider = AdapterDescriptor;
export type ImportManager = AdapterDescriptor;
export type ImportPipeline = AdapterDescriptor;
export type ImportOptions = AdapterDescriptor;
export type ImportProgress = AdapterProgress;
export type BatchImport = AdapterDescriptor;
export type ImportConflictResolver = AdapterDescriptor;
export type ImportStatistics = AdapterStatistics;
export type ImportSession = IntegrationSession;
export type ImportEvent = AdapterEvent;

export type AssetProvider = AdapterDescriptor;
export type AssetManager = AdapterDescriptor;
export type AssetPipeline = AdapterDescriptor;
export type AssetOptions = AdapterDescriptor;
export type AssetProgress = AdapterProgress;
export type BatchAsset = AdapterDescriptor;
export type AssetCache = AdapterDescriptor;
export type AssetStatistics = AdapterStatistics;
export type AssetSession = IntegrationSession;
export type AssetEvent = AdapterEvent;

export type HistoryProvider = AdapterDescriptor;
export type HistoryManager = AdapterDescriptor;
export type HistoryPipeline = AdapterDescriptor;
export type HistoryOptions = AdapterDescriptor;
export type HistoryProgress = AdapterProgress;
export type BatchHistory = AdapterDescriptor;
export type HistorySnapshot = AdapterDescriptor;
export type HistoryStatistics = AdapterStatistics;
export type HistorySession = IntegrationSession;
export type HistoryEvent = AdapterEvent;

export type CollaborationProvider = AdapterDescriptor;
export type CollaborationManager = AdapterDescriptor;
export type CollaborationPipeline = AdapterDescriptor;
export type CollaborationOptions = AdapterDescriptor;
export type CollaborationProgress = AdapterProgress;
export type BatchCollaboration = AdapterDescriptor;
export type CollaborationPresence = AdapterDescriptor;
export type CollaborationSession = IntegrationSession;
export type CollaborationStatistics = AdapterStatistics;
export type CollaborationEvent = AdapterEvent;

export type CloudProvider = AdapterDescriptor;
export type CloudManager = AdapterDescriptor;
export type CloudPipeline = AdapterDescriptor;
export type CloudOptions = AdapterDescriptor;
export type CloudProgress = AdapterProgress;
export type CloudSync = AdapterDescriptor;
export type CloudSession = IntegrationSession;
export type CloudStatistics = AdapterStatistics;
export type CloudBackup = AdapterDescriptor;
export type CloudEvent = AdapterEvent;

export type AIProvider = AdapterDescriptor;
export type AIManager = AdapterDescriptor;
export type AIPipeline = AdapterDescriptor;
export type AIOptions = AdapterDescriptor;
export type AIProgress = AdapterProgress;
export type AIModelRegistry = AdapterDescriptor;
export type AIPromptEngine = AdapterDescriptor;
export type AIInferenceSession = IntegrationSession;
export type AIStatistics = AdapterStatistics;
export type AIContextManager = AdapterDescriptor;
export type AIEmbeddingService = AdapterDescriptor;
export type AITokenizer = AdapterDescriptor;
export type AIToolCalling = AdapterDescriptor;
export type AISafetyPipeline = AdapterDescriptor;
export type AIConversationMemory = AdapterDescriptor;
export type AIRetrievalEngine = AdapterDescriptor;
export type AIVectorStore = AdapterDescriptor;
export type AIReasoningSession = IntegrationSession;
export type AIAgent = AdapterDescriptor;
export type AIEvent = AdapterEvent;

export interface AdapterRegistry<TAdapter extends AdapterDescriptor = AdapterDescriptor> {
  register(adapter: TAdapter): void;
  list(): readonly TAdapter[];
}

export class DefaultAdapterRegistry<TAdapter extends AdapterDescriptor = AdapterDescriptor> implements AdapterRegistry<TAdapter> {
  private readonly adapters = new Map<string, TAdapter>();

  public register(adapter: TAdapter): void {
    this.adapters.set(adapter.id, adapter);
  }

  public list(): readonly TAdapter[] {
    return [...this.adapters.values()];
  }
}

export function createAdapterId(scope: string, name: string): ID<'translation-adapter'> {
  return `${scope}:${name}` as ID<'translation-adapter'>;
}
