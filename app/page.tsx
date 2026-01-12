"use client";
import { useEffect, useState } from "react";
import EntryGate from "../components/EntryGate";
import AboutRoom from "../components/AboutRoom";
import WorkGallery from "../components/WorkGallery";
import SkillsRoom from "../components/SkillsRoom";
import ContactRoom from "../components/ContactRoom";
import PillNav from "../components/PillNav";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact", "skills", "work", "about"]; // Check from bottom up
      const scrollPosition = window.scrollY + window.innerHeight / 2; // Trigger at middle of viewport

      // Special case for top of page (EntryGate)
      if (window.scrollY < window.innerHeight * 0.5) {
        setActiveSection("");
        return;
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          // Use getBoundingClientRect + window.scrollY for absolute position relative to document
          // offsetTop can be 0 if the parent is positioned, which breaks logic for 'work'
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;

          if (scrollPosition >= elementTop) {
            setActiveSection(`#${section}`);
            return;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="scroll-smooth">
      {/* Fixed PillNav - stays at top-right across all sections */}
      <div className="fixed top-4 right-4 z-50">
        <PillNav
          items={navItems}
          activeHref={activeSection}
          baseColor="rgba(255, 255, 255, 0.1)"
          pillColor="rgba(0, 0, 0, 0.6)"
          hoveredPillTextColor="#a855f7"
          pillTextColor="rgba(255, 255, 255, 0.7)"
        />
      </div>

      <EntryGate />
      <AboutRoom />
      <WorkGallery />
      <SkillsRoom />
      <ContactRoom />
    </div>
  );
}
