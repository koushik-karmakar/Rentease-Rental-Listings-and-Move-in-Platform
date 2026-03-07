import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children, roles, optional = false }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-[#FE6702] rounded-full animate-spin" />
      </div>
    );
  }
  if (optional) return children;
  if (!isAuthenticated)
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};
