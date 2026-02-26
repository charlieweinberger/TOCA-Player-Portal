// LEGACY FILE - UNUSED
// This file is no longer used after migrating to Clerk authentication.
// Safe to delete.

import { useState } from "react";
import { AuthContext } from "./authContext";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [email, setEmailState] = useState<string | null>(() => {
    // Load email from localStorage on mount
    return localStorage.getItem("userEmail");
  });

  const setEmail = (email: string) => {
    setEmailState(email);
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setEmailState(null);
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ email, setEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
