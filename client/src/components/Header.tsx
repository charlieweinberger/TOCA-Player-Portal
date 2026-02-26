import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut({ redirectUrl: "/sign-in" });
  };

  const isActive = (path: string) => location.pathname === path;
  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="shrink-0">
            <h1 className="text-2xl font-bold text-blue-700">TOCA</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden min-[512px]:flex min-[512px]:flex-1 min-[512px]:justify-center min-[512px]:ml-10 min-[512px]:gap-2">
            <Button
              onClick={() => navigate("/")}
              variant={isActive("/") ? "secondary" : "ghost"}
              className={
                isActive("/")
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("/about")}
              variant={isActive("/about") ? "secondary" : "ghost"}
              className={
                isActive("/about")
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              About TOCA
            </Button>
            <Button
              onClick={() => navigate("/profile")}
              variant={isActive("/profile") ? "secondary" : "ghost"}
              className={
                isActive("/profile")
                  ? "bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer"
                  : "cursor-pointer"
              }
            >
              Profile
            </Button>
          </nav>

          {/* Desktop Logout */}
          <div className="hidden min-[512px]:block">
            <Button onClick={handleLogout} variant="destructive">
              Logout
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="min-[512px]:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen ? (
          <div className="min-[512px]:hidden pb-3">
            <div className="flex flex-col gap-2">
              <Button
                onClick={() => handleNavigate("/")}
                variant={isActive("/") ? "secondary" : "ghost"}
                className={
                  isActive("/")
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200 justify-start"
                    : "justify-start"
                }
              >
                Home
              </Button>
              <Button
                onClick={() => handleNavigate("/about")}
                variant={isActive("/about") ? "secondary" : "ghost"}
                className={
                  isActive("/about")
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200 justify-start"
                    : "justify-start"
                }
              >
                About TOCA
              </Button>
              <Button
                onClick={() => handleNavigate("/profile")}
                variant={isActive("/profile") ? "secondary" : "ghost"}
                className={
                  isActive("/profile")
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200 justify-start"
                    : "justify-start"
                }
              >
                Profile
              </Button>
              <Button
                onClick={handleLogout}
                variant="destructive"
                className="justify-start"
              >
                Logout
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
