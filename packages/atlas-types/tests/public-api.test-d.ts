import type { JsonObject } from '@atlas/atlas-types/foundation';
import type { WorkflowDefinition } from '@atlas/atlas-types/platform';
import { PluginType, WorkflowState } from '@atlas/atlas-types';

declare const workflow: WorkflowDefinition;
declare const metadata: JsonObject;

const publicValues = {
  pluginType: PluginType.Translation,
  workflowState: WorkflowState.Completed
};

export type PublicApiTest = {
  readonly workflow: typeof workflow;
  readonly metadata: typeof metadata;
  readonly publicValues: typeof publicValues;
};
