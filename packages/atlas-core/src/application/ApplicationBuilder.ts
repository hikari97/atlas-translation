import type { ID, Timestamp } from '@atlas/atlas-types';
import { DependencyResolver } from '../di';
import { RuntimeKernel } from '../kernel';
import { ModuleRegistry, type Module } from '../module';
import { DefaultServiceRegistry } from '../registry';
import { Application } from './Application';

export class ApplicationBuilder {
  private readonly services = new DefaultServiceRegistry();
  private readonly modules = new ModuleRegistry();

  public addModule(module: Module): this {
    module.registerServices(this.services);
    this.modules.register(module);
    return this;
  }

  public build(name: string, id: ID<'runtime-context'>, startedAt: Timestamp): Application {
    const resolver = new DependencyResolver(this.services);
    const kernel = new RuntimeKernel(this.modules);
    return new Application(name, kernel, {
      id,
      startedAt,
      services: resolver
    });
  }
}
