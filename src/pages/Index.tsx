import { useState, useEffect, useRef } from "react";
import { ContactModal } from "@/components/sections/shared";
import HeroSection from "@/components/sections/HeroSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CalculatorSection from "@/components/sections/CalculatorSection";
import ContactsSection from "@/components/sections/ContactsSection";

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background font-body">
      {modalOpen && <ContactModal onClose={() => setModalOpen(false)} />}

      <HeroSection
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        statsVisible={statsVisible}
        statsRef={statsRef}
        onOpenModal={() => setModalOpen(true)}
      />

      <ProjectsSection />

      <CalculatorSection />

      <ContactsSection onOpenModal={() => setModalOpen(true)} />
    </div>
  );
}
