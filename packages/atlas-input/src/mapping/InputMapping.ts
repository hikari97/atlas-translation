import type { JsonObject } from '@atlas/atlas-types';

export interface InputMapping {
  readonly inputType: string;
  readonly action: string;
}

export interface InputProfile {
  readonly id: string;
  readonly mappings: readonly InputMapping[];
}

export interface DeviceMapping {
  readonly deviceId: string;
  readonly profileId: string;
}

export interface InputConfiguration {
  readonly activeProfileId: string;
  readonly metadata?: JsonObject | undefined;
}

export function resolveAction(mappings: readonly InputMapping[], inputType: string): string | undefined {
  return mappings.find((mapping) => mapping.inputType === inputType)?.action;
}
