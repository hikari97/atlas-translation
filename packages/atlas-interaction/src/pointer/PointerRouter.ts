import type { PointerEventModel } from './PointerTypes';

export type PointerHandler = (event: PointerEventModel) => void;

export class PointerRouter {
  private readonly handlers: PointerHandler[] = [];

  public subscribe(handler: PointerHandler): void {
    this.handlers.push(handler);
  }

  public route(event: PointerEventModel): void {
    for (const handler of this.handlers) {
      handler(event);
    }
  }
}
