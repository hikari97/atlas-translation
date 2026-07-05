import type {
  Asset,
  Bubble,
  Canvas,
  Editor,
  ExportJob,
  HistoryEntry,
  Image,
  Plugin,
  Project,
  Selection,
  Translation,
  WorkflowDefinition,
  Workspace
} from '@atlas/atlas-types';
import { ExportFormat, PluginType, WorkflowState } from '@atlas/atlas-types';

declare const asset: Asset;
declare const bubble: Bubble;
declare const canvas: Canvas;
declare const editor: Editor;
declare const exportJob: ExportJob;
declare const historyEntry: HistoryEntry;
declare const image: Image;
declare const plugin: Plugin;
declare const project: Project;
declare const selection: Selection;
declare const translation: Translation;
declare const workflow: WorkflowDefinition;
declare const workspace: Workspace;

const rootTypes = {
  asset,
  bubble,
  canvas,
  editor,
  exportJob,
  historyEntry,
  image,
  plugin,
  project,
  selection,
  translation,
  workflow,
  workspace
};

const rootEnums = {
  exportFormat: ExportFormat.Png,
  pluginType: PluginType.OCR,
  workflowState: WorkflowState.Running
};

export type RootApiSmokeTest = typeof rootTypes;
export type RootEnumSmokeTest = typeof rootEnums;
