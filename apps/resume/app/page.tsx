import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact/Contact';
import CoreSkills from '@/components/sections/CoreSkills/CoreSkills';
import Education from '@/components/sections/Education/Education';
import Experience from '@/components/sections/Experience/Experience';
import Intro from '@/components/sections/Intro';
import Skills from '@/components/sections/Skills/Skills';
import Languages from '@/components/sections/Languages/Languages';
import Interests from '@/components/sections/Interests/Interests';
import PrintButton from '@/components/PrintButton';
import DownloadPDFButton from '@/components/DownlaodPDFButton';
import { GitHubIcon } from '@/components/icons/GitHubIcon';

export default function Page() {
  return (
    <main className="container mx-auto flex flex-col items-center gap-10 print:gap-4 px-6 py-16 print:py-0 md:p-24 max-w-5xl">
      <Intro />
      <Contact />
      <CoreSkills />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Languages />
      <Interests />
      <div className="print:mt-8">
        <Contact />
      </div>
      <div className="flex gap-2">
        <DownloadPDFButton />
        <PrintButton />
      </div>
      <footer className="text-center text-sm mb-3 print:hidden flex flex-col gap-3 items-center">
        <div className="flex items-center gap-1">
          Made with ❤️ using TypeScript, React, Next.js, Tailwind CSS and shadcn/ui
          <a href="https://github.com/jkubacki/cv" target="_blank"><GitHubIcon className="w-4 h-4 mx-1" /></a>
        </div>
        <div className="flex flex-col items-center gap-1 lg:flex-row">
          Check out my demo app at
          <div className="underline">
            <a href="https://demo.jakubkubacki.com" target="_blank">
              https://demo.jakubkubacki.com
            </a>
          </div>
          <a href="https://github.com/jkubacki/jobs-app" target="_blank"><GitHubIcon className="w-4 h-4 mx-1" /></a>
        </div>
      </footer>
    </main>
  );
}
