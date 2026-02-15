import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact/Contact';
import CoreSkills from '@/components/sections/CoreSkills/CoreSkills';
import Education from '@/components/sections/Education/Education';
import Experience from '@/components/sections/Experience/Experience';
import Intro from '@/components/sections/Intro';
import Skills from '@/components/sections/Skills/Skills';
import Languages from '@/components/sections/Languages/Languages';
// import Interests from '@/components/sections/Interests/Interests';
import { GitHubIcon } from '@/components/icons/GitHubIcon';

export default function Page() {
  return (
    <main className="container mx-auto flex flex-col items-center gap-8 print:gap-4 px-6 py-16 print:py-2 md:p-8 max-w-5xl text-sm">
      <Intro />
      <Contact />
      <About />
      <CoreSkills />
      <Experience />
      <Skills />
      <Education />
      <Languages />
      {/* <Interests /> */}
      <footer className="text-center text-xs mb-3 print:hidden">
        <a href="https://github.com/benoror/benoror" target="_blank" className="text-muted-foreground/50 hover:text-muted-foreground transition-colors">
            Made with TypeScript, React, Next.js, Tailwind and shadcn/ui <GitHubIcon className="w-3 h-3 mx-0.5 mb-0.5 inline" />
        </a>
      </footer>
    </main>
  );
}
