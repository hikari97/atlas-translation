import type { RuntimeDiagnosticCheck } from './RuntimeDiagnosticCheck';
import type { RuntimeDiagnosticReport } from './RuntimeDiagnosticReport';
import type { RuntimeDiagnosticStatus } from './RuntimeDiagnosticStatus';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeDiagnostics {
  readonly checks: readonly RuntimeDiagnosticCheck[];
  readonly metadata: RuntimeEventPayload;
  run(): Promise<RuntimeDiagnosticReport>;
}

const diagnosticStatusRank: Readonly<Record<RuntimeDiagnosticStatus, number>> = {
  healthy: 0,
  degraded: 1,
  unhealthy: 2,
  unknown: 3,
};

const selectDiagnosticStatus = (statuses: readonly RuntimeDiagnosticStatus[]): RuntimeDiagnosticStatus =>
  statuses.reduce<RuntimeDiagnosticStatus>(
    (selected, status) => (diagnosticStatusRank[status] > diagnosticStatusRank[selected] ? status : selected),
    'healthy',
  );

export const createRuntimeDiagnostics = (
  checks: readonly RuntimeDiagnosticCheck[],
  metadata: RuntimeEventPayload,
): RuntimeDiagnostics => ({
  checks,
  metadata,
  async run() {
    const results = await Promise.all(checks.map((check) => check.run()));
    return {
      status: selectDiagnosticStatus(results.map((result) => result.status)),
      checks: results,
      generatedAt: new Date(),
      metadata,
    };
  },
});
