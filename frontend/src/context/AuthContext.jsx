import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const AuthContext = createContext(null);
const backend = import.meta.env.VITE_CORS_ORIGIN;
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }
    axios
      .get(`${backend}/api/v1/auth/user/auth-check`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data.data.user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = async () => {
    try {
      await axios.post(
        `${backend}/api/v1/auth/user/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
    } catch {}
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
