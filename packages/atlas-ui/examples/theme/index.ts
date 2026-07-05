import { DEFAULT_UI_TOKENS, UIThemeManager } from '@atlas/atlas-ui';

const themes = new UIThemeManager();
themes.register({
  id: 'atlas.example.theme',
  name: 'Example Theme',
  tokens: DEFAULT_UI_TOKENS
});

export { themes };
