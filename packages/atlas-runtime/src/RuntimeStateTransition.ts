import type { RuntimeStateType } from './RuntimeStateType';

export interface RuntimeStateTransition {
  readonly from: RuntimeStateType;
  readonly to: RuntimeStateType;
  readonly occurredAt: Date;
  readonly reason: string | undefined;
}

export const createRuntimeStateTransition = (
  from: RuntimeStateType,
  to: RuntimeStateType,
  occurredAt: Date = new Date(),
  reason: string | undefined = undefined,
): RuntimeStateTransition => ({ from, to, occurredAt, reason });
