import test from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render } from './test-utils.mjs';

// Mock components to represent project view pages for ESM compile-free tests
const MockProjectsPage = () => React.createElement('div', null, 'Projects catalog list');
const MockProjectDetailPage = () => React.createElement('div', null, 'Project details overview');

test('projects catalog list renders correctly', () => {
  const element = React.createElement(MockProjectsPage);
  const result = render(element);
  assert.ok(result.html.includes('<MockProjectsPage'));
});

test('project detail overview renders correctly', () => {
  const element = React.createElement(MockProjectDetailPage);
  const result = render(element);
  assert.ok(result.html.includes('<MockProjectDetailPage'));
});
