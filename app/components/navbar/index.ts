// Navbar Subcomponents Export

// Desktop components
export { default as AuthSection } from "./desktop/AuthSection";
export { default as MainNavigation } from "./desktop/MainNavigation";
export { default as ProfileDropdown } from "./desktop/ProfileDropdown";

// Mobile components
export { default as MobileAuthSection } from "./mobile/MobileAuthSection";
export { default as MobileMenu } from "./mobile/MobileMenu";
export { default as MobileMenuButton } from "./mobile/MobileMenuButton";

// Shared components
export { default as NavbarLogo } from "./shared/NavbarLogo";
export {
    getMainNavigation, HERO_SECTION_ID, homeSections,
    scrollToSection
} from "./shared/navigationConstants";

