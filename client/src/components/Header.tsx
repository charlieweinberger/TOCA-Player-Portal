import { useNavigate, useLocation } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";

export default function Header() {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut({ redirectUrl: "/sign-in" });
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <h1 className="text-2xl font-bold text-green-600">TOCA</h1>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 flex justify-center gap-8 ml-16">
            <button
              onClick={() => navigate("/")}
              className={`px-4 py-2 rounded-md transition cursor-pointer ${
                isActive("/")
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate("/about")}
              className={`px-4 py-2 rounded-md transition cursor-pointer ${
                isActive("/about")
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              About TOCA
            </button>
            <button
              onClick={() => navigate("/profile")}
              className={`px-4 py-2 rounded-md transition cursor-pointer ${
                isActive("/profile")
                  ? "bg-green-100 text-green-700 font-medium"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Profile
            </button>
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition font-medium cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
