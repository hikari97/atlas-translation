export interface IdentifierGenerator {
  next(prefix: string): string;
}
