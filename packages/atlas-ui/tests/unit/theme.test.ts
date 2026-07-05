import { DEFAULT_UI_TOKENS, UIThemeManager } from '@atlas/atlas-ui';

const themeManager = new UIThemeManager();
themeManager.register({
  id: 'atlas.test.theme',
  name: 'Test Theme',
  tokens: DEFAULT_UI_TOKENS
});

const activeTheme = themeManager.use('atlas.test.theme');
const activeThemeName: string = activeTheme.name;

export { activeThemeName };
