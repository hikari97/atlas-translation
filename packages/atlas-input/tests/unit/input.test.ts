import { InputDeviceType, InputManager, InputRouter, createInputEvent } from '@atlas/atlas-input';

const manager = new InputManager();
manager.registerDevice({ id: 'keyboard', type: InputDeviceType.Keyboard, label: 'Keyboard' });
const event = createInputEvent('input-1', 'keyboard', 'keydown', { key: 'A' });
manager.record(event);

let routed = false;
const router = new InputRouter();
router.on('keydown', () => {
  routed = true;
});
router.route(event);

const inputCount: number = manager.current().events.length;
const routedEvent: boolean = routed;

export { inputCount, routedEvent };
