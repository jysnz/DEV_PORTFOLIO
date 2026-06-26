import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { ClientParticles } from "@/components/3d/ClientParticles";

export default function Home() {
  return (
    <>
      <ClientParticles />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <Projects />
        <Achievements />
        <About />
        <Contact />
      </main>
    </>
  );
}
