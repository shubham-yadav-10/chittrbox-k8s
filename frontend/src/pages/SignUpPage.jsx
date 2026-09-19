import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, Sparkles, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left side - form */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="group mb-5 inline-flex">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary via-sky-400 to-secondary shadow-lg shadow-primary/30 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
                <Sparkles className="size-7 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Create your account</h1>
            <p className="mt-1.5 text-base-content/60">Start chatting in less than a minute</p>
          </div>

          <form onSubmit={handleSubmit} className="animate-rise-in space-y-5">
            <div className="form-control">
              <label className="label pb-1.5">
                <span className="label-text text-sm font-semibold">Full Name</span>
              </label>
              <div className="chat-input-shell relative flex items-center rounded-2xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <UserRound className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="w-full bg-transparent py-3.5 pl-12 pr-4 text-sm outline-none placeholder:text-base-content/40"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label pb-1.5">
                <span className="label-text text-sm font-semibold">Email</span>
              </label>
              <div className="chat-input-shell relative flex items-center rounded-2xl">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Mail className="size-5 text-base-content/40" />
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
                  <Lock className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-transparent py-3.5 pl-12 pr-12 text-sm outline-none placeholder:text-base-content/40"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-base-content/40 transition-colors hover:text-base-content"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5" />
                  ) : (
                    <Eye className="size-5" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-brand btn w-full rounded-2xl font-bold" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;
