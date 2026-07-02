"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setIsLoggedIn(true);
      setUser(parsedUser);
    } else {
      setIsLoggedIn(false);
      setUser(null);
    }
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(path + "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#036627]/20 bg-[#f0f5f1] backdrop-blur-md">
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
            className={`relative text-base font-medium transition ${
              isActive("/")
                ? "text-[#036627]"
                : "text-gray-700 hover:text-[#036627]"
            }`}
          >
            Browse
            <span
              className={`absolute -bottom-2 left-0 h-[3px] w-full rounded-full transition-all duration-300 ${
                isActive("/") ? "bg-[#036627]" : "bg-transparent"
              }`}
            />
          </Link>

          {isLoggedIn && (
            <Link
              href="/dashboard"
              className={`relative text-base font-medium transition ${
                isActive("/dashboard")
                  ? "text-[#036627]"
                  : "text-gray-700 hover:text-[#036627]"
              }`}
            >
              My Templates
              <span
                className={`absolute -bottom-2 left-0 h-[3px] w-full rounded-full transition-all duration-300 ${
                  isActive("/dashboard") ? "bg-[#036627]" : "bg-transparent"
                }`}
              />
            </Link>
          )}
        </nav>

        {/* Right - Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <span className="text-sm text-gray-600">👋 {user?.name}</span>
              <button
                onClick={handleLogout}
                className="rounded-lg border border-red-400 px-5 py-2 text-sm font-semibold text-red-500 transition duration-300 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="rounded-lg border border-[#036627]/40 px-5 py-2 text-sm font-semibold text-[#036627] transition duration-300 hover:bg-[#036627] hover:text-white"
              >
                Sign Up
              </Link>
              <Link
                href="/login"
                className="rounded-lg bg-[#036627] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#036627]/20 transition duration-300 hover:-translate-y-0.5 hover:bg-[#036627]/90"
              >
                Login
              </Link>
            </>
          )}
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
        <div className="border-t border-[#036627]/20 bg-[#f0f5f1] px-6 py-4 md:hidden">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className={`text-lg font-medium transition ${
                isActive("/")
                  ? "text-[#036627]"
                  : "text-gray-700 hover:text-[#036627]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Browse
            </Link>

            {isLoggedIn && (
              <Link
                href="/dashboard"
                className={`text-lg font-medium transition ${
                  isActive("/dashboard")
                    ? "text-[#036627]"
                    : "text-gray-700 hover:text-[#036627]"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                My Templates
              </Link>
            )}

            <div className="flex flex-col gap-3 pt-4 border-t border-[#036627]/10">
              {isLoggedIn ? (
                <>
                  <span className="text-sm text-gray-600 text-center">
                    👋 {user?.name}
                  </span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="rounded-xl border border-red-400 px-7 py-3 text-center font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signup"
                    className="rounded-xl border border-[#036627]/40 px-7 py-3 text-center font-semibold text-[#036627] transition hover:bg-[#036627] hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/login"
                    className="rounded-xl bg-[#036627] px-7 py-3 text-center font-semibold text-white transition hover:bg-[#036627]/90"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;