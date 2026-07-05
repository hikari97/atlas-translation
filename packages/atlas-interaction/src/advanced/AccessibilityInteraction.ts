export interface AccessibilityInteraction {
  readonly label: string;
  readonly role: string;
  readonly active: boolean;
}

export function createAccessibilityInteraction(label: string, role: string, active = true): AccessibilityInteraction {
  return { label, role, active };
}
