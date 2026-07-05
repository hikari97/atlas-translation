import type { Clock } from './Clock';
import type { IdentifierGenerator } from './IdentifierGenerator';
import type { Logger } from './Logger';

export interface DeveloperToolkit {
  readonly logger: Logger;
  readonly clock: Clock;
  readonly ids: IdentifierGenerator;
}
