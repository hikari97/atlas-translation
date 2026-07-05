export interface BenchmarkScenario {
  readonly name: string;
  readonly iterations: number;
}

export const benchmarkScenarios: readonly BenchmarkScenario[] = [
  { name: 'command-dispatch', iterations: 1000 },
  { name: 'pipeline', iterations: 1000 },
  { name: 'resolver', iterations: 1000 },
  { name: 'history', iterations: 1000 },
  { name: 'undo-redo', iterations: 1000 },
  { name: 'composite', iterations: 1000 },
  { name: 'macro', iterations: 1000 }
];
