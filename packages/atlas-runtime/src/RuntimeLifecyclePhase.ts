export type RuntimeLifecyclePhase =
  | 'created'
  | 'initializing'
  | 'configured'
  | 'starting'
  | 'running'
  | 'stopping'
  | 'stopped'
  | 'failed';
