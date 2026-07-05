// Atlas Worker System - Provider-independent worker contracts.

export type WorkerDiagnosticSeverity = 'info' | 'warning' | 'error';
export type WorkerStatus = 'idle' | 'running' | 'paused' | 'stopped' | 'failed';
export type WorkerExecutionStatus = 'success' | 'error' | 'timeout' | 'cancelled';

export interface WorkerDiagnostic { readonly code: string; readonly message: string; readonly severity: WorkerDiagnosticSeverity; }

export interface WorkerContext {
  readonly workerId: string;
  readonly jobId: string;
  readonly attributes: ReadonlyMap<string, unknown>;
  get<T>(key: string): T | undefined;
}
export class InMemoryWorkerContext implements WorkerContext {
  private readonly values: Map<string, unknown>;
  public constructor(public readonly workerId: string, public readonly jobId: string, entries: ReadonlyArray<readonly [string, unknown]> = []) { this.values = new Map(entries); }
  public get<T>(key: string): T | undefined { return this.values.get(key) as T | undefined; }
  public get attributes(): ReadonlyMap<string, unknown> { return this.values; }
}
export const createWorkerContext = (workerId: string, jobId: string, entries: ReadonlyArray<readonly [string, unknown]> = []): WorkerContext => new InMemoryWorkerContext(workerId, jobId, entries);

export interface JobHandler<TPayload = unknown> { handle(context: WorkerContext, payload: TPayload): Promise<unknown>; }

export interface WorkerExecutionResult {
  readonly jobId: string;
  readonly status: WorkerExecutionStatus;
  readonly result: unknown;
  readonly error: string | undefined;
  readonly duration: number;
  readonly attempts: number;
}
export const createWorkerExecutionResult = (jobId: string, status: WorkerExecutionStatus, result: unknown = undefined, error: string | undefined = undefined, duration = 0, attempts = 1): WorkerExecutionResult => ({ jobId, status, result, error, duration, attempts });

export interface WorkerExecutor { execute<TPayload = unknown>(handler: JobHandler<TPayload>, context: WorkerContext, payload: TPayload): Promise<WorkerExecutionResult>; }
export const createWorkerExecutor = (): WorkerExecutor => ({
  async execute<TPayload = unknown>(handler: JobHandler<TPayload>, context: WorkerContext, payload: TPayload): Promise<WorkerExecutionResult> {
    const start = Date.now();
    try {
      const result = await handler.handle(context, payload);
      return createWorkerExecutionResult(context.jobId, 'success', result, undefined, Date.now() - start, 1);
    } catch (cause) {
      return createWorkerExecutionResult(context.jobId, 'error', undefined, cause instanceof Error ? cause.message : String(cause), Date.now() - start, 1);
    }
  },
});

export type WorkerLifecyclePhase = 'created' | 'starting' | 'running' | 'paused' | 'stopped';
export interface WorkerLifecycle {
  readonly phase: WorkerLifecyclePhase;
  start(): void;
  pause(): void;
  resume(): void;
  stop(): void;
}
export class DefaultWorkerLifecycle implements WorkerLifecycle {
  private phaseValue: WorkerLifecyclePhase = 'created';
  public get phase(): WorkerLifecyclePhase { return this.phaseValue; }
  public start(): void { if (this.phaseValue !== 'created' && this.phaseValue !== 'stopped') throw new Error('Cannot start from current state.'); this.phaseValue = 'starting'; this.phaseValue = 'running'; }
  public pause(): void { if (this.phaseValue !== 'running') throw new Error('Can only pause running worker.'); this.phaseValue = 'paused'; }
  public resume(): void { if (this.phaseValue !== 'paused') throw new Error('Can only resume paused worker.'); this.phaseValue = 'running'; }
  public stop(): void { this.phaseValue = 'stopped'; }
}
export const createWorkerLifecycle = (): WorkerLifecycle => new DefaultWorkerLifecycle();

export interface ConcurrencyLimiter { acquire(): Promise<void>; release(): void; readonly current: number; readonly max: number; }
export class InMemoryConcurrencyLimiter implements ConcurrencyLimiter {
  private currentValue = 0;
  private readonly waiters: Array<() => void> = [];
  public constructor(public readonly max: number) {}
  public get current(): number { return this.currentValue; }
  public async acquire(): Promise<void> { if (this.currentValue < this.max) { this.currentValue++; return; } await new Promise<void>(resolve => this.waiters.push(resolve)); this.currentValue++; }
  public release(): void { this.currentValue--; const next = this.waiters.shift(); if (next) next(); }
}
export const createConcurrencyLimiter = (max: number): ConcurrencyLimiter => new InMemoryConcurrencyLimiter(max);

export interface RetryBackoff { readonly strategy: 'fixed' | 'exponential' | 'linear'; readonly baseDelay: number; readonly maxDelay: number; compute(attempt: number): number; }
export const createRetryBackoff = (strategy: 'fixed' | 'exponential' | 'linear' = 'exponential', baseDelay = 1000, maxDelay = 30_000): RetryBackoff => ({
  strategy, baseDelay, maxDelay, compute(attempt: number) {
    const raw = strategy === 'fixed' ? baseDelay : strategy === 'linear' ? baseDelay * attempt : baseDelay * 2 ** (attempt - 1);
    return Math.min(raw, maxDelay);
  },
});

export interface CancellationSignal { readonly cancelled: boolean; cancel(): void; }
export const createCancellationSignal = (): CancellationSignal => { let cancelled = false; return { get cancelled() { return cancelled; }, cancel() { cancelled = true; } }; };

export interface Heartbeat { readonly workerId: string; readonly lastBeat: Date; beat(): void; }
export class InMemoryHeartbeat implements Heartbeat {
  private lastBeatValue: Date = new Date();
  public constructor(public readonly workerId: string) {}
  public get lastBeat(): Date { return this.lastBeatValue; }
  public beat(): void { this.lastBeatValue = new Date(); }
}
export const createHeartbeat = (workerId: string): Heartbeat => new InMemoryHeartbeat(workerId);

export interface SupervisionStrategy { readonly maxRestarts: number; readonly restartDelay: number; readonly strategy: 'one-for-one' | 'all-for-one' | 'rest-for-one'; }
export const createSupervisionStrategy = (maxRestarts = 3, restartDelay = 1000, strategy: 'one-for-one' | 'all-for-one' | 'rest-for-one' = 'one-for-one'): SupervisionStrategy => ({ maxRestarts, restartDelay, strategy });

export interface QueueIntegrationBinding { readonly workerId: string; readonly queue: string; }
export const createWorkerQueueIntegration = (workerId: string, queue: string): QueueIntegrationBinding => ({ workerId, queue });

export interface RuntimeIntegrationBinding { readonly workerId: string; readonly runtimeId: string; }
export const createWorkerRuntimeIntegration = (workerId: string, runtimeId: string): RuntimeIntegrationBinding => ({ workerId, runtimeId });

export interface WorkerConfigBinding { readonly configKey: string; readonly required: boolean; }
export const createWorkerConfigBinding = (configKey: string, required = true): WorkerConfigBinding => ({ configKey, required });

export const createWorkerDiagnostic = (code: string, message: string, severity: WorkerDiagnosticSeverity = 'info'): WorkerDiagnostic => ({ code, message, severity });
