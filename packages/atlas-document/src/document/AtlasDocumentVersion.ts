/**
 * Version metadata for an Atlas document.
 */
export interface AtlasDocumentVersion {
  readonly schemaVersion: string;
  readonly documentVersion: string;
  readonly revision: number;
}
