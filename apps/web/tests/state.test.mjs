import test from 'node:test';
import assert from 'node:assert';

// Mock state creator representing the appStore logic
const createAppStoreMock = () => {
  let state = { sidebarOpen: true, themeMode: 'light' };
  return {
    getState: () => state,
    toggleSidebar: () => { state = { ...state, sidebarOpen: !state.sidebarOpen }; },
    setThemeMode: (mode) => { state = { ...state, themeMode: mode }; }
  };
};

test('appStore mock initial values and updates', () => {
  const store = createAppStoreMock();
  assert.strictEqual(store.getState().sidebarOpen, true);
  assert.strictEqual(store.getState().themeMode, 'light');
  
  store.toggleSidebar();
  assert.strictEqual(store.getState().sidebarOpen, false);
  
  store.setThemeMode('dark');
  assert.strictEqual(store.getState().themeMode, 'dark');
});

// Mock workspace state creator
const createWorkspaceStoreMock = () => {
  return {
    activeId: '1',
    list: [
      { id: '1', name: 'Personal Workspace', role: 'Owner' },
      { id: '2', name: 'Manga Translation Team', role: 'Editor' },
    ]
  };
};

test('workspaceStore mock list mapping', () => {
  const store = createWorkspaceStoreMock();
  assert.strictEqual(store.activeId, '1');
  assert.strictEqual(store.list.length, 2);
  assert.strictEqual(store.list[0].name, 'Personal Workspace');
});
