import { EventBuffer, InputCache, createInputEvent, diagnoseInputEvents, measureInput, resolveAction, validateInputEvent } from '@atlas/atlas-input';

const event = createInputEvent('input-2', 'pointer', 'pointerdown');
const action = resolveAction([{ inputType: 'pointerdown', action: 'select' }], 'pointerdown');
const valid: boolean = validateInputEvent(event);
const diagnostics = diagnoseInputEvents([event]);
const buffer = new EventBuffer();
buffer.push(event);
const flushed = buffer.flush();
const cache = new InputCache();
cache.set(event);
const metrics = measureInput(flushed);

const resolvedAction = action;
const diagnosticCount: number = diagnostics.count;
const cached = cache.get('input-2')?.id;
const metricCount: number = metrics.eventCount;

export { cached, diagnosticCount, metricCount, resolvedAction, valid };
