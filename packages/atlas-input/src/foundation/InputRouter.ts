import type { InputEventModel } from './InputModel';

export type InputHandler = (event: InputEventModel) => void;

export class InputRouter {
  private readonly handlers = new Map<string, InputHandler[]>();

  public on(type: string, handler: InputHandler): void {
    const handlers = this.handlers.get(type) ?? [];
    handlers.push(handler);
    this.handlers.set(type, handlers);
  }

  public route(event: InputEventModel): void {
    for (const handler of this.handlers.get(event.type) ?? []) {
      handler(event);
    }
  }
}
