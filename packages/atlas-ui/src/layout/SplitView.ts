import type { JsonObject } from '@atlas/atlas-types';
import { UIComponentKind, type UIComponentDescriptor } from '../contracts';
import { createUIComponent } from '../utils';

export enum SplitViewOrientation {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

export function createSplitView(
  id: string,
  label: string,
  orientation: SplitViewOrientation,
  panels: readonly string[]
): UIComponentDescriptor {
  const props: JsonObject = {
    orientation,
    panels: panels.slice()
  };
  return createUIComponent(id, UIComponentKind.Primitive, label, 'group', props);
}
