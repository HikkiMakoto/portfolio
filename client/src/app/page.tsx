import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import ParticlesBackground from "@/components/ParticlesBackground";

export default function Home() {
  return (
    <>
      {/* Animated particles background */}
      <ParticlesBackground />
      
      {/* Main content */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
