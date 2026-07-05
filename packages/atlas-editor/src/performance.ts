import type { JsonObject } from '@atlas/atlas-types';
import type { EditorDiagnostics, EditorRuntimeState } from './types';

export enum BudgetSeverity {
  Warning = 'warning',
  Critical = 'critical'
}

export interface RuntimeMetric {
  readonly token: string;
  readonly value: number;
  readonly unit: string;
}

export interface BudgetRule {
  readonly id: string;
  readonly name: string;
  readonly metricToken: string;
  readonly threshold: number;
  readonly severity: BudgetSeverity;
  readonly enabled: boolean;
  readonly metadata: JsonObject;
}

export interface BudgetViolation {
  readonly ruleId: string;
  readonly metricToken: string;
  readonly value: number;
  readonly threshold: number;
  readonly severity: BudgetSeverity;
}

export interface BudgetSnapshot {
  readonly violations: readonly BudgetViolation[];
  readonly checkedAt: string;
}

export class RuntimeMetrics {
  private readonly metrics = new Map<string, RuntimeMetric>();

  public record(metric: RuntimeMetric): void {
    this.metrics.set(metric.token, metric);
  }

  public snapshot(): readonly RuntimeMetric[] {
    return [...this.metrics.values()];
  }
}

export class PerformanceBudget {
  private readonly rules = new Map<string, BudgetRule>();
  private lastViolations: readonly BudgetViolation[] = [];

  public register(rule: BudgetRule): void {
    this.rules.set(rule.id, rule);
  }

  public unregister(id: string): void {
    this.rules.delete(id);
  }

  public validate(metrics: readonly RuntimeMetric[]): BudgetSnapshot {
    const violations = metrics.flatMap((metric) => this.evaluateMetric(metric));
    this.lastViolations = violations;
    return { violations, checkedAt: new Date().toISOString() };
  }

  public violations(): readonly BudgetViolation[] {
    return this.lastViolations;
  }

  private evaluateMetric(metric: RuntimeMetric): readonly BudgetViolation[] {
    return [...this.rules.values()]
      .filter((rule) => rule.enabled && rule.metricToken === metric.token && metric.value > rule.threshold)
      .map((rule) => ({
        ruleId: rule.id,
        metricToken: metric.token,
        value: metric.value,
        threshold: rule.threshold,
        severity: rule.severity
      }));
  }
}

export function diagnoseEditor(state: EditorRuntimeState): EditorDiagnostics {
  const issues = state.revision < 0 ? ['Editor revision is invalid.'] : [];
  return { status: state.status, issues, revision: state.revision, checkedAt: new Date().toISOString() };
}
