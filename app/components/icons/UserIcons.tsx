/**
 * User and profile-related icons
 * Includes user profile, logout, and authentication icons
 */

import React from "react";
import { IconProps } from "./types";

export const UserIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <svg className={size ? `w-${size} h-${size}` : className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export const LogoutIcon: React.FC<IconProps> = ({ className = "w-4 h-4", size }) => (
  <svg className={size ? `w-${size} h-${size}` : className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    />
  </svg>
);
