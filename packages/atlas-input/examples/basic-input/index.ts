import { InputDeviceType, InputManager, createInputEvent } from '@atlas/atlas-input';

const input = new InputManager();
input.registerDevice({ id: 'keyboard', type: InputDeviceType.Keyboard, label: 'Keyboard' });
input.record(createInputEvent('example-input', 'keyboard', 'keydown', { key: 'Enter' }));

export { input };
