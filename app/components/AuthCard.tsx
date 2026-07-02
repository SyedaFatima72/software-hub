"use client";

import Link from "next/link";
import Image from "next/image";
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
      <div className="relative bg-white/80 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl p-8 md:p-10">
        <div className="relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Link href="/">
              <div className="w-20 h-20 bg-[#f0f5f1] border-2 border-[#036627]/30 rounded-2xl flex items-center justify-center shadow-lg shadow-[#036627]/10 hover:shadow-[#036627]/30 transition-all hover:scale-105 cursor-pointer p-1">
                <Image
                  src="/images/icon.png"
                  alt="Software Template Icon"
                  width={150}
                  height={150}
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
            <p className="text-gray-500">{subtitle}</p>
          </div>

          {/* Form */}
          {children}

          {/* Footer */}
          <p className="text-center text-gray-500 mt-6">
            {footerText}{" "}
            <Link href={footerLink} className="text-[#036627] font-semibold hover:underline transition-all">
              {footerLinkText}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;