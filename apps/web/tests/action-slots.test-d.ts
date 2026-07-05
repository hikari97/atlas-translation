import { executeActionSlot, type ActionSlot } from '../src/lib/action-slots';

// Type checks
const action: ActionSlot = {
  id: "test",
  label: "Run",
  onClick: () => { console.log("done"); }
};
const _promise: Promise<void> = executeActionSlot(action);

console.log("Action slot types validated");
