export const loadingPolicy = {
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 30 * 60 * 1000, // 30 minutes
  retryLimit: 3,
  shouldRetry: (failureCount: number, error: unknown): boolean => {
    if (failureCount >= 3) return false;
    // Don't retry client-side errors like 404 / 403
    const err = error as { status?: number };
    if (err.status === 404 || err.status === 403 || err.status === 401) {
      return false;
    }
    return true;
  },
};
