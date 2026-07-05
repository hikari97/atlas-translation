import type { EventDiagnostic } from './EventDiagnostic';

export class EventDiagnostics {
  private readonly diagnostics: EventDiagnostic[] = [];

  public record(diagnostic: EventDiagnostic): void {
    this.diagnostics.push(diagnostic);
  }

  public list(): readonly EventDiagnostic[] {
    return [...this.diagnostics];
  }
}
