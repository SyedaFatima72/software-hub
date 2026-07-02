"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import AuthCard from "../../components/AuthCard";
import { Eye, EyeOff, Check, X } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const router = useRouter();

  // Password strength checker
  useEffect(() => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordChecks(checks);

    const strength = Object.values(checks).filter(Boolean).length;
    setPasswordStrength(strength);
  }, [password]);

  // Strict Email Validation
  const isValidEmail = (email: string) => {
    if (email.includes(" ")) return false;
    if (!email.includes("@")) return false;
    if (email.length < 5) return false;
    if (!/^[A-Za-z0-9]/.test(email)) return false;
    const parts = email.split("@");
    if (parts.length !== 2) return false;
    const domain = parts[1];
    if (domain.length < 3) return false;
    if (!domain.includes(".")) return false;
    if (domain.startsWith(".") || domain.endsWith(".")) return false;
    if (email.includes("..")) return false;
    return true;
  };

  const doPasswordsMatch = password === confirmPassword && password.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address (e.g., name@gmail.com)");
      return;
    }

    if (passwordStrength < 4) {
      setError("Please make your password stronger (meet at least 4 requirements)");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength <= 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    if (passwordStrength === 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (passwordStrength <= 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    if (passwordStrength === 4) return "Strong";
    return "Very Strong";
  };

  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#f0f5f1]">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Account Created!</h2>
            <p className="text-gray-500 mt-2">
              Your account has been created successfully.
            </p>
            <Link
              href="/login"
              className="inline-block mt-6 px-6 py-3 bg-[#036627] text-white rounded-xl hover:bg-green-700 transition"
            >
              Login Now
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 relative overflow-hidden bg-[#f0f5f1]">
        <AuthCard
          title="Create Account"
          subtitle="Join thousands of creators and start building"
          footerText="Already have an account?"
          footerLink="/login"
          footerLinkText="Sign In"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#036627] focus:ring-2 focus:ring-[#036627]/20 transition-all"
                placeholder="John Doe"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border ${
                    email && !isValidEmail(email)
                      ? "border-red-500"
                      : email && isValidEmail(email)
                      ? "border-green-500"
                      : "border-white/50"
                  } text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#036627] focus:ring-2 focus:ring-[#036627]/20 transition-all pr-10`}
                  placeholder="name@example.com"
                  required
                />
                {email && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isValidEmail(email) ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {email && !isValidEmail(email) && (
                <p className="text-red-500 text-xs mt-1">
                  Valid format: name@gmail.com (no spaces, must have @ and domain)
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#036627] focus:ring-2 focus:ring-[#036627]/20 transition-all pr-12"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {password.length > 0 && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600">
                      {getStrengthText()}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
                    <div className={`flex items-center gap-1.5 ${passwordChecks.length ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordChecks.length ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${passwordChecks.uppercase ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordChecks.uppercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>Uppercase letter (A-Z)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${passwordChecks.lowercase ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordChecks.lowercase ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>Lowercase letter (a-z)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${passwordChecks.number ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordChecks.number ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>Number (0-9)</span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${passwordChecks.special ? 'text-green-600' : 'text-gray-400'}`}>
                      {passwordChecks.special ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
                      <span>Special character (!@#$%^&*)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border ${
                    confirmPassword && password && !doPasswordsMatch
                      ? "border-red-500"
                      : confirmPassword && doPasswordsMatch
                      ? "border-green-500"
                      : "border-white/50"
                  } text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#036627] focus:ring-2 focus:ring-[#036627]/20 transition-all pr-12`}
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {confirmPassword && password && (
                  <div className="absolute right-12 top-1/2 -translate-y-1/2">
                    {doPasswordsMatch ? (
                      <Check className="w-5 h-5 text-green-500" />
                    ) : (
                      <X className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {confirmPassword && password && !doPasswordsMatch && (
                <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
              )}
              {confirmPassword && password && doPasswordsMatch && (
                <p className="text-green-500 text-xs mt-1">Passwords match ✓</p>
              )}
            </div>

            {/* ✅ DISCLAIMER - Added here */}
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-xs text-yellow-800">
                ⚠️ <span className="font-semibold">Important:</span> Please use a valid email address. 
                If you forget your password, we will send a new password to this email. 
                Without a valid email, you won&apos;t be able to recover your account.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-[#036627] hover:bg-[#036627]/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#036627]/30 hover:shadow-[#036627]/50 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>
        </AuthCard>
      </div>
    </>
  );
}