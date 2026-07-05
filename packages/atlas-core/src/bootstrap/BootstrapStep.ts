import type { RuntimeContext } from '../context';

export interface BootstrapStep {
  readonly name: string;
  run(context: RuntimeContext): Promise<void>;
}
