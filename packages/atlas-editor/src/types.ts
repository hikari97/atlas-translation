import type { AtlasDocument } from '@atlas/atlas-document';
import type { HistoryManager } from '@atlas/atlas-history';
import type { InputManager } from '@atlas/atlas-input';
import type { DefaultPluginManager } from '@atlas/atlas-plugin';
import type { RendererRuntime } from '@atlas/atlas-renderer';
import type { SelectionManager } from '@atlas/atlas-selection';
import type { EditorModeState, EditorTool, ID, JsonObject, Nullable } from '@atlas/atlas-types';

export enum EditorLifecycleStage {
  Created = 'created',
  Initialized = 'initialized',
  Running = 'running',
  Suspended = 'suspended',
  Disposed = 'disposed'
}

export enum EditorRuntimeStatus {
  Idle = 'idle',
  Ready = 'ready',
  Running = 'running',
  Suspended = 'suspended',
  Disposed = 'disposed'
}

export interface EditorMetadata {
  readonly id: ID<'editor'>;
  readonly name: string;
  readonly version: string;
  readonly createdAt: string;
  readonly metadata: JsonObject;
}

export interface EditorOptions {
  readonly id: ID<'editor'>;
  readonly name?: string | undefined;
  readonly version?: string | undefined;
  readonly metadata?: JsonObject | undefined;
  readonly services?: Partial<EditorServices> | undefined;
}

export interface EditorServices {
  readonly history: HistoryManager;
  readonly input: InputManager;
  readonly plugins: DefaultPluginManager;
  readonly renderer: RendererRuntime;
  readonly selection: SelectionManager;
}

export interface EditorRuntimeState {
  readonly status: EditorRuntimeStatus;
  readonly lifecycle: EditorLifecycleStage;
  readonly activeWorkspaceId: Nullable<ID<'workspace'>>;
  readonly activeDocumentId: Nullable<ID<'document'>>;
  readonly activeTool: Nullable<EditorTool>;
  readonly mode: Nullable<EditorModeState>;
  readonly activeSessionId: Nullable<ID<'editor-session'>>;
  readonly revision: number;
}

export interface EditorSnapshot {
  readonly metadata: EditorMetadata;
  readonly state: EditorRuntimeState;
  readonly workspaceIds: readonly ID<'workspace'>[];
  readonly documentIds: readonly ID<'document'>[];
  readonly toolIds: readonly ID<'editor-tool'>[];
  readonly modeIds: readonly string[];
  readonly sessionIds: readonly ID<'editor-session'>[];
}

export interface WorkspaceRecord {
  readonly id: ID<'workspace'>;
  readonly name: string;
  readonly metadata: JsonObject;
}

export interface DocumentRecord {
  readonly id: ID<'document'>;
  readonly document: AtlasDocument;
  readonly workspaceId: Nullable<ID<'workspace'>>;
  readonly metadata: JsonObject;
}

export interface EditorSessionRecord {
  readonly id: ID<'editor-session'>;
  readonly name: string;
  readonly state: EditorRuntimeState;
  readonly metadata: JsonObject;
}

export interface EditorCommandResult {
  readonly commandId: string;
  readonly accepted: boolean;
  readonly previous: EditorRuntimeState;
  readonly next: EditorRuntimeState;
}

export interface EditorDiagnostics {
  readonly status: EditorRuntimeStatus;
  readonly issues: readonly string[];
  readonly revision: number;
  readonly checkedAt: string;
}
