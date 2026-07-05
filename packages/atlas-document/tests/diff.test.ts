import { DocumentDiffer } from '@atlas/atlas-document/diff';
import type { DocumentSnapshot } from '@atlas/atlas-document/snapshot';
import type { ID, Timestamp } from '@atlas/atlas-types';

const timestamp = '2026-07-03T00:00:00.000Z' as Timestamp;
const baseSnapshot = {
  id: 'snapshot-a' as ID<'document-snapshot'>,
  documentId: 'document-1' as ID<'atlas-document'>,
  schemaVersion: '1.0.0',
  data: { name: 'A' },
  metadata: { createdBy: 'user-1' as ID<'user'>, createdAt: timestamp, label: null }
} satisfies DocumentSnapshot;

const nextSnapshot = {
  ...baseSnapshot,
  id: 'snapshot-b' as ID<'document-snapshot'>,
  data: { name: 'B' }
} satisfies DocumentSnapshot;

const differ = new DocumentDiffer();

export const diffResult = differ.compare(
  'diff-1' as ID<'document-diff'>,
  baseSnapshot,
  nextSnapshot,
  timestamp,
  {
    requestId: 'diff-request' as ID<'diff-request'>,
    options: { includeUnchanged: false, detectMoves: false }
  }
);
