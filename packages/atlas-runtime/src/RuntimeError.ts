import type { RuntimeErrorCategory } from './RuntimeErrorCategory';
import type { RuntimeErrorContext } from './RuntimeErrorContext';
import type { RuntimeErrorSeverity } from './RuntimeErrorSeverity';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeError {
  readonly id: string;
  readonly category: RuntimeErrorCategory;
  readonly severity: RuntimeErrorSeverity;
  readonly message: string;
  readonly recoverable: boolean;
  readonly context: RuntimeErrorContext;
  readonly occurredAt: Date;
  readonly metadata: RuntimeEventPayload;
}

export const createRuntimeError = (
  id: string,
  category: RuntimeErrorCategory,
  severity: RuntimeErrorSeverity,
  message: string,
  recoverable: boolean,
  context: RuntimeErrorContext,
  occurredAt: Date,
  metadata: RuntimeEventPayload,
): RuntimeError => ({
  id,
  category,
  severity,
  message,
  recoverable,
  context,
  occurredAt,
  metadata,
});
