"use client";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMainNavigation } from "../shared/navigationConstants";
import MobileAuthSection from "./MobileAuthSection";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  session: Session | null;
  status: "loading" | "authenticated" | "unauthenticated";
}

export default function MobileMenu({ isOpen, onClose, session, status }: MobileMenuProps) {
  const pathname = usePathname();
  const mainNavigation = getMainNavigation(session);

  return (
    <div
      className={cn(
        "overflow-hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden",
        isOpen ? "max-h-screen opacity-100" : "max-h-0 border-t-0 opacity-0",
      )}
    >
      <div className="space-y-2 px-4 py-4">
        {/* Navigation Links */}
        {mainNavigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 rounded-xl px-3 py-3 transition-all ${
                isActive ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-gray-50"
              }`}
              onClick={onClose}
            >
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}

        {/* Mobile Auth */}
        <MobileAuthSection session={session} status={status} onClose={onClose} />
      </div>
    </div>
  );
}
