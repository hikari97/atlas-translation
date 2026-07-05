import type { Timestamp } from '@atlas/atlas-types';

export interface EventDiagnostic {
  readonly code: string;
  readonly message: string;
  readonly recordedAt: Timestamp;
}
