import type {
  EditorModeState,
  ExportFormatOptions,
  HistoryActionRecord,
  ImageFormatMetadata,
  WorkflowStateDefinition
} from '@atlas/atlas-types';
import {
  EditorMode,
  ExportFormat,
  HistoryAction,
  ImageFormat,
  WorkflowState
} from '@atlas/atlas-types';

declare const editorModeState: EditorModeState;
declare const exportFormatOptions: ExportFormatOptions;
declare const historyActionRecord: HistoryActionRecord;
declare const imageFormatMetadata: ImageFormatMetadata;
declare const workflowStateDefinition: WorkflowStateDefinition;

const enumValues = {
  editorMode: EditorMode.Select,
  exportFormat: ExportFormat.Png,
  historyAction: HistoryAction.Create,
  imageFormat: ImageFormat.Png,
  workflowState: WorkflowState.Pending
};

export type CollisionSafeExportsTest = {
  readonly editorModeState: typeof editorModeState;
  readonly exportFormatOptions: typeof exportFormatOptions;
  readonly historyActionRecord: typeof historyActionRecord;
  readonly imageFormatMetadata: typeof imageFormatMetadata;
  readonly workflowStateDefinition: typeof workflowStateDefinition;
  readonly enumValues: typeof enumValues;
};
