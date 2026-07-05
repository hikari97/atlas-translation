export interface RuntimeCoreConfiguration {
  readonly environment: 'development' | 'staging' | 'production' | 'test' | 'custom';
  readonly startupTimeout: number;
  readonly shutdownTimeout: number;
  readonly attributes: Readonly<Record<string, string>>;
}

export const createRuntimeCoreConfiguration = (
  environment: RuntimeCoreConfiguration['environment'] = 'development',
  startupTimeout = 30_000,
  shutdownTimeout = 30_000,
  attributes: Readonly<Record<string, string>> = {},
): RuntimeCoreConfiguration => ({
  environment,
  startupTimeout,
  shutdownTimeout,
  attributes,
});
