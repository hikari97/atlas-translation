import {
  formatKeyboardShortcut,
  KeyboardShortcutRegistry,
  LoadingManager,
  LoadingState,
  PanelManager,
  SplitViewOrientation,
  createSplitView
} from '@atlas/atlas-ui';
import type { ID } from '@atlas/atlas-types';

const splitView = createSplitView('atlas.ui.test.split', 'Split View', SplitViewOrientation.Horizontal, ['left', 'right']);
const panels = new PanelManager();
panels.register({ id: 'panel-1' as ID<'ui-panel'>, title: 'Inspector', visible: true });

const shortcuts = new KeyboardShortcutRegistry();
shortcuts.register({ id: 'save', label: 'Save', keys: ['Meta', 'S'] });

const loading = new LoadingManager();
loading.set('render', LoadingState.Loading, 'Rendering');

const splitOrientation = splitView.props.orientation;
const panelCount: number = panels.list().length;
const shortcut = shortcuts.get('save');
if (shortcut === undefined) {
  throw new Error('Expected shortcut to be registered.');
}
const shortcutText: string = formatKeyboardShortcut(shortcut);
const loadingMessage: string = loading.get('render').message;

export { loadingMessage, panelCount, shortcutText, splitOrientation };
