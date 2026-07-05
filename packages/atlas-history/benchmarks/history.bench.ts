import { HistoryManager, createHistoryEntry } from '@atlas/atlas-history';

const manager = new HistoryManager(1000);
const startedAt = Date.now();

for (let index = 0; index < 1000; index += 1) {
  manager.push(createHistoryEntry(`entry-${index}`, `Entry ${index}`, { index }));
}

const historyBenchmark = { count: manager.current().entries.length, elapsedMs: Date.now() - startedAt };

export { historyBenchmark };
