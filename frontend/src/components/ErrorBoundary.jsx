import { Component } from "react";

// Catches any render-time error anywhere below it in the tree. Without this,
// React's default behavior is to unmount the entire app on an uncaught
// error, leaving a blank page with no way to even navigate back to safety.
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Unhandled error in the app:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
          <div className="flex flex-col items-center gap-4 text-center px-6">
            <h1 className="text-lg font-semibold text-zinc-100">Something went wrong</h1>
            <p className="text-sm text-zinc-400 max-w-sm">
              An unexpected error occurred. Try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-5 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #7C5EF0 0%, #9B7FF5 100%)",
                boxShadow: "0 2px 12px rgba(124,94,240,0.4)",
              }}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
