import { SelectionMode, type ID, type SelectionItem, type SelectionState } from '@atlas/atlas-types';
import { createSelectionState, type SelectionSession } from './SelectionModel';

export class SelectionManager {
  private currentState: SelectionState = createSelectionState();

  public current(): SelectionState {
    return this.currentState;
  }

  public startSession(id: ID<'selection-session'>): SelectionSession {
    return { id, state: this.currentState };
  }

  public selectSingle(item: SelectionItem): SelectionState {
    this.currentState = createSelectionState([item], SelectionMode.Single);
    return this.currentState;
  }

  public selectMany(items: readonly SelectionItem[]): SelectionState {
    this.currentState = createSelectionState(items, SelectionMode.Multiple);
    return this.currentState;
  }

  public clear(): SelectionState {
    this.currentState = createSelectionState();
    return this.currentState;
  }
}
