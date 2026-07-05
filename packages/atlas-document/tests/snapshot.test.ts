import { SnapshotFactory } from '@atlas/atlas-document/snapshot';
import type { ID, Timestamp } from '@atlas/atlas-types';

const factory = new SnapshotFactory();
const snapshot = factory.create(
  'snapshot-1' as ID<'document-snapshot'>,
  'document-1' as ID<'atlas-document'>,
  '1.0.0',
  { id: 'document-1' },
  {
    createdBy: 'user-1' as ID<'user'>,
    createdAt: '2026-07-03T00:00:00.000Z' as Timestamp,
    label: 'Initial'
  },
  {
    requestId: 'snapshot-request' as ID<'snapshot-request'>,
    options: { includeMetadata: true, freeze: true }
  }
);

export const snapshotResult = snapshot;
