import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Contact } from '@/components/sections/Contact';
import { Navigation } from '@/components/Navigation';
import { Environment } from '@/components/3d/Environment';
import { BackgroundShapes } from '@/components/BackgroundShapes';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-x-hidden">
      {/* 3D Environment Background */}
      <Environment />
      
      {/* Interactive Background Shapes */}
      <BackgroundShapes />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Page Sections */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </div>
    </main>
  );
}
