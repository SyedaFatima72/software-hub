"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Left - Logo */}
        <Link href="/" className="flex items-center gap-4">
          <div className="relative flex items-center justify-center bg-white rounded-xl border-2 border-black p-2 shadow-md">
            <Image
              src="/images/logo.jpeg"
              alt="Software Template"
              width={80}
              height={80}
              className="rounded-lg object-cover"
              priority
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-14 w-px bg-gray-300" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Software
              <span className="ml-2 text-[#00B140]">Template</span>
            </h1>
          </div>
        </Link>

        {/* Center - Navigation */}
        <nav className="hidden items-center gap-10 md:flex">
          <Link
            href="/"
            className="relative text-lg font-medium text-gray-700 transition hover:text-[#00B140]"
          >
            Browse
            <span className="absolute -bottom-2 left-0 h-[3px] w-full rounded-full bg-[#00B140]" />
          </Link>
          <Link
            href="/my-templates"
            className="text-lg font-medium text-gray-700 transition hover:text-[#00B140]"
          >
            My Templates
          </Link>
        </nav>

        {/* Right - Auth Buttons */}
        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/signup"
            className="rounded-xl border border-[#00B140] px-7 py-3 font-semibold text-[#00B140] transition duration-300 hover:bg-[#00B140] hover:text-white"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="rounded-xl bg-[#00B140] px-7 py-3 font-semibold text-white shadow-lg shadow-green-200 transition duration-300 hover:-translate-y-1 hover:bg-green-700"
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
            className="h-8 w-8 text-gray-700"
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
        <div className="border-t border-gray-200 bg-white px-6 py-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-lg font-medium text-gray-700 transition hover:text-[#00B140]"
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>
            <Link
              href="/my-templates"
              className="text-lg font-medium text-gray-700 transition hover:text-[#00B140]"
              onClick={() => setIsMenuOpen(false)}
            >
              My Templates
            </Link>
            <div className="flex flex-col gap-3 pt-4">
              <Link
                href="/signup"
                className="rounded-xl border border-[#00B140] px-7 py-3 text-center font-semibold text-[#00B140] transition hover:bg-[#00B140] hover:text-white"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="rounded-xl bg-[#00B140] px-7 py-3 text-center font-semibold text-white transition hover:bg-green-700"
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