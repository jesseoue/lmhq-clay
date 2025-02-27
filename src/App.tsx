import { Suspense, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./components/home";
import PasswordProtection from "./components/PasswordProtection";
import routes from "tempo-routes";

// Auth check component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const location = useLocation();

  if (!isAuthenticated && location.pathname !== "/password") {
    return <Navigate to="/password" replace />;
  }

  return <>{children}</>;
};

function App() {
  // Clear authentication on app load if in development mode
  useEffect(() => {
    if (import.meta.env.DEV && import.meta.env.VITE_TEMPO !== "true") {
      localStorage.removeItem("isAuthenticated");
    }
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/password" element={<PasswordProtection />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Navigate to="/" replace />
              </ProtectedRoute>
            }
          />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
