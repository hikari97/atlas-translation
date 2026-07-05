import type { EditorModeState, EditorTool, ID, JsonObject, Nullable } from '@atlas/atlas-types';
import type { AtlasDocument } from '@atlas/atlas-document';
import type { DocumentRecord, EditorRuntimeState, EditorSessionRecord, WorkspaceRecord } from './types';

export class WorkspaceManager {
  private readonly workspaces = new Map<ID<'workspace'>, WorkspaceRecord>();

  public register(workspace: WorkspaceRecord): void {
    this.workspaces.set(workspace.id, workspace);
  }

  public get(id: ID<'workspace'>): WorkspaceRecord | null {
    return this.workspaces.get(id) ?? null;
  }

  public list(): readonly WorkspaceRecord[] {
    return [...this.workspaces.values()];
  }
}

export class DocumentManager {
  private readonly documents = new Map<ID<'document'>, DocumentRecord>();

  public register(id: ID<'document'>, document: AtlasDocument, workspaceId: Nullable<ID<'workspace'>> = null, metadata: JsonObject = {}): void {
    this.documents.set(id, { id, document, workspaceId, metadata });
  }

  public get(id: ID<'document'>): DocumentRecord | null {
    return this.documents.get(id) ?? null;
  }

  public list(): readonly DocumentRecord[] {
    return [...this.documents.values()];
  }
}

export class ToolManager {
  private readonly tools = new Map<ID<'editor-tool'>, EditorTool>();

  public register(tool: EditorTool): void {
    this.tools.set(tool.id, tool);
  }

  public get(id: ID<'editor-tool'>): EditorTool | null {
    return this.tools.get(id) ?? null;
  }

  public list(): readonly EditorTool[] {
    return [...this.tools.values()];
  }
}

export class ModeManager {
  private readonly modes = new Map<string, EditorModeState>();

  public register(id: string, mode: EditorModeState): void {
    this.modes.set(id, mode);
  }

  public get(id: string): EditorModeState | null {
    return this.modes.get(id) ?? null;
  }

  public list(): readonly EditorModeState[] {
    return [...this.modes.values()];
  }

  public ids(): readonly string[] {
    return [...this.modes.keys()];
  }
}

export class SessionManager {
  private readonly sessions = new Map<ID<'editor-session'>, EditorSessionRecord>();

  public create(id: ID<'editor-session'>, name: string, state: EditorRuntimeState, metadata: JsonObject = {}): EditorSessionRecord {
    const session = { id, name, state, metadata };
    this.sessions.set(id, session);
    return session;
  }

  public get(id: ID<'editor-session'>): EditorSessionRecord | null {
    return this.sessions.get(id) ?? null;
  }

  public restore(id: ID<'editor-session'>): EditorRuntimeState | null {
    return this.sessions.get(id)?.state ?? null;
  }

  public list(): readonly EditorSessionRecord[] {
    return [...this.sessions.values()];
  }
}
