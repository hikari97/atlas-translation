import { DEFAULT_UI_TOKENS, UIThemeManager } from '@atlas/atlas-ui';

const manager = new UIThemeManager();
const startedAt = Date.now();

for (let index = 0; index < 250; index += 1) {
  manager.register({
    id: `atlas.ui.benchmark.theme.${index}`,
    name: `Theme ${index}`,
    tokens: DEFAULT_UI_TOKENS
  });
}

const themeBenchmark = {
  count: manager.list().length,
  elapsedMs: Date.now() - startedAt
};

export { themeBenchmark };
