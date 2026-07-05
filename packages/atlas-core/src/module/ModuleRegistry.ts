import type { Module } from './Module';

export class ModuleRegistry {
  private readonly modules = new Map<string, Module>();

  public register(module: Module): void {
    this.modules.set(module.name, module);
  }

  public list(): readonly Module[] {
    return [...this.modules.values()];
  }
}
