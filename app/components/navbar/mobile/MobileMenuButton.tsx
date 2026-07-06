"use client";

import { MobileMenuIcon } from "../../icons";

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
      className="rounded-xl p-2 text-gray-600 transition-all hover:bg-gray-50 hover:text-gray-900 md:hidden"
    >
      <MobileMenuIcon isOpen={isOpen} className="h-6 w-6" />
    </button>
  );
}
