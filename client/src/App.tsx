import { Navigate, Route, Routes } from "react-router-dom";
import { isSupabaseConfigured } from "./lib/supabase";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";

function RootRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return <Navigate to={user ? "/dashboard" : "/auth"} replace />;
}

function App() {
  if (!isSupabaseConfigured) {
    return (
      <div>
        <h1>Configuration Error</h1>
        <p>Missing VITE_SUPABASE_URL or VITE_SUPABASE_PUBLISHABLE_KEY.</p>
        <p>Set them in client/.env.local, then restart the dev server.</p>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
