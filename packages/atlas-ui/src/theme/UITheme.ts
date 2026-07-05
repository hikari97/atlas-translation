import type { UITokens } from './UITokens';

export interface UITheme {
  readonly id: string;
  readonly name: string;
  readonly tokens: UITokens;
}
