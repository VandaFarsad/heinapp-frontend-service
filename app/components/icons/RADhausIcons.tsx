/**
 * RADhaus and bike-themed decorative icons
 * Icons specifically designed for the RADhaus theme and cycling culture
 */

import { motion } from "motion/react";
import React from "react";
import { IconProps } from "./types";

// Modern bicycle wheel icon for decoration
export const BikeWheelIcon: React.FC<IconProps> = ({ className = "w-16 h-16", size }) => (
  <svg
    className={size ? `w-${size} h-${size}` : className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 120 120"
    strokeWidth="1"
  >
    {/* Thin bicycle tire (not thick like car tire) */}
    <circle cx="60" cy="60" r="56" strokeWidth="3" opacity="0.9" />
    <circle cx="60" cy="60" r="53" strokeWidth="1" opacity="0.6" />

    {/* Bicycle rim - metallic appearance */}
    <circle cx="60" cy="60" r="48" strokeWidth="2" opacity="0.8" />
    <circle cx="60" cy="60" r="46" strokeWidth="1" opacity="0.4" />

    {/* Hub - typical bike hub size */}
    <circle cx="60" cy="60" r="10" strokeWidth="2" fill="currentColor" opacity="0.2" />
    <circle cx="60" cy="60" r="7" strokeWidth="1.5" />
    <circle cx="60" cy="60" r="4" strokeWidth="1" opacity="0.6" />

    {/* Bicycle spokes - thin and numerous like real bike */}
    <g strokeWidth="0.8" opacity="0.7">
      {/* Primary cross pattern (typical for bike wheels) */}
      <line x1="60" y1="12" x2="60" y2="50" />
      <line x1="60" y1="70" x2="60" y2="108" />
      <line x1="12" y1="60" x2="50" y2="60" />
      <line x1="70" y1="60" x2="108" y2="60" />

      {/* Diagonal spokes */}
      <line x1="25.8" y1="25.8" x2="53" y2="53" />
      <line x1="67" y1="67" x2="94.2" y2="94.2" />
      <line x1="94.2" y1="25.8" x2="67" y2="53" />
      <line x1="53" y1="67" x2="25.8" y2="94.2" />
    </g>

    {/* Tire valve - typical bike valve */}
    <g opacity="0.8">
      <rect x="58.5" y="8" width="3" height="6" strokeWidth="1" rx="1" />
      <rect x="59" y="6" width="2" height="3" strokeWidth="1" rx="0.5" />
    </g>

    {/* Quick release or axle */}
    <rect x="56" y="57" width="8" height="6" strokeWidth="1" opacity="0.5" rx="1" />
  </svg>
);

// Animated bicycle icon with rotating wheels for HeroSection
const Wheel: React.FC<{ className?: string }> = ({ className }) => (
  <motion.g
    className={className}
    animate={{ rotate: -360 }}
    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    style={{ transformOrigin: "center" }}
  >
    {/* Tire */}
    <circle cx="0" cy="0" r="45" strokeWidth="3" opacity="0.9" />
    {/* Rim */}
    <circle cx="0" cy="0" r="42" strokeWidth="1.5" opacity="0.8" />
    {/* Hub */}
    <circle cx="0" cy="0" r="8" strokeWidth="2" fill="currentColor" opacity="0.3" />
    <circle cx="0" cy="0" r="5" strokeWidth="1.5" />
    {/* Spokes */}
    <g strokeWidth="1" opacity="0.7">
      {[...Array(12)].map((_, i) => (
        <line key={i} x1="0" y1="0" x2="0" y2="-42" transform={`rotate(${(360 / 12) * i})`} />
      ))}
    </g>
  </motion.g>
);

export const AnimatedBicycleIcon: React.FC<IconProps> = ({ className = "w-64 h-64", size }) => (
  <svg
    className={size ? `w-${size} h-${size}` : className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 300 150"
    strokeWidth="3.5"
  >
    {/* Wheels - Brought closer together */}
    <g transform="translate(235, 100)">
      <Wheel />
    </g>
    <g transform="translate(65, 100)">
      <Wheel />
    </g>

    {/* Frame - Adjusted for new wheelbase */}
    <g stroke="currentColor" opacity="0.9">
      {/* Top Tube - höher für mehr Abstand */}
      <line x1="90" y1="45" x2="200" y2="45" />
      {/* Down Tube */}
      <line x1="90" y1="45" x2="150" y2="100" />
      {/* Seat Tube */}
      <line x1="200" y1="45" x2="150" y2="100" />
      {/* Chain Stays */}
      <line x1="150" y1="100" x2="235" y2="100" />
      {/* Seat Stays */}
      <line x1="200" y1="45" x2="235" y2="100" />
      {/* Head tube - höher */}
      <line x1="90" y1="45" x2="75" y2="30" />
      {/* Fork - extends to where handlebars should be */}
      <line x1="75" y1="30" x2="65" y2="100" />
    </g>

    {/* Handlebars & Stem - höher positioniert, mehr Abstand zum Vorderrad */}
    <g stroke="currentColor" strokeWidth="3" opacity="0.8">
      {/* Stem - connects fork to handlebars */}
      <line x1="75" y1="30" x2="70" y2="22" />
      {/* Handlebars - höher positioniert */}
      <path d="M 60 22 L 80 22" />
      {/* Handlebar grips */}
      <circle cx="60" cy="22" r="2" strokeWidth="2" />
      <circle cx="80" cy="22" r="2" strokeWidth="2" />
    </g>

    {/* Seat & Seatpost - höher, mehr Abstand zum Hinterrad */}
    <g stroke="currentColor" strokeWidth="3" opacity="0.8">
      {/* Seatpost - viel höher */}
      <line x1="200" y1="45" x2="200" y2="28" />
      {/* Saddle - höher positioniert */}
      <path d="M 185 28 L 215 28" strokeWidth="4" />
      {/* Saddle contour for more realistic look */}
      <path d="M 187 28 Q 200 26 213 28" strokeWidth="1.5" opacity="0.6" />
    </g>

    {/* Crankset */}
    <g stroke="currentColor" strokeWidth="2.5" opacity="0.7">
      <circle cx="150" cy="100" r="12" />
      <motion.g
        style={{ transformOrigin: "150px 100px" }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <line x1="150" y1="100" x2="165" y2="100" strokeWidth="3" />
        <line x1="150" y1="100" x2="135" y2="100" strokeWidth="3" />
        {/* Pedals */}
        <rect x="162" y="98" width="8" height="4" rx="1" />
        <rect x="133" y="98" width="8" height="4" rx="1" />
      </motion.g>
    </g>
  </svg>
);

// Gear/cog icon for bike mechanics theme
export const GearIcon: React.FC<IconProps> = ({ className = "w-12 h-12", size }) => (
  <svg
    className={size ? `w-${size} h-${size}` : className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// Chain link icon for cycling theme
export const ChainLinkIcon: React.FC<IconProps> = ({ className = "w-8 h-8", size }) => (
  <svg
    className={size ? `w-${size} h-${size}` : className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
    />
  </svg>
);

// RADhaus-inspired community building icon
export const CommunityHouseIcon: React.FC<IconProps> = ({ className = "w-14 h-14", size }) => (
  <svg
    className={size ? `w-${size} h-${size}` : className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.2"
  >
    {/* Modern building base/foundation */}
    <rect x="3" y="18" width="18" height="4" strokeWidth="1" opacity="0.6" />

    {/* Main building structure - modern rectangular form */}
    <rect x="4" y="8" width="16" height="14" strokeWidth="1.5" />

    {/* Flat modern roof with slight overhang */}
    <rect x="3.5" y="7" width="17" height="1.5" strokeWidth="1.2" fill="currentColor" opacity="0.3" />

    {/* Solar panels on roof (sustainable feature) */}
    <g opacity="0.7" strokeWidth="0.8">
      <rect x="5" y="7.2" width="3" height="1" />
      <rect x="8.5" y="7.2" width="3" height="1" />
      <rect x="12" y="7.2" width="3" height="1" />
      <rect x="15.5" y="7.2" width="3" height="1" />
    </g>

    {/* Large modern windows - characteristic of contemporary architecture */}
    <g opacity="0.7" strokeWidth="1">
      <rect x="6" y="10" width="4" height="5" />
      <rect x="14" y="10" width="4" height="5" />
      <rect x="6" y="16" width="4" height="4" />
      <rect x="14" y="16" width="4" height="4" />
    </g>

    {/* Entrance/door - modern glass door */}
    <rect x="10.5" y="16" width="3" height="6" strokeWidth="1.2" opacity="0.8" />

    {/* Community garden/green space indicator */}
    <g opacity="0.6" strokeWidth="0.8">
      <circle cx="2" cy="16" r="1.2" />
      <circle cx="22" cy="16" r="1.2" />
      <path d="M 1.5 16.5 Q 2 15 2.5 16.5" />
      <path d="M 21.5 16.5 Q 22 15 22.5 16.5" />
    </g>

    {/* RADhaus specific - bike rack indication */}
    <g opacity="0.5" strokeWidth="0.6">
      <rect x="1" y="21.5" width="22" height="0.5" />
      <circle cx="5" cy="21.2" r="0.3" />
      <circle cx="8" cy="21.2" r="0.3" />
      <circle cx="16" cy="21.2" r="0.3" />
      <circle cx="19" cy="21.2" r="0.3" />
    </g>
  </svg>
);

// Sustainability leaf icon for environmental theme
export const SustainabilityLeafIcon: React.FC<IconProps> = ({ className = "w-10 h-10", size }) => (
  <svg
    className={size ? `w-${size} h-${size}` : className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402A3.75 3.75 0 0021 10.5V6.75a1.5 1.5 0 00-1.5-1.5h-3.75A3.75 3.75 0 0013 8.597l-6.402 6.401a3.75 3.75 0 000 5.304z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l3 3M15 15l3 3" />
    {/* Leaf veins for natural appearance */}
    <g opacity="0.6" strokeWidth="0.8">
      <path d="M 8 12 Q 10 11 12 12" />
      <path d="M 10 14 Q 12 13 14 14" />
      <path d="M 12 16 Q 14 15 16 16" />
    </g>
  </svg>
);

// Community heart icon for social connection theme
export const CommunityHeartIcon: React.FC<IconProps> = ({ className = "w-12 h-12", size }) => (
  <svg
    className={size ? `w-${size} h-${size}` : className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="1.8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
    />
    {/* Small community dots inside heart */}
    <g opacity="0.7" strokeWidth="1.2">
      <circle cx="10" cy="10" r="0.8" fill="currentColor" />
      <circle cx="12" cy="11.5" r="0.8" fill="currentColor" />
      <circle cx="14" cy="10" r="0.8" fill="currentColor" />
    </g>
    {/* Connection lines between community dots */}
    <g opacity="0.5" strokeWidth="0.6">
      <line x1="10" y1="10" x2="12" y2="11.5" />
      <line x1="12" y1="11.5" x2="14" y2="10" />
      <line x1="10" y1="10" x2="14" y2="10" />
    </g>
  </svg>
);

// Bike workshop tools icon for repair cafe
export const BikeToolsIcon: React.FC<IconProps> = ({ className = "w-6 h-6", size }) => (
  <svg
    className={size ? `w-${size} h-${size}` : className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    strokeWidth="2"
  >
    {/* Einfacher Schraubenschlüssel */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
    />
  </svg>
);
