import {
  InteractionDiagnostics,
  InteractionPhase,
  InteractionType,
  ResizeAnchor,
  constrainDrag,
  createInteractionState,
  createResizePreview
} from '@atlas/atlas-interaction';
import type { ID } from '@atlas/atlas-types';

const constrained = constrainDrag({ x: 20, y: -5 }, { bounds: { minX: 0, minY: 0, maxX: 10, maxY: 10 } });
const preview = createResizePreview({ minX: 0, minY: 0, maxX: 20, maxY: 20 });
const report = new InteractionDiagnostics().report([
  createInteractionState('interaction-2' as ID<'interaction'>, InteractionType.Resize, InteractionPhase.Started)
]);

const constrainedX: number = constrained.x;
const previewMaxX: number = preview.maxX;
const resizeAnchor: ResizeAnchor = ResizeAnchor.BottomRight;
const diagnosticCount: number = report.interactionCount;

export { constrainedX, diagnosticCount, previewMaxX, resizeAnchor };
