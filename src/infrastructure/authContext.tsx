import { createContext, useContext, useEffect, useState } from "react";
import  SessionModal  from "../shared/components/SessionModal";
import type { ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expiresAt");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const handleExpire = () => {
      logout();
      setIsModalOpen(true);
    };

    window.addEventListener("auth-session-expired", handleExpire);
    return () => window.removeEventListener("auth-session-expired", handleExpire);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, logout }}>
      {children}
      <SessionModal isOpen={isModalOpen} onClose={() => {
        setIsModalOpen(false);
        window.location.href = "/login";
      }} />
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};