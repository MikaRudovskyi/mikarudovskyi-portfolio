import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Languages from "@/components/sections/Languages";
import SkillGraph from "@/components/sections/SkillGraph";
import Telecom from "@/components/sections/Telecom";
import Architecture from "@/components/sections/Architecture";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";
import MatrixRain from "@/components/ui/MatrixRain";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <div className="relative">
          <MatrixRain />
          <About />
          <Experience />
          <Education />
          <Languages />
          <SkillGraph />
          <Telecom />
          <Architecture />
          <Projects />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}