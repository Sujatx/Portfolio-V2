import EntryGate from "../components/EntryGate";
import AboutRoom from "../components/AboutRoom";
import WorkGallery from "../components/WorkGallery";
import SkillsRoom from "../components/SkillsRoom";
import ContactRoom from "../components/ContactRoom";

export default function Home() {
  return (
    <div className="scroll-smooth">
      <EntryGate />
      <AboutRoom />
      <WorkGallery />
      <SkillsRoom />
      <ContactRoom />
    </div>
  );
}
