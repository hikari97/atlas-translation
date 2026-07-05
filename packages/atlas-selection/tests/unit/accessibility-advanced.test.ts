import { createScreenReaderMetadata, createSelectionSnapshot, createSelectionState, diagnoseSelection, SelectionHistory, validateAccessibleSelection } from '@atlas/atlas-selection';
import { firstItem } from '../fixtures/items';

const state = createSelectionState([firstItem]);
const metadata = createScreenReaderMetadata(firstItem, 1, 1);
const validAccessible: boolean = validateAccessibleSelection(metadata);
const snapshot = createSelectionSnapshot(state);
const history = new SelectionHistory();
history.push(snapshot.state);
const diagnostics = diagnoseSelection(state);

const historyCount: number = history.list().length;
const diagnosticSelectedCount: number = diagnostics.selectedCount;

export { diagnosticSelectedCount, historyCount, validAccessible };
