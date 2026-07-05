import { ID, Nullable, JsonObject, EditorTool, EditorModeState } from '@atlas/atlas-types';
import { AtlasDocument } from '@atlas/atlas-document';
import { HistoryManager, HistoryEntry } from '@atlas/atlas-history';
import { InputManager, InputEventModel } from '@atlas/atlas-input';
import { DefaultPluginManager, PluginDefinition } from '@atlas/atlas-plugin';
import { RendererRuntime, RenderResult } from '@atlas/atlas-renderer';
import { SelectionManager } from '@atlas/atlas-selection';
import { AsyncCommandBus, Command, CommandContext, CommandResult } from '@atlas/atlas-command';

declare enum EditorLifecycleStage {
    Created = "created",
    Initialized = "initialized",
    Running = "running",
    Suspended = "suspended",
    Disposed = "disposed"
}
declare enum EditorRuntimeStatus {
    Idle = "idle",
    Ready = "ready",
    Running = "running",
    Suspended = "suspended",
    Disposed = "disposed"
}
interface EditorMetadata {
    readonly id: ID<'editor'>;
    readonly name: string;
    readonly version: string;
    readonly createdAt: string;
    readonly metadata: JsonObject;
}
interface EditorOptions {
    readonly id: ID<'editor'>;
    readonly name?: string | undefined;
    readonly version?: string | undefined;
    readonly metadata?: JsonObject | undefined;
    readonly services?: Partial<EditorServices> | undefined;
}
interface EditorServices {
    readonly history: HistoryManager;
    readonly input: InputManager;
    readonly plugins: DefaultPluginManager;
    readonly renderer: RendererRuntime;
    readonly selection: SelectionManager;
}
interface EditorRuntimeState {
    readonly status: EditorRuntimeStatus;
    readonly lifecycle: EditorLifecycleStage;
    readonly activeWorkspaceId: Nullable<ID<'workspace'>>;
    readonly activeDocumentId: Nullable<ID<'document'>>;
    readonly activeTool: Nullable<EditorTool>;
    readonly mode: Nullable<EditorModeState>;
    readonly activeSessionId: Nullable<ID<'editor-session'>>;
    readonly revision: number;
}
interface EditorSnapshot {
    readonly metadata: EditorMetadata;
    readonly state: EditorRuntimeState;
    readonly workspaceIds: readonly ID<'workspace'>[];
    readonly documentIds: readonly ID<'document'>[];
    readonly toolIds: readonly ID<'editor-tool'>[];
    readonly modeIds: readonly string[];
    readonly sessionIds: readonly ID<'editor-session'>[];
}
interface WorkspaceRecord {
    readonly id: ID<'workspace'>;
    readonly name: string;
    readonly metadata: JsonObject;
}
interface DocumentRecord {
    readonly id: ID<'document'>;
    readonly document: AtlasDocument;
    readonly workspaceId: Nullable<ID<'workspace'>>;
    readonly metadata: JsonObject;
}
interface EditorSessionRecord {
    readonly id: ID<'editor-session'>;
    readonly name: string;
    readonly state: EditorRuntimeState;
    readonly metadata: JsonObject;
}
interface EditorCommandResult {
    readonly commandId: string;
    readonly accepted: boolean;
    readonly previous: EditorRuntimeState;
    readonly next: EditorRuntimeState;
}
interface EditorDiagnostics {
    readonly status: EditorRuntimeStatus;
    readonly issues: readonly string[];
    readonly revision: number;
    readonly checkedAt: string;
}

interface EditorCommand {
    readonly id: string;
    readonly name: string;
    apply(state: EditorRuntimeState): EditorRuntimeState;
}
declare function createSetLifecycleCommand(status: EditorRuntimeStatus, lifecycle: EditorLifecycleStage): EditorCommand;
declare function createSetActiveWorkspaceCommand(workspaceId: Nullable<ID<'workspace'>>): EditorCommand;
declare function createSetActiveDocumentCommand(documentId: Nullable<ID<'document'>>): EditorCommand;
declare function createSetActiveToolCommand(tool: Nullable<EditorTool>): EditorCommand;
declare function createSetEditorModeCommand(mode: Nullable<EditorModeState>): EditorCommand;
declare function createStartSessionCommand(sessionId: Nullable<ID<'editor-session'>>): EditorCommand;

declare class WorkspaceManager {
    private readonly workspaces;
    register(workspace: WorkspaceRecord): void;
    get(id: ID<'workspace'>): WorkspaceRecord | null;
    list(): readonly WorkspaceRecord[];
}
declare class DocumentManager {
    private readonly documents;
    register(id: ID<'document'>, document: AtlasDocument, workspaceId?: Nullable<ID<'workspace'>>, metadata?: JsonObject): void;
    get(id: ID<'document'>): DocumentRecord | null;
    list(): readonly DocumentRecord[];
}
declare class ToolManager {
    private readonly tools;
    register(tool: EditorTool): void;
    get(id: ID<'editor-tool'>): EditorTool | null;
    list(): readonly EditorTool[];
}
declare class ModeManager {
    private readonly modes;
    register(id: string, mode: EditorModeState): void;
    get(id: string): EditorModeState | null;
    list(): readonly EditorModeState[];
    ids(): readonly string[];
}
declare class SessionManager {
    private readonly sessions;
    create(id: ID<'editor-session'>, name: string, state: EditorRuntimeState, metadata?: JsonObject): EditorSessionRecord;
    get(id: ID<'editor-session'>): EditorSessionRecord | null;
    restore(id: ID<'editor-session'>): EditorRuntimeState | null;
    list(): readonly EditorSessionRecord[];
}

