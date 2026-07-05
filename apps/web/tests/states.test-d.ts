import React from 'react';
import { LoadingSpinner, SkeletonLoader, EmptyState, UnavailableState } from '../src/components/States';

// Type smoke tests
const _testSpinner = React.createElement(LoadingSpinner, { message: "Testing" });
const _testSkeleton = React.createElement(SkeletonLoader, { rows: 5, variant: "card" });
const _testEmpty = React.createElement(EmptyState, {
  title: "No Data",
  description: "Create your first document.",
  emoji: "📝",
  actionLabel: "Create",
  onAction: () => {}
});
const _testUnavailable = React.createElement(UnavailableState, {
  title: "Error",
  description: "Timeout",
  onRetry: () => {}
});

console.log("Types validated successfully");
