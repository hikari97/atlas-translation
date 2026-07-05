import { SelectionManager, createSelectionItem } from '@atlas/atlas-selection';
import type { ID } from '@atlas/atlas-types';

const manager = new SelectionManager();
const startedAt = Date.now();

for (let index = 0; index < 1000; index += 1) {
  manager.selectSingle(createSelectionItem(`selection-item-${index}`, `entity-${index}` as ID, 'bubble'));
}

const selectionManagerBenchmark = {
  count: manager.current().items.length,
  elapsedMs: Date.now() - startedAt
};

export { selectionManagerBenchmark };
