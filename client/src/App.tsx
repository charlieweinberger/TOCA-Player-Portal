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
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <SignIn 
              routing="hash"
              signUpUrl="/sign-up"
              fallbackRedirectUrl="/"
            />
          </div>
        } 
      />
      <Route
        path="/sign-up/*"
        element={
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <SignUp 
              routing="hash"
              signInUrl="/sign-in"
              fallbackRedirectUrl="/"
            />
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
