import type { Event } from '../event';

export interface CompositeEvent extends Event {
  readonly events: readonly Event[];
}
