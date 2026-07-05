import type { Environment } from './Environment';

export interface EnvironmentContext {
  readonly environment: Environment;
  readonly debug: boolean;
}
