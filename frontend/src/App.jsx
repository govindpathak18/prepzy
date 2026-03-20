import { useUser } from "@clerk/clerk-react";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import ProblemsPage from "./pages/ProblemsPage";
import DashboardPage from "./pages/DashboardPage";
import ProblemPage from "./pages/ProblemPage";
import SessionPage from "./pages/SessionPage";
import { Toaster } from "react-hot-toast";
import { Loader2Icon } from "lucide-react";

function App() {
  const { isSignedIn, isLoaded } = useUser();

  // ✅ Show spinner instead of blank screen while Clerk loads
  if (!isLoaded) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-2xl bg-purple-950">
            <Loader2Icon className="size-8 animate-spin text-purple-400" />
          </div>
          <p className="text-sm text-zinc-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={!isSignedIn ? <HomePage /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={isSignedIn ? <DashboardPage /> : <Navigate to="/" />} />
        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />} />
        <Route path="/problem/:id" element={isSignedIn ? <ProblemPage /> : <Navigate to="/" />} />
        <Route path="/session/:id" element={isSignedIn ? <SessionPage /> : <Navigate to="/" />} />
      </Routes>

      {/* ✅ Purple themed toaster */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#18181b",
            color: "#e4e4e7",
            border: "0.5px solid #3f3f46",
            borderRadius: "12px",
            fontSize: "13px",
          },
          success: {
            iconTheme: {
              primary: "#7C5EF0",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#E24B4A",
              secondary: "#fff",
            },
          },
        }}
      />
    </>
  );
}

export default App;