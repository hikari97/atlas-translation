import { createHistoryBranch, createHistoryEntry, createHistoryTimeline, diagnoseHistory, measureHistory, createHistoryState } from '@atlas/atlas-history';

const entry = createHistoryEntry('entry-1', 'Branch Entry', { value: true });
const timeline = createHistoryTimeline([createHistoryBranch('branch-1', 'Main', [entry])]);
const state = { ...createHistoryState(), entries: timeline, cursor: 0 };
const report = diagnoseHistory(state);
const metrics = measureHistory(state, 1);

const timelineCount: number = timeline.length;
const diagnosticCount: number = report.entryCount;
const metricSnapshotCount: number = metrics.snapshotCount;

export { diagnosticCount, metricSnapshotCount, timelineCount };
