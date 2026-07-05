import { SelectionManager } from '@atlas/atlas-selection';
import type { ID } from '@atlas/atlas-types';
import { firstItem } from '../fixtures/items';

const manager = new SelectionManager();
manager.selectSingle(firstItem);
const session = manager.startSession('selection-session-1' as ID<'selection-session'>);

const selectedCount: number = session.state.items.length;

export { selectedCount };
