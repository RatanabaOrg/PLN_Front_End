import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role") || null);
  const navigate = useNavigate();

  const login = (role) => {
    localStorage.setItem("role", role);
    setRole(role);
    navigate("/historico");
  }

  const logout = () => {
    localStorage.clear();
    setRole(null);
    navigate("/");
  };
  

  return (
    <AuthContext.Provider value={{ role, login, setRole, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
