import { GestureManager, KeyboardManager, PointerDeviceType, PointerManager, ShortcutManager, WheelManager } from '@atlas/atlas-input';

const keyboard = new KeyboardManager();
keyboard.keyDown('Meta');
const pointer = new PointerManager();
pointer.update({ pointerId: 'pointer-1', deviceType: PointerDeviceType.Mouse, position: { x: 1, y: 2 }, pressure: 0 });
const wheel = new WheelManager();
wheel.record(5);
const gesture = new GestureManager().pinch({ x: 0, y: 0 }, 2);
const shortcuts = new ShortcutManager();
shortcuts.register({ id: 'save', keys: ['Meta', 'S'], action: 'save' });

const keyCount: number = keyboard.state().length;
const pointerCount: number = pointer.state().length;
const wheelTotal: number = wheel.total();
const gestureScale: number = gesture.scale;
const shortcutAction = shortcuts.resolve(['Meta', 'S'])?.action;

export { gestureScale, keyCount, pointerCount, shortcutAction, wheelTotal };
