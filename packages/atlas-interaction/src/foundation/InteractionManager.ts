import type { InteractionContext, InteractionId, InteractionSession, InteractionState } from './InteractionTypes';
import { InteractionPhase, createInteractionState, type InteractionType } from './InteractionTypes';
import { InteractionRegistry } from './InteractionRegistry';

export class InteractionManager {
  public constructor(private readonly registry = new InteractionRegistry()) {}

  public start(id: InteractionId, type: InteractionType, context: InteractionContext = { runtime: null }): InteractionSession {
    const state = createInteractionState(id, type, InteractionPhase.Started);
    this.registry.register(state);
    return {
      id: `${String(id)}:session` as InteractionSession['id'],
      state,
      context
    };
  }

  public update(id: InteractionId): InteractionSession | undefined {
    const current = this.registry.get(id);
    if (current === undefined) {
      return undefined;
    }
    const state = { ...current, phase: InteractionPhase.Updated, updatedAt: new Date().toISOString() as typeof current.updatedAt };
    this.registry.register(state);
    return {
      id: `${String(id)}:session` as InteractionSession['id'],
      state,
      context: { runtime: null }
    };
  }

  public complete(id: InteractionId): InteractionState | undefined {
    const current = this.registry.get(id);
    if (current === undefined) {
      return undefined;
    }
    const state = { ...current, phase: InteractionPhase.Completed, updatedAt: new Date().toISOString() as typeof current.updatedAt };
    this.registry.register(state);
    return state;
  }

  public list(): readonly InteractionState[] {
    return this.registry.list();
  }
}
