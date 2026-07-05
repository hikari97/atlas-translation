import { DEFAULT_UI_TOKENS } from './UITokens';
import type { UITheme } from './UITheme';

export class UIThemeManager {
  private currentTheme: UITheme;
  private readonly themes = new Map<string, UITheme>();

  public constructor(initialTheme: UITheme = { id: 'atlas.default', name: 'Atlas Default', tokens: DEFAULT_UI_TOKENS }) {
    this.currentTheme = initialTheme;
    this.themes.set(initialTheme.id, initialTheme);
  }

  public register(theme: UITheme): void {
    this.themes.set(theme.id, theme);
  }

  public use(themeId: string): UITheme {
    const theme = this.themes.get(themeId);
    if (theme === undefined) {
      throw new Error(`UI theme is not registered: ${themeId}`);
    }
    this.currentTheme = theme;
    return theme;
  }

  public current(): UITheme {
    return this.currentTheme;
  }

  public list(): readonly UITheme[] {
    return [...this.themes.values()];
  }
}
