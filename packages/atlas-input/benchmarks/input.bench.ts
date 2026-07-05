import { InputManager, createInputEvent } from '@atlas/atlas-input';

const manager = new InputManager();
const startedAt = Date.now();

for (let index = 0; index < 1000; index += 1) {
  manager.record(createInputEvent(`input-${index}`, 'keyboard', 'keydown', { index }));
}

const inputBenchmark = { count: manager.current().events.length, elapsedMs: Date.now() - startedAt };

export { inputBenchmark };
