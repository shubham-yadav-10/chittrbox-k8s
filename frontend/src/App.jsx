import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import { Toaster } from "react-hot-toast";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex h-screen items-center justify-center bg-base-200">
        <div className="relative flex size-16 items-center justify-center">
          <div className="absolute inset-0 animate-ping-slow rounded-full bg-primary/30" />
          <div className="size-10 animate-spin rounded-full border-4 border-primary/25 border-t-primary" />
        </div>
      </div>
    );

  return (
    <div data-theme={theme} className="min-h-screen bg-base-200">
      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "14px",
            fontWeight: 600,
          },
        }}
      />
    </div>
  );
};

export default App;
