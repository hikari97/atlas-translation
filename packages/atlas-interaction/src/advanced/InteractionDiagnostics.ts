import type { InteractionState } from '../foundation';

export interface InteractionDiagnosticReport {
  readonly interactionCount: number;
  readonly activeCount: number;
  readonly generatedAt: string;
}

export class InteractionDiagnostics {
  public report(states: readonly InteractionState[]): InteractionDiagnosticReport {
    return {
      interactionCount: states.length,
      activeCount: states.filter((state) => state.phase !== 'completed' && state.phase !== 'cancelled').length,
      generatedAt: new Date().toISOString()
    };
  }
}
