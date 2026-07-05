import type { RenderResult } from '../contracts';
import type { RenderEngine } from '../engine';
import type { RenderTask } from './RenderTask';

export class RenderScheduler {
  private readonly queue: RenderTask[] = [];

  public enqueue(task: RenderTask): void {
    this.queue.push(task);
    this.queue.sort((left, right) => right.priority - left.priority);
  }

  public size(): number {
    return this.queue.length;
  }

  public async flush(engine: RenderEngine): Promise<readonly RenderResult[]> {
    const results: RenderResult[] = [];
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task !== undefined) {
        results.push(await engine.render(task.context));
      }
    }
    return results;
  }
}
