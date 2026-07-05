import type { Timestamp } from '@atlas/atlas-types';

export interface Clock {
  now(): Timestamp;
}
