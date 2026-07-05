import type { RuntimeContext } from '../context';

export interface Lifecycle {
  start(context: RuntimeContext): Promise<void>;
  stop(context: RuntimeContext): Promise<void>;
}
