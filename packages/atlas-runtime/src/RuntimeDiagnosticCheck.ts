import type { RuntimeDiagnosticSeverity } from './RuntimeDiagnosticSeverity';
import type { RuntimeDiagnosticStatus } from './RuntimeDiagnosticStatus';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeDiagnosticCheckResult {
  readonly status: RuntimeDiagnosticStatus;
  readonly severity: RuntimeDiagnosticSeverity;
  readonly message: string;
  readonly checkedAt: Date;
  readonly metadata: RuntimeEventPayload;
}

export interface RuntimeDiagnosticCheck {
  readonly id: string;
  readonly name: string;
  readonly severity: RuntimeDiagnosticSeverity;
  readonly metadata: RuntimeEventPayload;
  run(): Promise<RuntimeDiagnosticCheckResult>;
}
