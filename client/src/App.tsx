import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import TrainingSessionDetailsPage from "./pages/TrainingSessionDetailsPage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const routes = [
    { path: "/", component: HomePage },
    { path: "/about", component: AboutPage },
    { path: "/profile", component: ProfilePage },
    { path: "/sessions/:sessionId", component: TrainingSessionDetailsPage },
  ];

  return (
    <Routes>
      <Route
        path="/sign-in/*"
        element={
          <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
            <div className="w-full max-w-md px-6">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">
                  TOCA Player Portal
                </h1>
                <p className="text-muted-foreground">
                  Sign in to access your training portal
                </p>
              </div>
              <div className="bg-white dark:bg-card rounded-2xl shadow-2xl p-2 border border-border/50">
                <SignIn
                  routing="hash"
                  signUpUrl="/sign-up"
                  fallbackRedirectUrl="/"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none bg-transparent",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton:
                        "bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border",
                      formButtonPrimary:
                        "bg-primary hover:bg-primary/90 text-primary-foreground",
                      footerActionLink: "text-primary hover:text-primary/80",
                      identityPreviewEditButton: "text-primary",
                      formFieldInput: "border-border focus:ring-ring",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        }
      />
      <Route
        path="/sign-up/*"
        element={
          <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-purple-50 via-indigo-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950">
            <div className="w-full max-w-md px-6">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-primary mb-2">
                  TOCA Player Portal
                </h1>
                <p className="text-muted-foreground">
                  Create your account to begin training
                </p>
              </div>
              <div className="bg-white dark:bg-card rounded-2xl shadow-2xl p-2 border border-border/50">
                <SignUp
                  routing="hash"
                  signInUrl="/sign-in"
                  fallbackRedirectUrl="/"
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none bg-transparent",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton:
                        "bg-secondary hover:bg-secondary/80 text-secondary-foreground border-border",
                      formButtonPrimary:
                        "bg-primary hover:bg-primary/90 text-primary-foreground",
                      footerActionLink: "text-primary hover:text-primary/80",
                      identityPreviewEditButton: "text-primary",
                      formFieldInput: "border-border focus:ring-ring",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        }
      />
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            <ProtectedRoute>
              <div className="min-h-screen bg-gray-50">
                <Header />
                <route.component />
              </div>
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
