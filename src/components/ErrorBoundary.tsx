'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message || 'An unexpected error occurred.',
    };
  }

  componentDidCatch(error: Error) {
    console.error('Application ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-cream px-6 text-center">
          <div className="max-w-md">
            <p className="font-serif text-4xl text-forest">
              Something came undone.
            </p>
            <p className="mt-4 text-sm text-moss">
              Please refresh the page to continue.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="btn btn-forest mt-8"
            >
              Reload Studio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
