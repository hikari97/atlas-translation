import type { EditorModeState, EditorTool, ID, Nullable } from '@atlas/atlas-types';
import { EditorLifecycleStage, EditorRuntimeStatus, type EditorRuntimeState } from './types';
import { reviseEditorState } from './state';

export interface EditorCommand {
  readonly id: string;
  readonly name: string;
  apply(state: EditorRuntimeState): EditorRuntimeState;
}

function createCommand(id: string, name: string, apply: (state: EditorRuntimeState) => EditorRuntimeState): EditorCommand {
  return { id, name, apply };
}

export function createSetLifecycleCommand(status: EditorRuntimeStatus, lifecycle: EditorLifecycleStage): EditorCommand {
  return createCommand(`editor.lifecycle.${lifecycle}`, `Set lifecycle ${lifecycle}`, (state) => reviseEditorState(state, { status, lifecycle }));
}

export function createSetActiveWorkspaceCommand(workspaceId: Nullable<ID<'workspace'>>): EditorCommand {
  return createCommand('editor.workspace.activate', 'Set active workspace', (state) => reviseEditorState(state, { activeWorkspaceId: workspaceId }));
}

export function createSetActiveDocumentCommand(documentId: Nullable<ID<'document'>>): EditorCommand {
  return createCommand('editor.document.activate', 'Set active document', (state) => reviseEditorState(state, { activeDocumentId: documentId }));
}

export function createSetActiveToolCommand(tool: Nullable<EditorTool>): EditorCommand {
  return createCommand('editor.tool.activate', 'Set active tool', (state) => reviseEditorState(state, { activeTool: tool }));
}

export function createSetEditorModeCommand(mode: Nullable<EditorModeState>): EditorCommand {
  return createCommand('editor.mode.activate', 'Set editor mode', (state) => reviseEditorState(state, { mode }));
}

export function createStartSessionCommand(sessionId: Nullable<ID<'editor-session'>>): EditorCommand {
  return createCommand('editor.session.activate', 'Set active session', (state) => reviseEditorState(state, { activeSessionId: sessionId }));
}
