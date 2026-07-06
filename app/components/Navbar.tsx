"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { AuthSection, MainNavigation, MobileMenu, MobileMenuButton, NavbarLogo } from "./navbar";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleResize = () => {
      if (mediaQuery.matches) setIsMobileMenuOpen(false);
    };
    mediaQuery.addEventListener("change", handleResize);
    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <NavbarLogo />
            <MainNavigation session={session} />
            <div className="hidden items-center space-x-3 md:flex">
              <AuthSection session={session} status={status} />
            </div>
            <MobileMenuButton isOpen={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          </div>
        </div>
        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          session={session}
          status={status}
        />
      </nav>
    </>
  );
}
