import type { AuthenticationContract } from './interface';
import type { AuthenticationLifecycle } from './lifecycle';
import type { AuthenticationMetadata } from './metadata';
import type { AuthenticationRegistryEntry } from './shared';

export interface AuthenticationIdentifier {
  readonly id: string;
  readonly name: string;
}

export interface AuthenticationDescriptor extends AuthenticationIdentifier {
  readonly scheme: string;
  readonly enabled: boolean;
  readonly attributes: Readonly<Record<string, string | number | boolean | null>>;
}

export interface AuthenticationRegistryMetadata extends AuthenticationMetadata {}

export interface AuthenticationRegistryLifecycle extends AuthenticationLifecycle {}

export interface AuthenticationRegistry {
  has(id: string): boolean;
  get(id: string): AuthenticationRegistryEntry<AuthenticationContract> | undefined;
  register(descriptor: AuthenticationDescriptor): void;
  register(entry: AuthenticationRegistryEntry<AuthenticationContract>): void;
  unregister(id: string): void;
  clear(): void;
  resolve(id: string): AuthenticationDescriptor | undefined;
  entries(): readonly AuthenticationDescriptor[];
  registerAuthentication(entry: AuthenticationRegistryEntry<AuthenticationContract>, descriptor: AuthenticationDescriptor): void;
  descriptors(): readonly AuthenticationDescriptor[];
}

export class DefaultAuthenticationRegistry implements AuthenticationRegistry {
  private readonly strategyValues = new Map<string, AuthenticationRegistryEntry<AuthenticationContract>>();

  private readonly descriptorValues = new Map<string, AuthenticationDescriptor>();

  public has(id: string): boolean {
    return this.descriptorValues.has(id) || this.strategyValues.has(id);
  }

  public get(id: string): AuthenticationRegistryEntry<AuthenticationContract> | undefined {
    return this.strategyValues.get(id);
  }

  public register(descriptor: AuthenticationDescriptor): void;

  public register(entry: AuthenticationRegistryEntry<AuthenticationContract>): void;

  public register(entryOrDescriptor: AuthenticationDescriptor | AuthenticationRegistryEntry<AuthenticationContract>): void {
    if ('value' in entryOrDescriptor) {
      this.strategyValues.set(entryOrDescriptor.id, entryOrDescriptor);
      return;
    }
    this.descriptorValues.set(entryOrDescriptor.id, entryOrDescriptor);
  }

  public registerAuthentication(entry: AuthenticationRegistryEntry<AuthenticationContract>, descriptor: AuthenticationDescriptor): void {
    this.strategyValues.set(entry.id, entry);
    this.descriptorValues.set(descriptor.id, descriptor);
  }

  public unregister(id: string): void {
    this.strategyValues.delete(id);
    this.descriptorValues.delete(id);
  }

  public clear(): void {
    this.strategyValues.clear();
    this.descriptorValues.clear();
  }

  public resolve(id: string): AuthenticationDescriptor | undefined {
    return this.descriptorValues.get(id);
  }

  public entries(): readonly AuthenticationDescriptor[] {
    return Array.from(this.descriptorValues.values());
  }

  public descriptors(): readonly AuthenticationDescriptor[] {
    return this.entries();
  }
}

export const createAuthenticationRegistry = (): AuthenticationRegistry => new DefaultAuthenticationRegistry();
