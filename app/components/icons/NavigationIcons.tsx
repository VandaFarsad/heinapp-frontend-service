/**
 * Navigation-related icons
 * Includes hamburger menu, close buttons, arrows, and directional icons
 */

import React from "react";
import { IconProps } from "./types";

export const HamburgerIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={size ? `w-${size} h-${size}` : className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg className={size ? `w-${size} h-${size}` : className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ChevronDownIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <svg className={size ? `w-${size} h-${size}` : className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

export const ArrowUpIcon: React.FC<IconProps> = ({ className = "w-5 h-5", size }) => (
  <svg className={size ? `w-${size} h-${size}` : className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

export const ArrowLeftIcon: React.FC<IconProps> = ({ className = "", size = 24, ...props }) => (
  <svg
    className={className}
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

/**
 * Mobile Menu Icon - toggles between hamburger and close
 */
export const MobileMenuIcon: React.FC<{
  isOpen: boolean;
  className?: string;
}> = ({ isOpen, className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    {isOpen ? (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    ) : (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    )}
  </svg>
);
