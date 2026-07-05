// Atlas Scheduler System - Provider-independent scheduling contracts.

export type SchedulerDiagnosticSeverity = 'info' | 'warning' | 'error';
export type SchedulerJobStatus = 'scheduled' | 'running' | 'completed' | 'failed' | 'cancelled';

export interface SchedulerDiagnostic { readonly code: string; readonly message: string; readonly severity: SchedulerDiagnosticSeverity; }

export interface ScheduleDefinition {
  readonly id: string;
  readonly name: string;
  readonly cronExpression: string;
  readonly timezone: string;
  readonly enabled: boolean;
  readonly payload: unknown;
  readonly priority: number;
}
export const createScheduleDefinition = (id: string, name: string, cronExpression: string, options: { timezone?: string; enabled?: boolean; payload?: unknown; priority?: number } = {}): ScheduleDefinition => ({ id, name, cronExpression, timezone: options.timezone ?? 'UTC', enabled: options.enabled ?? true, payload: options.payload, priority: options.priority ?? 0 });

export interface CronValidationResult { readonly valid: boolean; readonly error: string | undefined; }
export const validateCronExpression = (expression: string): CronValidationResult => {
  if (!expression) return { valid: false, error: 'Expression is empty.' };
  const parts = expression.split(/\s+/);
  if (parts.length < 5 || parts.length > 6) return { valid: false, error: 'Expression must have 5 or 6 fields.' };
  return { valid: true, error: undefined };
};

export interface Clock { now(): Date; }
export const systemClock: Clock = { now: () => new Date() };

export interface TriggerCalculator { nextRun(schedule: ScheduleDefinition, from: Date): Date | undefined; }
export const createTriggerCalculator = (): TriggerCalculator => ({
  nextRun(schedule: ScheduleDefinition, from: Date): Date | undefined {
    if (!schedule.enabled) return undefined;
    return new Date(from.getTime() + 60_000);
  },
});

export interface SchedulerJob { readonly id: string; readonly scheduleId: string; readonly status: SchedulerJobStatus; readonly scheduledAt: Date; readonly startedAt: Date | undefined; readonly completedAt: Date | undefined; }
export const createSchedulerJob = (id: string, scheduleId: string, scheduledAt: Date): SchedulerJob => ({ id, scheduleId, status: 'scheduled', scheduledAt, startedAt: undefined, completedAt: undefined });

export interface JobRegistry { register(job: SchedulerJob): void; resolve(jobId: string): SchedulerJob | undefined; list(): readonly SchedulerJob[]; }
export class InMemoryJobRegistry implements JobRegistry {
  private readonly jobs = new Map<string, SchedulerJob>();
  public register(job: SchedulerJob): void { this.jobs.set(job.id, job); }
  public resolve(jobId: string): SchedulerJob | undefined { return this.jobs.get(jobId); }
  public list(): readonly SchedulerJob[] { return Array.from(this.jobs.values()); }
}
export const createJobRegistry = (): JobRegistry => new InMemoryJobRegistry();

export interface SchedulerEngine { start(): void; stop(): void; readonly running: boolean; }

export interface LockLease { readonly key: string; readonly holder: string; readonly acquiredAt: Date; readonly expiresAt: Date; }
export const createLockLease = (key: string, holder: string, ttl: number): LockLease => ({ key, holder, acquiredAt: new Date(), expiresAt: new Date(Date.now() + ttl) });

export interface MissedRunPolicy { readonly strategy: 'skip' | 'run-once' | 'run-all'; readonly maxCatchUp: number; }
export const createMissedRunPolicy = (strategy: 'skip' | 'run-once' | 'run-all' = 'skip', maxCatchUp = 1): MissedRunPolicy => ({ strategy, maxCatchUp });

export interface QueueIntegrationBinding { readonly scheduleId: string; readonly queue: string; }
export const createSchedulerQueueIntegration = (scheduleId: string, queue: string): QueueIntegrationBinding => ({ scheduleId, queue });

export interface WorkerIntegrationBinding { readonly scheduleId: string; readonly workerId: string; }
export const createSchedulerWorkerIntegration = (scheduleId: string, workerId: string): WorkerIntegrationBinding => ({ scheduleId, workerId });

export interface SchedulerConfigBinding { readonly configKey: string; readonly required: boolean; }
export const createSchedulerConfigBinding = (configKey: string, required = true): SchedulerConfigBinding => ({ configKey, required });

export const createSchedulerDiagnostic = (code: string, message: string, severity: SchedulerDiagnosticSeverity = 'info'): SchedulerDiagnostic => ({ code, message, severity });
