import type { EventPublicationResult } from '../result';

export type EventBehaviorDelegate = () => Promise<EventPublicationResult>;
