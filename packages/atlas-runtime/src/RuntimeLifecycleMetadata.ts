export interface RuntimeLifecycleMetadata {
  readonly startedAt: Date | undefined;
  readonly stoppedAt: Date | undefined;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeLifecycleMetadata = (
  startedAt: Date | undefined = undefined,
  stoppedAt: Date | undefined = undefined,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeLifecycleMetadata => ({ startedAt, stoppedAt, attributes });
