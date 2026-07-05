import type { AtlasDocument } from '@atlas/atlas-document';
import type { DocumentCollection } from '@atlas/atlas-document/collection';
import type { DocumentSnapshot } from '@atlas/atlas-document/snapshot';

export type IntegrationApi = {
  readonly document: AtlasDocument;
  readonly collection: DocumentCollection<AtlasDocument>;
  readonly snapshot: DocumentSnapshot;
};
