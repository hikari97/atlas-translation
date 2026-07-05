export interface NormalizedError {
  readonly code: string;
  readonly message: string;
  readonly details?: unknown;
}

export const normalizeError = (error: unknown): NormalizedError => {
  if (error instanceof Error) {
    return { code: 'CLIENT_ERROR', message: error.message };
  }
  if (typeof error === 'object' && error !== null) {
    const err = error as Record<string, unknown>;
    return {
      code: typeof err.code === 'string' ? err.code : 'UNKNOWN_ERROR',
      message: typeof err.message === 'string' ? err.message : 'An unexpected error occurred.',
      details: err.details,
    };
  }
  return { code: 'UNKNOWN_ERROR', message: String(error) };
};
