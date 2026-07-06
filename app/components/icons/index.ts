/**
 * Central export point for all icons
 * This file exports all icons from the modular icon files for easy importing
 *
 * Usage Examples:
 *
 * // Import einzelner Icons:
 * import { CheckIcon, LoadingSpinnerIcon } from '@/components/icons';
 *
 * // Import des gesamten Icon-Objects:
 * import { Icons } from '@/components/icons';
 * <Icons.Check className="w-6 h-6 text-green-600" />
 *
 * // Import des Default Icons Objects:
 * import Icons from '@/components/icons';
 * <Icons.User className="w-4 h-4" />
 */

// Export all icons from their respective modules
export * from "./ActionIcons";
export * from "./CalendarIcons";
export * from "./NavigationIcons";
export * from "./RADhausIcons";
export * from "./StatusIcons";
export * from "./UserIcons";

// Re-export types
export type { IconProps } from "./types";

// Import all icons for the consolidated Icons object
import {
  ArrowLeftIcon,
  ArrowUpIcon,
  ChevronDownIcon,
  CloseIcon,
  HamburgerIcon,
  MobileMenuIcon,
} from "./NavigationIcons";

import { LogoutIcon, UserIcon } from "./UserIcons";

import { CheckIcon, CheckIconFilled, ErrorIcon, LoadingSpinnerIcon, WarningIcon } from "./StatusIcons";

import { CalendarIcon, ClockIcon, DocumentIcon, EmailIcon, LocationIcon } from "./CalendarIcons";

import { CloseModalIcon, DeleteIcon, EditIcon, PlusIcon } from "./ActionIcons";

import {
  BikeToolsIcon,
  BikeWheelIcon,
  ChainLinkIcon,
  CommunityHeartIcon,
  CommunityHouseIcon,
  GearIcon,
  SustainabilityLeafIcon,
} from "./RADhausIcons";

// Consolidated Icons object for backward compatibility
export const Icons = {
  // Navigation
  Hamburger: HamburgerIcon,
  Close: CloseIcon,
  ChevronDown: ChevronDownIcon,
  ArrowUp: ArrowUpIcon,
  ArrowLeft: ArrowLeftIcon,
  MobileMenu: MobileMenuIcon,

  // User & Profile
  User: UserIcon,
  Logout: LogoutIcon,

  // Feedback & Status
  Check: CheckIcon,
  CheckFilled: CheckIconFilled,
  Error: ErrorIcon,
  LoadingSpinner: LoadingSpinnerIcon,
  Warning: WarningIcon,

  // Calendar & Events
  Calendar: CalendarIcon,
  Location: LocationIcon,
  Document: DocumentIcon,
  Email: EmailIcon,
  Clock: ClockIcon,

  // Actions
  Plus: PlusIcon,
  Edit: EditIcon,
  Delete: DeleteIcon,
  CloseModal: CloseModalIcon,

  // RADhaus & Community Theme
  BikeWheel: BikeWheelIcon,
  BikeTools: BikeToolsIcon,
  Gear: GearIcon,
  ChainLink: ChainLinkIcon,
  CommunityHouse: CommunityHouseIcon,
  SustainabilityLeaf: SustainabilityLeafIcon,
  CommunityHeart: CommunityHeartIcon,
};

export default Icons;
