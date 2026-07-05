import type { RouteMetadata } from './metadata';
import type { RouteParameters } from './parameters';
import type { Route } from './route';
import type { RouterLifecycleRecord, RouterMutableRegistry } from './shared';
import { InMemoryRouterRegistry } from './shared';

export type RouteConstraintKind = 'numeric' | 'uuid' | 'alpha' | 'alphanumeric' | 'regex' | 'custom';

export interface RouteConstraintMetadata extends RouteMetadata {}

export interface RouteConstraintLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RouteConstraint {
  readonly id: string;
  readonly name: string;
  readonly kind: RouteConstraintKind;
  readonly metadata: RouteConstraintMetadata;
  evaluate(route: Route, parameters: RouteParameters): boolean;
}

export interface RouteConstraintEvaluation {
  readonly constraint: RouteConstraint;
  readonly passed: boolean;
}

export interface RouteConstraintRegistry extends RouterMutableRegistry<RouteConstraint> {}

export interface RouteConstraints {
  readonly registry: RouteConstraintRegistry;
  readonly metadata: RouteConstraintMetadata;
  readonly lifecycle: RouteConstraintLifecycle;
  evaluate(route: Route, parameters: RouteParameters): boolean;
  evaluations(route: Route, parameters: RouteParameters): readonly RouteConstraintEvaluation[];
}

export class DefaultRouteConstraints implements RouteConstraints {
  public readonly registry: RouteConstraintRegistry = new InMemoryRouterRegistry<RouteConstraint>();

  public readonly lifecycle: RouteConstraintLifecycle;

  public constructor(public readonly metadata: RouteConstraintMetadata, constraints: readonly RouteConstraint[] = [], now: Date = new Date()) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
    constraints.forEach((constraint) => this.registry.register({
      id: constraint.id,
      name: constraint.name,
      value: constraint,
    }));
  }

  public evaluate(route: Route, parameters: RouteParameters): boolean {
    return this.evaluations(route, parameters).every((evaluation) => evaluation.passed);
  }

  public evaluations(route: Route, parameters: RouteParameters): readonly RouteConstraintEvaluation[] {
    return this.registry.entries().map((entry) => ({
      constraint: entry.value,
      passed: entry.value.evaluate(route, parameters),
    }));
  }
}

export const createRouteConstraint = (
  id: string,
  name: string,
  kind: RouteConstraintKind,
  metadata: RouteConstraintMetadata,
  evaluate: (route: Route, parameters: RouteParameters) => boolean,
): RouteConstraint => ({
  id,
  name,
  kind,
  metadata,
  evaluate,
});
