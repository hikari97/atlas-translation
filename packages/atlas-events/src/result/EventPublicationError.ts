export interface EventPublicationError {
  readonly code: string;
  readonly message: string;
  readonly cause: string | null;
}
