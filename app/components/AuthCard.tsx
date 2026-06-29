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
    <div className="relative w-full max-w-md z-10">
      {/* Glassmorphism Card - No blobs */}
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10">
        {/* Content */}
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/">
              <div className="w-16 h-16 bg-[#d1f0d9] rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:scale-105 cursor-pointer">
                <span className="text-2xl font-bold text-white"><img src="../images/icon.png" alt="icon" /></span>
              </div>
            </Link>
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
            <Link href={footerLink} className="text-[#00B140] font-semibold hover:underline transition-all">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;