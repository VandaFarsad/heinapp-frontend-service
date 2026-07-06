// app/about/page.tsx
import ScrollToTopButton from "../components/ScrollToTopButton";
import { AboutHeroSection, CommunitySection, DistrictSection, SustainabilitySection } from "./components";

export default function AboutPage() {
  return (
    <>
      <AboutHeroSection />

      <CommunitySection />
      <SustainabilitySection />
      <DistrictSection />
      <ScrollToTopButton />
    </>
  );
}
