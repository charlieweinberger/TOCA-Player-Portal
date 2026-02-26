import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const { email } = useAuth();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Welcome, {email}!</h1>
        <p className="text-gray-600">
          Your training sessions will appear here.
        </p>
      </div>
    </div>
  );
}
