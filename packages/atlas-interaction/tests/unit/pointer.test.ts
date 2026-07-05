import { PointerCapture, PointerDeviceType, PointerHitTest, PointerTracker } from '@atlas/atlas-interaction';

const capture = new PointerCapture();
capture.capture('pointer-1');

const tracker = new PointerTracker();
tracker.update({
  pointerId: 'pointer-1',
  deviceType: PointerDeviceType.Mouse,
  position: { x: 5, y: 5 },
  pressure: 0
});

const hit = new PointerHitTest().hitTest({ x: 5, y: 5 }, [{ id: 'target-1', bounds: { minX: 0, minY: 0, maxX: 10, maxY: 10 } }]);

const pointerCaptured = capture.current();
const pointerCount: number = tracker.list().length;
const hitTargetId = hit?.id;

export { hitTargetId, pointerCaptured, pointerCount };
