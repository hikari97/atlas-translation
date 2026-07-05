import type { UIComponentDescriptor } from '../contracts';

export interface AccessibilityReport {
  readonly valid: boolean;
  readonly issues: readonly string[];
}

export class AccessibilityValidator {
  public validate(component: UIComponentDescriptor): AccessibilityReport {
    const issues: string[] = [];
    if (component.accessibility.role.trim().length === 0) {
      issues.push('Accessibility role is required.');
    }
    if (component.accessibility.label !== undefined && component.accessibility.label.trim().length === 0) {
      issues.push('Accessibility label must not be empty.');
    }
    return {
      valid: issues.length === 0,
      issues
    };
  }
}
