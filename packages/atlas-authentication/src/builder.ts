import type { AuthenticationContract } from './interface';
import type { AuthenticationCredential } from './credential';
import type { AuthenticationFactory } from './factory';
import type { AuthenticationLifecycle } from './lifecycle';
import { DefaultAuthenticationLifecycle } from './lifecycle';
import type { AuthenticationMetadata } from './metadata';
import { DefaultAuthenticationMetadata } from './metadata';
import type { AuthenticationDescriptor } from './registry';

export interface AuthenticationDefinition {
  readonly descriptor: AuthenticationDescriptor;
  readonly strategy: AuthenticationContract;
}

export interface AuthenticationBuilderState {
  readonly definitions: readonly AuthenticationDefinition[];
  readonly currentScheme: string | undefined;
  readonly currentCredential: AuthenticationCredential | undefined;
}

export interface AuthenticationBuilderContext {
  readonly metadata: AuthenticationMetadata;
  readonly lifecycle: AuthenticationLifecycle;
}

export interface AuthenticationBuilder {
  scheme(name: string): this;
  strategy(strategy: AuthenticationFactory): this;
  credential(credential: AuthenticationCredential): this;
  when(condition: boolean, configure: (builder: AuthenticationBuilder) => void): this;
  authentication(descriptor: AuthenticationDescriptor, strategy: AuthenticationContract): this;
  build(): readonly AuthenticationDefinition[];
  buildResult(): { readonly definitions: readonly AuthenticationDefinition[]; readonly state: AuthenticationBuilderState; readonly context: AuthenticationBuilderContext };
}

export class DefaultAuthenticationBuilder implements AuthenticationBuilder {
  private readonly definitions: AuthenticationDefinition[] = [];

  private currentScheme: string | undefined;

  private currentCredential: AuthenticationCredential | undefined;

  private currentFactory: AuthenticationFactory | undefined;

  public constructor(
    private readonly metadata: AuthenticationMetadata = new DefaultAuthenticationMetadata('authentication-builder', 'Authentication Builder', '0.1.0'),
    private readonly lifecycle: AuthenticationLifecycle = new DefaultAuthenticationLifecycle(),
  ) {}

  public scheme(name: string): this {
    this.currentScheme = name;
    return this;
  }

  public strategy(strategy: AuthenticationFactory): this {
    this.currentFactory = strategy;
    return this;
  }

  public credential(credential: AuthenticationCredential): this {
    this.currentCredential = credential;
    return this;
  }

  public when(condition: boolean, configure: (builder: AuthenticationBuilder) => void): this {
    if (condition) configure(this);
    return this;
  }

  public authentication(descriptor: AuthenticationDescriptor, strategy: AuthenticationContract): this {
    this.definitions.push({ descriptor, strategy });
    return this;
  }

  public build(): readonly AuthenticationDefinition[] {
    if (this.currentScheme !== undefined && this.currentFactory !== undefined) {
      const descriptor: AuthenticationDescriptor = {
        id: this.currentScheme,
        name: this.currentScheme,
        scheme: this.currentScheme,
        enabled: true,
        attributes: {},
      };
      const strategy = this.currentFactory.create(descriptor);
      if (strategy !== undefined && this.definitions.every((definition) => definition.descriptor.id !== descriptor.id)) {
        this.definitions.push({ descriptor, strategy });
      }
    }
    this.lifecycle.transition('authenticated');
    return [...this.definitions];
  }

  public buildResult() {
    const definitions = this.build();
    return {
      definitions,
      state: { definitions, currentScheme: this.currentScheme, currentCredential: this.currentCredential },
      context: { metadata: this.metadata, lifecycle: this.lifecycle },
    };
  }
}

export interface AuthenticationBuilderFactory {
  create(): AuthenticationBuilder;
}

export const createAuthenticationBuilderFactory = (): AuthenticationBuilderFactory => ({
  create: () => new DefaultAuthenticationBuilder(),
});
