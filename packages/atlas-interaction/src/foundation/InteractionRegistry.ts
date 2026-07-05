import type { InteractionId, InteractionState } from './InteractionTypes';

export class InteractionRegistry {
  private readonly interactions = new Map<InteractionId, InteractionState>();

  public register(state: InteractionState): void {
    this.interactions.set(state.id, state);
  }

  public get(id: InteractionId): InteractionState | undefined {
    return this.interactions.get(id);
  }

  public list(): readonly InteractionState[] {
    return [...this.interactions.values()];
  }

  public clear(): void {
    this.interactions.clear();
  }
}
