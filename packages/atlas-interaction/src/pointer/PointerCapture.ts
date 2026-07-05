export class PointerCapture {
  private capturedPointerId: string | null = null;

  public capture(pointerId: string): void {
    this.capturedPointerId = pointerId;
  }

  public release(pointerId: string): boolean {
    if (this.capturedPointerId !== pointerId) {
      return false;
    }
    this.capturedPointerId = null;
    return true;
  }

  public current(): string | null {
    return this.capturedPointerId;
  }
}
