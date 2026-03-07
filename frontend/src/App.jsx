import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import { useAuth } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Listings from "./pages/Listing.jsx";
function App() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-200 border-t-[#FE6702] rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute optional>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/listings"
          element={
            <ProtectedRoute optional>
              <Listings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/" replace /> : <RegisterPage />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
