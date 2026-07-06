import ScrollToTopButton from "./components/ScrollToTopButton";
import { BikeHouseSection, ContactSection, HeroSection } from "./components/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BikeHouseSection />
      <ContactSection />
      <ScrollToTopButton />
    </>
  );
}
