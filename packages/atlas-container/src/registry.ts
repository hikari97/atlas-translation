import { ContainerDuplicateRegistrationError } from './errors';
import { tokenLabel } from './token';
import type { ContainerRegisterOptions, ContainerRegistration, ContainerRegistrationMetadata, ContainerToken } from './types';

export class ContainerRegistry {
  private readonly registrations = new Map<symbol, ContainerRegistration<unknown>>();

  public register<TService>(
    token: ContainerToken<TService>,
    registration: Omit<ContainerRegistration<TService>, 'token'>,
    options: ContainerRegisterOptions = {},
  ): ContainerRegistration<TService> {
    if (this.registrations.has(token.id) && options.override !== true) {
      throw new ContainerDuplicateRegistrationError(token);
    }
    const next: ContainerRegistration<TService> = { token, ...registration };
    this.registrations.set(token.id, next as ContainerRegistration<unknown>);
    return next;
  }

  public has(token: ContainerToken<unknown>): boolean {
    return this.registrations.has(token.id);
  }

  public get<TService>(token: ContainerToken<TService>): ContainerRegistration<TService> | undefined {
    const registration = this.registrations.get(token.id);
    return registration as ContainerRegistration<TService> | undefined;
  }

  public list(): readonly ContainerRegistration<unknown>[] {
    return [...this.registrations.values()];
  }
}

export const createRegistrationMetadata = (options: ContainerRegisterOptions = {}): ContainerRegistrationMetadata => ({
  label: options.label,
  source: options.source,
  tags: options.tags ?? [],
});

export const registrationLabel = (registration: ContainerRegistration<unknown>): string =>
  registration.metadata.label ?? tokenLabel(registration.token);
