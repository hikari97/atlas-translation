import type { RuntimeEnvironmentCapability } from './RuntimeEnvironmentCapability';
import type { RuntimeEnvironmentExtension } from './RuntimeEnvironmentExtension';
import type { RuntimeEnvironmentMetadata } from './RuntimeEnvironmentMetadata';
import type { RuntimeEnvironmentPlatform } from './RuntimeEnvironmentPlatform';

export interface RuntimeEnvironment {
  readonly platform: RuntimeEnvironmentPlatform;
  readonly metadata: RuntimeEnvironmentMetadata;
  readonly capabilities: readonly RuntimeEnvironmentCapability[];
  readonly extensions: readonly RuntimeEnvironmentExtension[];
}

export const createRuntimeEnvironment = (
  platform: RuntimeEnvironmentPlatform,
  metadata: RuntimeEnvironmentMetadata,
  capabilities: readonly RuntimeEnvironmentCapability[] = [],
  extensions: readonly RuntimeEnvironmentExtension[] = [],
): RuntimeEnvironment => ({ platform, metadata, capabilities, extensions });
