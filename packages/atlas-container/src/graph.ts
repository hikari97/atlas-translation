import { ContainerCycleError } from './errors';
import { tokenLabel } from './token';
import type { ContainerToken } from './types';

export class ResolutionGraph {
  private readonly stack: readonly ContainerToken<unknown>[];

  public constructor(stack: readonly ContainerToken<unknown>[] = []) {
    this.stack = stack;
  }

  public enter(token: ContainerToken<unknown>): ResolutionGraph {
    if (this.stack.some((entry) => entry.id === token.id)) {
      throw new ContainerCycleError(token, [...this.labels(), tokenLabel(token)]);
    }
    return new ResolutionGraph([...this.stack, token]);
  }

  public labels(): readonly string[] {
    return this.stack.map(tokenLabel);
  }
}
