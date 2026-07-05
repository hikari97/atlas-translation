import { EditorLifecycleStage, EditorRuntimeStatus, type EditorMetadata, type EditorOptions, type EditorRuntimeState } from './types';

const DEFAULT_EDITOR_NAME = 'Atlas Editor';
const DEFAULT_EDITOR_VERSION = '0.1.0';

export function createEditorMetadata(options: EditorOptions): EditorMetadata {
  return {
    id: options.id,
    name: options.name ?? DEFAULT_EDITOR_NAME,
    version: options.version ?? DEFAULT_EDITOR_VERSION,
    createdAt: new Date().toISOString(),
    metadata: options.metadata ?? {}
  };
}

export function createEditorRuntimeState(): EditorRuntimeState {
  return {
    status: EditorRuntimeStatus.Idle,
    lifecycle: EditorLifecycleStage.Created,
    activeWorkspaceId: null,
    activeDocumentId: null,
    activeTool: null,
    mode: null,
    activeSessionId: null,
    revision: 0
  };
}

export function reviseEditorState(state: EditorRuntimeState, patch: Omit<Partial<EditorRuntimeState>, 'revision'>): EditorRuntimeState {
  return { ...state, ...patch, revision: state.revision + 1 };
}
