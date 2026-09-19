import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="group mb-5 inline-flex">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-sky-400 to-secondary shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <Sparkles className="size-7 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome back</h1>
            <p className="mt-1.5 text-base-content/60">Sign in to continue your conversations</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="animate-rise-in space-y-5">
            <div className="form-control">
              <label className="label pb-1.5">
                <span className="label-text text-sm font-semibold">Email</span>
              </label>
              <div className="chat-input-shell relative flex items-center rounded-2xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm outline-none placeholder:text-base-content/40"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label pb-1.5">
                <span className="label-text text-sm font-semibold">Password</span>
              </label>
              <div className="chat-input-shell relative flex items-center rounded-2xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-transparent py-3.5 pl-12 pr-12 text-sm outline-none placeholder:text-base-content/40"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-base-content/40 transition-colors hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-brand btn w-full rounded-2xl font-bold" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="font-semibold text-primary hover:underline">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};

export default LoginPage;
