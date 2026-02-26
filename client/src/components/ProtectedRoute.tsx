import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { email } = useAuth();

  if (!email) {
    return <Navigate to="/sign-in" replace />;
  }

  return <>{children}</>;
}
