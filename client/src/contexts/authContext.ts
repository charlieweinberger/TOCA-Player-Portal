import { createContext } from "react";

export interface AuthContextType {
  email: string | null;
  setEmail: (email: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
