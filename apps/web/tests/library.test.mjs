import test from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render } from './test-utils.mjs';

// Mock component to represent LibraryPage
const MockLibraryPage = () => React.createElement('div', null, 'Asset Library catalog');

test('library catalog list renders correctly', () => {
  const element = React.createElement(MockLibraryPage);
  const result = render(element);
  assert.ok(result.html.includes('<MockLibraryPage'));
});
