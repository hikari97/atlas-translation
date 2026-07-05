import React from 'react';

// Simple test render helper that mock renders a React element to string
export const render = (element) => {
  const type = typeof element.type === 'string' ? element.type : (element.type.name || 'Component');
  const html = `<${type}></${type}>`;
  return { element, html };
};
