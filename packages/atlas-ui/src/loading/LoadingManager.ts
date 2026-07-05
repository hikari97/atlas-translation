import { LoadingState, type LoadingDescriptor } from './LoadingState';

export class LoadingManager {
  private readonly states = new Map<string, LoadingDescriptor>();

  public set(id: string, state: LoadingState, message: string): void {
    this.states.set(id, { id, state, message });
  }

  public get(id: string): LoadingDescriptor {
    return this.states.get(id) ?? { id, state: LoadingState.Idle, message: '' };
  }

  public list(): readonly LoadingDescriptor[] {
    return [...this.states.values()];
  }
}
