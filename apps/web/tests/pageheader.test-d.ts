import React from 'react';
import PageHeader from '../src/components/shell/PageHeader';

// Type checks
const _testHeader = React.createElement(PageHeader, {
  title: "Test Page",
  description: "Test description"
}, React.createElement('button', null, 'Click'));

console.log("PageHeader types validated");
