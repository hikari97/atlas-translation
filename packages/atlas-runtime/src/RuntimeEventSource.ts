export interface RuntimeEventSource {
  readonly id: string;
  readonly type: 'runtime' | 'service' | 'module' | 'hook' | 'pipeline' | 'registry' | 'custom';
  readonly name: string | undefined;
}
