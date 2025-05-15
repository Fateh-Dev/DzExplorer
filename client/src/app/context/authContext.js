"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    setHasMounted(true);
  }, []);

  const login = () => setIsLoggedIn(true);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, hasMounted }}>
      {children} {/* Always render children */}
    </AuthContext.Provider>
  );
};
