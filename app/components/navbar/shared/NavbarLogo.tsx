"use client";

import { cn } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { HERO_SECTION_ID, homeSections, scrollToSection } from "./navigationConstants";

export default function NavbarLogo() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === "/";

  const handleHomeNavigation = () => {
    isHomePage ? scrollToSection(HERO_SECTION_ID) : router.push("/");
  };

  return (
    <div className="group relative">
      <button
        onClick={handleHomeNavigation}
        aria-label="HeiNa – Zur Startseite"
        className="flex items-center space-x-3 rounded-xl px-3 py-2 text-2xl font-bold text-green-600 transition-all duration-200 hover:bg-green-50 hover:text-green-700"
      >
        <span className="radhaus-title-bold tracking-tight">HeiNa</span>
      </button>

      {/* Homepage-Sections Dropdown */}
      {isHomePage && (
        <div
          role="menu"
          className={cn(
            "invisible absolute top-full left-0 z-50 mt-3 w-64",
            "translate-y-2 transform rounded-xl border border-gray-100",
            "bg-white opacity-0 shadow-lg transition-all delay-150 duration-300",
            "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-0",
          )}
        >
          <div className="p-3">
            <div className="mb-1 px-3 py-2 text-xs font-semibold tracking-wider text-gray-400 uppercase">Bereiche</div>
            {homeSections.map((section) => (
              <button
                key={section.id}
                role="menuitem"
                onClick={() => scrollToSection(section.id)}
                className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
