import { About, Experience, Hero, HomeMarquee } from "@/components/sections-top";
import {
  GoalsSection,
  ProjectsSection,
  ResearchSection,
  SkillsSection,
} from "@/components/sections-bottom";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeMarquee />
      <About />
      <Experience />
      <ProjectsSection />
      <ResearchSection />
      <GoalsSection />
      <SkillsSection />
    </>
  );
}
