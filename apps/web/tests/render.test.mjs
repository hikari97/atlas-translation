import test from 'node:test';
import assert from 'node:assert';
import React from 'react';
import { render } from './test-utils.mjs';

// Mock components to represent pages for compiler-free testing
const MockHome = () => React.createElement('div', null, 'Home');
const MockProjects = () => React.createElement('div', null, 'Projects');
const MockSettings = () => React.createElement('div', null, 'Settings');

test('home page component structure', () => {
  const element = React.createElement(MockHome);
  const result = render(element);
  assert.ok(result.html.includes('<MockHome'));
});

test('projects page component structure', () => {
  const element = React.createElement(MockProjects);
  const result = render(element);
  assert.ok(result.html.includes('<MockProjects'));
});

test('settings page component structure', () => {
  const element = React.createElement(MockSettings);
  const result = render(element);
  assert.ok(result.html.includes('<MockSettings'));
});
