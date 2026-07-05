import type { Lifecycle } from '../lifecycle';
import type { ServiceProviderModule } from '../provider';

export interface Module extends Lifecycle, ServiceProviderModule {
  readonly name: string;
}
