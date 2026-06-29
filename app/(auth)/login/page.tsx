"use client";

import { useState } from "react";
import Link from "next/link";
import AuthCard from "@/app/components/AuthCard";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login:", { email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Green gradient blobs */}
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#00B140]/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-96 h-96 bg-[#00B140]/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00B140]/5 rounded-full blur-3xl" />
        
        {/* Soft circles */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-[#00B140]/20 rounded-full animate-spin-slow" />
        <div className="absolute bottom-20 right-20 w-48 h-48 border border-[#00B140]/10 rounded-full animate-spin-slow-reverse" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-[#00B140]/10 rounded-full blur-2xl" />
      </div>

      {/* Auth Card */}
      <AuthCard
        title="Welcome Back"
        subtitle="Sign in to your account to continue"
        footerText="Don't have an account?"
        footerLink="/signup"
        footerLinkText="Sign Up"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#00B140] focus:ring-2 focus:ring-[#00B140]/20 transition-all"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-[#00B140] focus:ring-2 focus:ring-[#00B140]/20 transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-white/60 text-sm">
              <input type="checkbox" className="accent-[#00B140]" />
              Remember me
            </label>
            <Link href="/forgot-password" className="text-[#00B140] text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#00B140] hover:bg-[#009a35] text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:-translate-y-0.5"
          >
            Sign In
          </button>
        </form>
      </AuthCard>
    </div>
  );
}