interface IntegrationServices extends EditorServices {
    readonly capabilities: readonly string[];
}
declare class IntegrationContext {
    readonly services: IntegrationServices;
    constructor(services: IntegrationServices);
    inspect(): readonly string[];
}
declare class HistoryIntegration {
    private readonly manager;
    constructor(manager: HistoryManager);
    recordState(id: string, label: string, state: EditorRuntimeState): HistoryEntry;
}
declare class CommandIntegration {
    private readonly bus;
    constructor(bus: AsyncCommandBus);
    execute<TResult>(command: Command, context: CommandContext): Promise<CommandResult<TResult>>;
}
declare class RendererIntegration {
    private readonly renderer;
    constructor(renderer: RendererRuntime);
    render(document: AtlasDocument): RenderResult;
}
declare class InputIntegration {
    private readonly manager;
    constructor(manager: InputManager);
    record(event: InputEventModel): void;
}
declare class SelectionIntegration {
    readonly manager: SelectionManager;
    constructor(manager: SelectionManager);
}
declare class PluginIntegration {
    private readonly manager;
    private readonly plugins;
    constructor(manager: DefaultPluginManager);
    register(plugin: PluginDefinition): void;
    list(): readonly PluginDefinition[];
    runtime(): DefaultPluginManager;
}

declare class Editor {
    private state;
    readonly metadata: EditorMetadata;
    readonly services: EditorServices;
    readonly workspaces: WorkspaceManager;
    readonly documents: DocumentManager;
    readonly tools: ToolManager;
    readonly modes: ModeManager;
    readonly sessions: SessionManager;
    readonly integration: IntegrationContext;
    constructor(options: EditorOptions);
    get id(): ID<'editor'>;
    current(): EditorRuntimeState;
    dispatch(command: EditorCommand): EditorCommandResult;
    initialize(): Promise<void>;
    start(): Promise<void>;
    suspend(): Promise<void>;
    resume(): Promise<void>;
    dispose(): Promise<void>;
    snapshot(): EditorSnapshot;
}
declare function createEditor(options: EditorOptions): Editor;

declare class EditorManager {
    private readonly editors;
    register(editor: Editor): void;
    get(id: ID<'editor'>): Editor | null;
    list(): readonly Editor[];
}

declare enum BudgetSeverity {
    Warning = "warning",
    Critical = "critical"
}
interface RuntimeMetric {
    readonly token: string;
    readonly value: number;
    readonly unit: string;
}
interface BudgetRule {
    readonly id: string;
    readonly name: string;
    readonly metricToken: string;
    readonly threshold: number;
    readonly severity: BudgetSeverity;
    readonly enabled: boolean;
    readonly metadata: JsonObject;
}
interface BudgetViolation {
    readonly ruleId: string;
    readonly metricToken: string;
    readonly value: number;
    readonly threshold: number;
    readonly severity: BudgetSeverity;
}
interface BudgetSnapshot {
    readonly violations: readonly BudgetViolation[];
    readonly checkedAt: string;
}
declare class RuntimeMetrics {
    private readonly metrics;
    record(metric: RuntimeMetric): void;
    snapshot(): readonly RuntimeMetric[];
}
declare class PerformanceBudget {
    private readonly rules;
    private lastViolations;
    register(rule: BudgetRule): void;
    unregister(id: string): void;
    validate(metrics: readonly RuntimeMetric[]): BudgetSnapshot;
    violations(): readonly BudgetViolation[];
    private evaluateMetric;
}
declare function diagnoseEditor(state: EditorRuntimeState): EditorDiagnostics;

declare function createEditorMetadata(options: EditorOptions): EditorMetadata;
declare function createEditorRuntimeState(): EditorRuntimeState;
declare function reviseEditorState(state: EditorRuntimeState, patch: Omit<Partial<EditorRuntimeState>, 'revision'>): EditorRuntimeState;

export { type BudgetRule, BudgetSeverity, type BudgetSnapshot, type BudgetViolation, CommandIntegration, DocumentManager, type DocumentRecord, Editor, type EditorCommand, type EditorCommandResult, type EditorDiagnostics, EditorLifecycleStage, EditorManager, type EditorMetadata, type EditorOptions, type EditorRuntimeState, EditorRuntimeStatus, type EditorServices, type EditorSessionRecord, type EditorSnapshot, HistoryIntegration, InputIntegration, IntegrationContext, type IntegrationServices, ModeManager, PerformanceBudget, PluginIntegration, RendererIntegration, type RuntimeMetric, RuntimeMetrics, SelectionIntegration, SessionManager, ToolManager, WorkspaceManager, type WorkspaceRecord, createEditor, createEditorMetadata, createEditorRuntimeState, createSetActiveDocumentCommand, createSetActiveToolCommand, createSetActiveWorkspaceCommand, createSetEditorModeCommand, createSetLifecycleCommand, createStartSessionCommand, diagnoseEditor, reviseEditorState };
