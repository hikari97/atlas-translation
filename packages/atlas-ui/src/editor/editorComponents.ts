import type { BoundingBox, Point } from '@atlas/atlas-types';
import { UIComponentKind, type UIComponentDescriptor } from '../contracts';
import { createUIComponent } from '../utils';

export function createEditorView(id: string, label: string, renderTreeId: string | null): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.EditorView, label, 'region', { renderTreeId });
}

export function createCaret(id: string, position: Point, visible = true): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Caret, 'Caret', 'presentation', {
    position: {
      x: position.x,
      y: position.y
    },
    visible
  });
}

export function createSelection(id: string, bounds: readonly BoundingBox[]): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Selection, 'Selection', 'presentation', {
    bounds: bounds.map((bound) => ({
      minX: bound.minX,
      minY: bound.minY,
      maxX: bound.maxX,
      maxY: bound.maxY
    }))
  });
}

export function createPlaceholder(id: string, message: string): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.Placeholder, message, 'status', { message });
}

export function createFloatingToolbar(id: string, targetId: string, actions: readonly string[]): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.FloatingToolbar, 'Floating Toolbar', 'toolbar', { targetId, actions: actions.slice() });
}

export function createBlockToolbar(id: string, blockId: string, actions: readonly string[]): UIComponentDescriptor {
  return createUIComponent(id, UIComponentKind.BlockToolbar, 'Block Toolbar', 'toolbar', { blockId, actions: actions.slice() });
}
