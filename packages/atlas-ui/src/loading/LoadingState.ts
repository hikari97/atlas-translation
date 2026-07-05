export enum LoadingState {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export interface LoadingDescriptor {
  readonly id: string;
  readonly state: LoadingState;
  readonly message: string;
}
