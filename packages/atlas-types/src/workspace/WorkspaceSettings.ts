import type { ID, JsonObject } from '../common';
import type { LanguageDirection, ThemeMode } from '../enums';

/**
 * Shared workspace preferences and defaults.
 */
export interface WorkspaceSettings {
  readonly defaultSourceLanguage: string;
  readonly defaultTargetLanguage: string;
  readonly languageDirection: LanguageDirection;
  readonly themeMode: ThemeMode;
  readonly autosaveEnabled: boolean;
  readonly cloudSyncEnabled: boolean;
  readonly pluginIds: readonly ID<'plugin'>[];
  readonly custom?: JsonObject;
}
