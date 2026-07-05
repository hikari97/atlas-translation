import type { JsonObject } from '@atlas/atlas-types';
import { createUIComponentIdentifier, type UIAccessibility, type UIComponentDescriptor, type UIComponentKind } from '../contracts';

export function createUIComponent(
  id: string,
  kind: UIComponentKind,
  name: string,
  role: string,
  props: JsonObject = {},
  accessibility: Partial<UIAccessibility> = {}
): UIComponentDescriptor {
  return {
    id: createUIComponentIdentifier(id),
    kind,
    name,
    accessibility: {
      role,
      label: accessibility.label ?? name,
      describedBy: accessibility.describedBy,
      disabled: accessibility.disabled
    },
    props
  };
}
