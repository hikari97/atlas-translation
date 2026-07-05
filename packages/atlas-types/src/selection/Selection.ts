import type { ID } from '../common';
import type { SelectionMetadata } from './SelectionMetadata';
import type { SelectionState } from './SelectionState';

/**
 * Framework-independent selection model.
 */
export interface Selection {
  readonly id: ID<'selection'>;
  readonly editorId: ID<'editor'>;
  readonly workspaceId: ID<'workspace'>;
  readonly projectId: ID<'project'>;
  readonly pageId: ID<'page'>;
  readonly state: SelectionState;
  readonly metadata: SelectionMetadata;
}
