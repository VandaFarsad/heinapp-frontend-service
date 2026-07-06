"use client";

import { cn } from "@/lib/utils";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getMainNavigation } from "../shared/navigationConstants";

interface MainNavigationProps {
  session: Session | null;
}

export default function MainNavigation({ session }: MainNavigationProps) {
  const pathname = usePathname();
  const mainNavigation = getMainNavigation(session);

  return (
    <div className="hidden items-center space-x-1 md:flex">
      {mainNavigation.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200",
              isActive ? "bg-green-100 text-green-700 shadow-sm" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
            )}
          >
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
