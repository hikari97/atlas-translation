import type {
  ExportJob,
  HistoryEntry,
  Plugin,
  WorkflowDefinition
} from '@atlas/atlas-types/platform';
import type { Asset } from '@atlas/atlas-types/resource';
import type { Project } from '@atlas/atlas-types/workspace';
import type { Canvas, Selection } from '@atlas/atlas-types/editor';

declare const project: Project;
declare const selection: Selection;
declare const asset: Asset;
declare const plugin: Plugin;
declare const workflow: WorkflowDefinition;
declare const historyEntry: HistoryEntry;
declare const exportJob: ExportJob;
declare const canvas: Canvas;

export type CompatibilityTest = {
  readonly projectId: typeof project.id;
  readonly selectedPageId: typeof selection.pageId;
  readonly assetId: typeof asset.id;
  readonly pluginType: typeof plugin.manifest.type;
  readonly workflowState: typeof workflow.state;
  readonly historyTargetId: typeof historyEntry.target.id;
  readonly exportState: typeof exportJob.state;
  readonly canvasPageId: typeof canvas.page.id;
};
