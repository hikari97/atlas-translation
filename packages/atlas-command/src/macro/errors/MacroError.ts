export class MacroError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'MacroError';
  }
}
