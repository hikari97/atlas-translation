import type { JsonObject, Timestamp } from '@atlas/atlas-types';

export interface TranslationIntegrationPort {
  readonly id: string;
  readonly capability: string;
  readonly metadata: JsonObject;
}

export class TranslationIntegrationRegistry {
  private readonly ports = new Map<string, TranslationIntegrationPort>();

  public register(port: TranslationIntegrationPort): void {
    this.ports.set(port.id, port);
  }

  public list(): readonly TranslationIntegrationPort[] {
    return [...this.ports.values()];
  }
}

export interface TranslationMetric {
  readonly token: string;
  readonly value: number;
  readonly unit: string;
}

export interface TranslationDiagnostics {
  readonly issues: readonly string[];
  readonly metrics: readonly TranslationMetric[];
  readonly checkedAt: Timestamp;
}

export interface TranslationBudget {
  readonly metricToken: string;
  readonly threshold: number;
}

export class TranslationProfiler {
  private readonly metrics = new Map<string, TranslationMetric>();

  public record(metric: TranslationMetric): void {
    this.metrics.set(metric.token, metric);
  }

  public diagnostics(budgets: readonly TranslationBudget[] = []): TranslationDiagnostics {
    const metrics = [...this.metrics.values()];
    const issues = budgets.flatMap((budget) => {
      const metric = this.metrics.get(budget.metricToken);
      return metric !== undefined && metric.value > budget.threshold ? [`${budget.metricToken} exceeded budget.`] : [];
    });
    return { issues, metrics, checkedAt: new Date().toISOString() as Timestamp };
  }
}
