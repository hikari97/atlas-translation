import { HistoryManager } from '@atlas/atlas-history';
import { InputManager } from '@atlas/atlas-input';
import { DefaultPluginManager } from '@atlas/atlas-plugin';
import { RendererRuntime } from '@atlas/atlas-renderer';
import { SelectionManager } from '@atlas/atlas-selection';
import type { ID } from '@atlas/atlas-types';
import { createSetLifecycleCommand, type EditorCommand } from './commands';
import { createEditorMetadata, createEditorRuntimeState } from './state';
import { DocumentManager, ModeManager, SessionManager, ToolManager, WorkspaceManager } from './registries';
import { IntegrationContext } from './integration';
import { EditorLifecycleStage, EditorRuntimeStatus, type EditorCommandResult, type EditorMetadata, type EditorOptions, type EditorRuntimeState, type EditorServices, type EditorSnapshot } from './types';

export class Editor {
  private state: EditorRuntimeState;

  public readonly metadata: EditorMetadata;
  public readonly services: EditorServices;
  public readonly workspaces = new WorkspaceManager();
  public readonly documents = new DocumentManager();
  public readonly tools = new ToolManager();
  public readonly modes = new ModeManager();
  public readonly sessions = new SessionManager();
  public readonly integration: IntegrationContext;

  public constructor(options: EditorOptions) {
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

  public get id(): ID<'editor'> {
    return this.metadata.id;
  }

  public current(): EditorRuntimeState {
    return this.state;
  }

  public dispatch(command: EditorCommand): EditorCommandResult {
    const previous = this.state;
    const next = command.apply(previous);
    this.state = next;
    return { commandId: command.id, accepted: previous !== next, previous, next };
  }

  public initialize(): Promise<void> {
    this.dispatch(createSetLifecycleCommand(EditorRuntimeStatus.Ready, EditorLifecycleStage.Initialized));
    return Promise.resolve();
  }

  public start(): Promise<void> {
    this.dispatch(createSetLifecycleCommand(EditorRuntimeStatus.Running, EditorLifecycleStage.Running));
    return Promise.resolve();
  }

  public suspend(): Promise<void> {
    this.dispatch(createSetLifecycleCommand(EditorRuntimeStatus.Suspended, EditorLifecycleStage.Suspended));
    return Promise.resolve();
  }

  public resume(): Promise<void> {
    this.dispatch(createSetLifecycleCommand(EditorRuntimeStatus.Running, EditorLifecycleStage.Running));
    return Promise.resolve();
  }

  public dispose(): Promise<void> {
    this.dispatch(createSetLifecycleCommand(EditorRuntimeStatus.Disposed, EditorLifecycleStage.Disposed));
    return Promise.resolve();
  }

  public snapshot(): EditorSnapshot {
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
}

export function createEditor(options: EditorOptions): Editor {
  return new Editor(options);
}
