import type { HttpEndpoint } from '@atlas/atlas-http';
import type { RouteMetadata } from './metadata';
import type { RouteMatchResult } from './matcher';
import type { Route } from './route';
import type { RouterLifecycleRecord } from './shared';

export interface RouteCandidate {
  readonly route: Route;
  readonly score: number;
  readonly order: number;
  readonly match: RouteMatchResult;
}

export type RouteResolutionPolicy = 'exact' | 'highest-score' | 'static-priority' | 'registration-order' | 'custom';

export interface RouteResolution {
  readonly resolved: boolean;
  readonly route: Route | undefined;
  readonly endpoint: HttpEndpoint | undefined;
  readonly candidate: RouteCandidate | undefined;
  readonly policy: RouteResolutionPolicy;
}

export interface RouteResolverMetadata extends RouteMetadata {}

export interface RouteResolverLifecycle extends RouterLifecycleRecord<'created' | 'active' | 'disposed'> {}

export interface RouteResolver {
  readonly metadata: RouteResolverMetadata;
  readonly lifecycle: RouteResolverLifecycle;
  readonly policy: RouteResolutionPolicy;
  resolve(matches: readonly RouteMatchResult[]): RouteResolution;
}

export const createRouteCandidates = (matches: readonly RouteMatchResult[]): readonly RouteCandidate[] =>
  matches
    .filter((result): result is RouteMatchResult & { readonly match: NonNullable<RouteMatchResult['match']> } => result.matched && result.match !== undefined)
    .map((result, order) => ({
      route: result.match.route,
      score: result.match.score,
      order,
      match: result,
    }));

export class HighestScoreRouteResolver implements RouteResolver {
  public readonly lifecycle: RouteResolverLifecycle;

  public readonly policy: RouteResolutionPolicy = 'highest-score';

  public constructor(public readonly metadata: RouteResolverMetadata, now: Date = new Date()) {
    this.lifecycle = {
      state: 'active',
      transitions: ['created', 'active'],
      createdAt: now,
      updatedAt: now,
    };
  }

  public resolve(matches: readonly RouteMatchResult[]): RouteResolution {
    const candidates = createRouteCandidates(matches);
    const candidate = [...candidates].sort((left, right) => right.score - left.score || left.order - right.order)[0];
    return {
      resolved: candidate !== undefined,
      route: candidate?.route,
      endpoint: candidate?.route.endpoint,
      candidate,
      policy: this.policy,
    };
  }
}
