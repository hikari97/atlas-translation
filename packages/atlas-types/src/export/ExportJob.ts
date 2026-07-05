import type { ID } from '../common';
import type { WorkflowState } from '../enums';
import type { ExportRequest } from './ExportRequest';
import type { ExportResult } from './ExportResult';

/**
 * Tracked export job with request and result metadata.
 */
export interface ExportJob {
  readonly id: ID<'export-job'>;
  readonly request: ExportRequest;
  readonly state: WorkflowState;
  readonly result: ExportResult | null;
}
