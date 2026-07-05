import type { Event } from '../event';

export interface EventFilter {
  matches(event: Event): boolean;
}
