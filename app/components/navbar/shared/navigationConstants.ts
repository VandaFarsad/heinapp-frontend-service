// Shared navigation constants and utilities for navbar components
import { Session } from "next-auth";

// Hero-Section ID
export const HERO_SECTION_ID = "hero";

// Homepage sections for navigation
export const homeSections = [
  { id: "radhaus", label: "Werkstatt" },
  { id: "kontakt", label: "Kontakt" },
] as const;

// Scroll-Navigation für Homepage-Sections
export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    const navbar = document.querySelector("nav");
    const navbarHeight = navbar?.getBoundingClientRect().height ?? 0;
    const top = section.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

// Hauptnavigation - nur wichtige Pages
export const getMainNavigation = (session: Session | null) => [
  ...(session?.user?.role === "member" || session?.user?.role === "admin"
    ? [{ href: "/calendar", label: "Kalender" }]
    : []),
  {
    href: "/workshop",
    label: "Werkstatt",
  },
  { href: "/about", label: "Über uns" },
];
