import { SelectionManager, createSelectionItem } from '@atlas/atlas-selection';
import type { ID } from '@atlas/atlas-types';

const selectionManager = new SelectionManager();
const selectionState = selectionManager.selectSingle(createSelectionItem('selection-item-example', 'entity-example' as ID, 'bubble'));

export { selectionState };
