import type { ID } from '@atlas/atlas-types';
import type { WorkspaceDocument } from '../workspace';
import type { AtlasDocumentMetadata } from './AtlasDocumentMetadata';
import type { AtlasDocumentSettings } from './AtlasDocumentSettings';
import type { AtlasDocumentState } from './AtlasDocumentState';
import type { AtlasDocumentVersion } from './AtlasDocumentVersion';

/**
 * Aggregate root for an Atlas Studio document.
 */
export class AtlasDocument {
  public constructor(
    public readonly id: ID<'atlas-document'>,
    public readonly workspace: WorkspaceDocument,
    public readonly metadata: AtlasDocumentMetadata,
    public readonly version: AtlasDocumentVersion,
    public readonly settings: AtlasDocumentSettings,
    public readonly state: AtlasDocumentState
  ) {}

  public get projects(): ReturnType<WorkspaceDocument['projects']['slice']> {
    return this.workspace.projects.slice();
  }

  public get projectCount(): number {
    return this.workspace.projectCount;
  }
}
