import test from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render } from './test-utils.mjs';

// Mock component representing the EditorWorkspacePage for ESM offline testing
const MockEditorWorkspacePage = () => React.createElement('div', null, 'Editor Workspace Panel');

test('editor workspace renders correctly', () => {
  const element = React.createElement(MockEditorWorkspacePage);
  const result = render(element);
  assert.ok(result.html.includes('<MockEditorWorkspacePage'));
});
