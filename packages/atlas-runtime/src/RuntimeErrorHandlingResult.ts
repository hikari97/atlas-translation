import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeRecoveryHint {
  readonly action: string;
  readonly description: string | undefined;
  readonly automatic: boolean;
}

export interface RuntimeErrorHandlingResult {
  readonly handled: boolean;
  readonly recoverable: boolean;
  readonly hints: readonly RuntimeRecoveryHint[];
  readonly metadata: RuntimeEventPayload;
}
