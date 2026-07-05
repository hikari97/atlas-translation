import type { JsonObject } from '../common';
import type { ThemeMode } from '../enums';

/**
 * User-facing preferences that shape the editor experience.
 */
export interface EditorPreferences {
  readonly theme: ThemeMode;
  readonly showGrid: boolean;
  readonly showRulers: boolean;
  readonly showGuides: boolean;
  readonly snapEnabled: boolean;
  readonly locale: string;
  readonly custom?: JsonObject;
}
