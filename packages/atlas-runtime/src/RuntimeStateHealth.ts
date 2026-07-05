export type RuntimeStateHealth =
  | 'healthy'
  | 'degraded'
  | 'unhealthy'
  | 'unknown';

export interface RuntimeStateHealthReport {
  readonly health: RuntimeStateHealth;
  readonly message: string | undefined;
  readonly checkedAt: Date;
}

export const createRuntimeStateHealthReport = (
  health: RuntimeStateHealth,
  message: string | undefined = undefined,
  checkedAt: Date = new Date(),
): RuntimeStateHealthReport => ({ health, message, checkedAt });
