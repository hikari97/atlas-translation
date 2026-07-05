import type { ID, Timestamp } from '../common';
import type { ExportFormat as ExportFormatKind, WorkflowState } from '../enums';

/**
 * Lightweight reference to an export job.
 */
export interface ExportReference {
  readonly id: ID<'export-job'>;
  readonly projectId: ID<'project'>;
  readonly format: ExportFormatKind;
  readonly state: WorkflowState;
  readonly updatedAt: Timestamp;
}
