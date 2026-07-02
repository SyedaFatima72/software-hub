"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import AuthCard from "../../components/AuthCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-[#f0f5f1]">
        <AuthCard
          title="Forgot Password"
          subtitle="Enter your email to receive a new password"
          footerText="Remember your password?"
          footerLink="/login"
          footerLinkText="Sign In"
        >
          {success ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl">📧</span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">Email Sent!</h2>
              <p className="text-gray-500 mt-2 text-sm">
                A new password has been sent to <strong>{email}</strong>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Please check your inbox (and spam folder).
              </p>
              <Link
                href="/login"
                className="inline-block mt-6 px-6 py-3 bg-[#036627] text-white rounded-xl hover:bg-green-700 transition"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-xl text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/40 backdrop-blur-md border border-white/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#036627] focus:ring-2 focus:ring-[#036627]/20 transition-all"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-[#036627] hover:bg-[#036627]/90 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-[#036627]/30 hover:shadow-[#036627]/50 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send New Password"}
              </button>
            </form>
          )}
        </AuthCard>
      </div>
    </>
  );
}