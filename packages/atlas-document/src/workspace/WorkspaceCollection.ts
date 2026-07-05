import { DocumentCollection } from '../collection';
import type { ProjectDocument } from '../project';

/**
 * Collection of projects owned by a workspace.
 */
export class WorkspaceCollection extends DocumentCollection<ProjectDocument> {}
