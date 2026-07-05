export interface PluginMetadata {
  readonly displayName: string;
  readonly description?: string | undefined;
  readonly version: string;
  readonly author?: string | undefined;
  readonly license?: string | undefined;
  readonly homepage?: string | undefined;
  readonly repository?: string | undefined;
  readonly keywords?: readonly string[] | undefined;
}
