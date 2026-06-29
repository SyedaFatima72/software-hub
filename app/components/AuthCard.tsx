"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  footerText: string;
  footerLink: string;
  footerLinkText: string;
}

const AuthCard = ({
  children,
  title,
  subtitle,
  footerText,
  footerLink,
  footerLinkText,
}: AuthCardProps) => {
  return (
    <div className="relative w-full max-w-md">
      {/* Glassmorphism Card */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
        {/* Green glow effect */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00B140]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#00B140]/10 rounded-full blur-3xl" />
        
        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-[#00B140] rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-2xl font-bold text-white">ST</span>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-white/70">{subtitle}</p>
          </div>

          {/* Form */}
          {children}

          {/* Footer */}
          <p className="text-center text-white/70 mt-6">
            {footerText}{" "}
            <Link href={footerLink} className="text-[#00B140] font-semibold hover:underline">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;