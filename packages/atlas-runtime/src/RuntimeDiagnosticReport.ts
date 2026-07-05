import type { RuntimeDiagnosticCheckResult } from './RuntimeDiagnosticCheck';
import type { RuntimeDiagnosticStatus } from './RuntimeDiagnosticStatus';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeDiagnosticReport {
  readonly status: RuntimeDiagnosticStatus;
  readonly checks: readonly RuntimeDiagnosticCheckResult[];
  readonly generatedAt: Date;
  readonly metadata: RuntimeEventPayload;
}
