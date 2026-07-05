import { Editor, EditorRuntimeStatus, PerformanceBudget, BudgetSeverity, RuntimeMetrics, createSetActiveWorkspaceCommand, createSetEditorModeCommand, createSetActiveToolCommand } from '../src';
import { EditorMode, SelectionMode, type EditorModeState, type EditorTool, type ID } from '@atlas/atlas-types';

const editorId = 'editor:test' as ID<'editor'>;
const workspaceId = 'workspace:test' as ID<'workspace'>;

const tool: EditorTool = {
  id: 'tool:pan' as ID<'editor-tool'>,
  name: 'Pan',
  description: null,
  enabled: true,
  pluginId: null
};

const mode: EditorModeState = {
  mode: EditorMode.Select,
  selectionMode: SelectionMode.Single,
  readonly: false
};

const editor = new Editor({ id: editorId });
await editor.initialize();
editor.dispatch(createSetActiveWorkspaceCommand(workspaceId));
editor.dispatch(createSetActiveToolCommand(tool));
editor.dispatch(createSetEditorModeCommand(mode));

const state = editor.current();
state.status satisfies EditorRuntimeStatus;
state.activeWorkspaceId satisfies ID<'workspace'> | null;
editor.snapshot().toolIds satisfies readonly ID<'editor-tool'>[];

const metrics = new RuntimeMetrics();
metrics.record({ token: 'startup.ms', value: 12, unit: 'ms' });

const budget = new PerformanceBudget();
budget.register({
  id: 'startup',
  name: 'Startup duration',
  metricToken: 'startup.ms',
  threshold: 10,
  severity: BudgetSeverity.Warning,
  enabled: true,
  metadata: {}
});

budget.validate(metrics.snapshot()).violations.length satisfies number;
