import { Component } from 'react';
import { ERROR_MESSAGE } from './constants';
import { ErrorBoundaryProps } from './types';

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h1>{ERROR_MESSAGE}</h1>
        </>
      );
    }
    return this.props.children;
  }
}
