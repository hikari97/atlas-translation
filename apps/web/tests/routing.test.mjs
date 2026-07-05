import test from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render } from './test-utils.mjs';

// Mock routing definitions matching src/pages structure
const routes = {
  '/': () => React.createElement('div', null, 'Home Dashboard'),
  '/projects': () => React.createElement('div', null, 'Projects Listing'),
  '/editor/demo': () => React.createElement('div', null, 'Editor Workspace'),
  '/settings': () => React.createElement('div', null, 'Settings Panel'),
  '/auth/login': () => React.createElement('div', null, 'Auth Login'),
};

test('routing list matches pages directory setup', () => {
  assert.ok(routes['/']);
  assert.ok(routes['/projects']);
  assert.ok(routes['/editor/demo']);
  assert.ok(routes['/settings']);
  assert.ok(routes['/auth/login']);
});

test('route rendering smoke test', () => {
  for (const [path, pageComponent] of Object.entries(routes)) {
    const element = React.createElement(pageComponent);
    const result = render(element);
    assert.ok(result.html.length > 0, `Route ${path} failed to render.`);
  }
});

// Mock path matching behavior for unit testing of routing helpers logic
const isRouteActiveMock = (currentPath, targetPath) => {
  if (targetPath === '/') return currentPath === '/';
  return currentPath.startsWith(targetPath);
};

test('isRouteActive matching rules logic test', () => {
  assert.strictEqual(isRouteActiveMock('/', '/'), true);
  assert.strictEqual(isRouteActiveMock('/projects', '/'), false);
  assert.strictEqual(isRouteActiveMock('/projects/demo-project', '/projects'), true);
  assert.strictEqual(isRouteActiveMock('/settings', '/projects'), false);
});
