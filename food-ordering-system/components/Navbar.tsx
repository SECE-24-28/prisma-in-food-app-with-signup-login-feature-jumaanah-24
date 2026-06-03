"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn =
      document.cookie.includes("username");

    setIsLoggedIn(loggedIn);

    function updateCartCount() {
      const cart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setCartCount(cart.length);
    }

    updateCartCount();

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener(
        "storage",
        updateCartCount
      );
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          href="/"
          className="text-3xl font-bold cursor-pointer"
        >
          My Food Order
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            Home
          </Link>

          <Link
            href="/menu"
            className="px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            Menu
          </Link>

          {isLoggedIn && (
            <Link
              href="/cart"
              className="relative flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-xl transition border border-zinc-700"
            >
              Cart

              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          )}

          <Link
            href="/login"
            className="px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="px-4 py-2 rounded-lg hover:bg-zinc-800 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}