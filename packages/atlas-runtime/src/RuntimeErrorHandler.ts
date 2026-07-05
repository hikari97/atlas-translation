import type { RuntimeError } from './RuntimeError';
import type { RuntimeErrorHandlingResult } from './RuntimeErrorHandlingResult';
import type { RuntimeEventPayload } from './RuntimeEventPayload';

export interface RuntimeErrorHandler {
  readonly metadata: RuntimeEventPayload;
  handle(error: RuntimeError): Promise<RuntimeErrorHandlingResult>;
}

export const createRuntimeErrorHandler = (
  metadata: RuntimeEventPayload,
  handle: (error: RuntimeError) => Promise<RuntimeErrorHandlingResult>,
): RuntimeErrorHandler => ({
  metadata,
  handle,
});
