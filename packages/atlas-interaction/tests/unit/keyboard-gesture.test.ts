import { GestureRecognizer, ShortcutDispatcher, createKeySequence } from '@atlas/atlas-interaction';

let dispatched = false;
const dispatcher = new ShortcutDispatcher();
const sequence = createKeySequence(['Meta', 'S']);
dispatcher.register(sequence, () => {
  dispatched = true;
});

dispatcher.dispatch(sequence, {
  key: 's',
  code: 'KeyS',
  composing: false,
  modifiers: {
    alt: false,
    control: false,
    meta: true,
    shift: false
  }
});

const gesture = new GestureRecognizer().zoom({ x: 0, y: 0 }, 2);
const shortcutDispatched: boolean = dispatched;
const gestureScale: number = gesture.scale;

export { gestureScale, shortcutDispatched };
