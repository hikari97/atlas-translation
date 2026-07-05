import { SnapshotManager, deserializeHistory, serializeHistory, createHistoryState } from '@atlas/atlas-history';

const snapshots = new SnapshotManager();
const snapshot = snapshots.create('snapshot-1', { value: 1 });
const serialized = serializeHistory(createHistoryState());
const restored = deserializeHistory(serialized);

const snapshotValid: boolean = snapshots.validate(snapshot);
const restoredVersion: string = restored.metadata.version;

export { restoredVersion, snapshotValid };
