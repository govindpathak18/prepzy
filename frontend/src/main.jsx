import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

const rootElement = document.getElementById("root");

// ✅ Add default options for better UX
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30000,
      refetchOnWindowFocus: false,
    },
  },
});

if (!PUBLISHABLE_KEY) {
  // Fail loudly but visibly. This throws before React ever mounts, so a
  // plain `throw` here would just be an uncaught JS exception - a blank
  // white page with only a console error to explain it. Since this key is
  // baked in at build time, that would mean every visitor to a misconfigured
  // deployment sees nothing at all.
  console.error("Missing VITE_CLERK_PUBLISHABLE_KEY environment variable");
  createRoot(rootElement).render(
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 text-zinc-100 text-center px-6">
      <p>App configuration is missing. Please contact support or check the deployment setup.</p>
    </div>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <BrowserRouter>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            {/* ✅ QueryClientProvider inside ClerkProvider */}
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </ClerkProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StrictMode>
  );
}
