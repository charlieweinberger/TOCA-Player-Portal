// LEGACY FILE - UNUSED
// This file is no longer used after migrating to Clerk authentication.
// Safe to delete.

import { createContext } from "react";

export interface AuthContextType {
  email: string | null;
  setEmail: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
