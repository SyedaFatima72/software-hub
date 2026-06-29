"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#036627]/40 bg-[#036627] backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Software Template"
              width={200}
              height={80}
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Center - Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="relative text-base font-medium text-white/80 transition hover:text-white"
          >
            Browse
            <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-white" />
          </Link>
          <Link
            href="/my-templates"
            className="text-base font-medium text-white/80 transition hover:text-white"
          >
            My Templates
          </Link>
        </nav>

        {/* Right - Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="../signup"
            className="rounded-lg border border-white/30 px-5 py-2 text-sm font-semibold text-white transition duration-300 hover:bg-white/10 hover:border-white"
          >
            Sign Up
          </Link>
          <Link
            href="../login"
            className="rounded-lg bg-white px-5 py-2 text-sm font-semibold text-[#036627] shadow-lg shadow-black/20 transition duration-300 hover:-translate-y-0.5 hover:bg-white/90"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/20 bg-[#036627] px-6 py-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-lg font-medium text-white/80 transition hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              href="/my-templates"
              className="text-lg font-medium text-white/80 transition hover:text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              My Templates
            </Link>
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="../signup"
                className="rounded-xl border border-white/30 px-7 py-3 text-center font-semibold text-white transition hover:bg-white/10"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
              <Link
                href="../login"
                className="rounded-xl bg-white px-7 py-3 text-center font-semibold text-[#036627] transition hover:bg-white/90"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;