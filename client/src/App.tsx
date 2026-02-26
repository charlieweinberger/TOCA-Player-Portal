import { Routes, Route, Navigate } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
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
      <Route path="/sign-in" element={<SignInPage />} />
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
