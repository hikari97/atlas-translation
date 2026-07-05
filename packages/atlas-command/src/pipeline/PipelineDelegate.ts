import type { CommandResult } from '../result';

/**
 * Final or next delegate in a behavior chain.
 */
export type PipelineDelegate<TResult = unknown> = () => Promise<CommandResult<TResult>>;
