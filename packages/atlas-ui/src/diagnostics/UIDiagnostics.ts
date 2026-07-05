import type { UIComponentDescriptor } from '../contracts';
import { AccessibilityValidator } from '../accessibility';

export interface UIDiagnosticReport {
  readonly componentCount: number;
  readonly accessibilityIssueCount: number;
  readonly generatedAt: string;
}

export class UIDiagnostics {
  private readonly accessibility = new AccessibilityValidator();

  public report(components: readonly UIComponentDescriptor[]): UIDiagnosticReport {
    const accessibilityIssueCount = components
      .map((component) => this.accessibility.validate(component).issues.length)
      .reduce((total, count) => total + count, 0);

    return {
      componentCount: components.length,
      accessibilityIssueCount,
      generatedAt: new Date().toISOString()
    };
  }
}
