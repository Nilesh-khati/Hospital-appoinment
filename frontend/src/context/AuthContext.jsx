import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("hospital-user");
    const storedToken = localStorage.getItem("hospital-token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const response = await authService.login(credentials);
    localStorage.setItem("hospital-user", JSON.stringify(response.user));
    localStorage.setItem("hospital-token", response.token);
    setUser(response.user);
    setToken(response.token);
  };

  const register = async (data) => {
    const response = await authService.register(data);
    localStorage.setItem("hospital-user", JSON.stringify(response.user));
    localStorage.setItem("hospital-token", response.token);
    setUser(response.user);
    setToken(response.token);
  };

  const logout = () => {
    localStorage.removeItem("hospital-user");
    localStorage.removeItem("hospital-token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
