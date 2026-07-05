import { HistoryManager, createHistoryEntry } from '@atlas/atlas-history';

const history = new HistoryManager();
history.push(createHistoryEntry('entry-example', 'Example', { ok: true }));

export { history };
