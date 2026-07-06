import React, { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export class ErrorBoundary extends Component<Props, State> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div style={{ padding: 40, textAlign: 'center' }}><h1>Something went wrong</h1></div>;
    return this.props.children;
  }
}
