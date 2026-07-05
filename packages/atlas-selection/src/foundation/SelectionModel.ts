import { SelectionMode, type ID, type SelectionFilter, type SelectionItem, type SelectionState } from '@atlas/atlas-types';

export interface SelectionSession {
  readonly id: ID<'selection-session'>;
  readonly state: SelectionState;
}

export const DEFAULT_SELECTION_FILTER: SelectionFilter = {
  entityTypes: [],
  includeLocked: false,
  includeHidden: false
};

export function createSelectionState(items: readonly SelectionItem[] = [], mode: SelectionMode = SelectionMode.Multiple): SelectionState {
  return {
    mode,
    primaryItem: items[0] ?? null,
    items: items.slice(),
    groups: [],
    filter: DEFAULT_SELECTION_FILTER
  };
}

export function createSelectionItem(id: string, entityId: ID, entityType: string): SelectionItem {
  return {
    id: id as ID<'selection-item'>,
    entityId,
    entityType,
    bounds: null
  };
}
