export class InvalidMacroError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'InvalidMacroError';
  }
}
