import type { ID } from '../common';
import type { ExportMetadata } from './ExportMetadata';
import type { ExportOptions } from './ExportOptions';
import type { ExportTarget } from './ExportTarget';

/**
 * Request describing what should be exported and how.
 */
export interface ExportRequest {
  readonly id: ID<'export-request'>;
  readonly workspaceId: ID<'workspace'>;
  readonly projectId: ID<'project'>;
  readonly targets: readonly ExportTarget[];
  readonly options: ExportOptions;
  readonly metadata: ExportMetadata;
}
