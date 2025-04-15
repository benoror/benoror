import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact/Contact';
import CoreSkills from '@/components/sections/CoreSkills/CoreSkills';
import Education from '@/components/sections/Education/Education';
import Experience from '@/components/sections/Experience/Experience';
import Intro from '@/components/sections/Intro';
import Skills from '@/components/sections/Skills/Skills';
import Languages from '@/components/sections/Languages/Languages';
// import Interests from '@/components/sections/Interests/Interests';
import PrintButton from '@/components/PrintButton';
import DownloadPDFButton from '@/components/DownlaodPDFButton';
import { GitHubIcon } from '@/components/icons/GitHubIcon';

export default function Page() {
  return (
    <main className="container mx-auto flex flex-col items-center gap-8 print:gap-4 px-6 py-16 print:py-2 md:p-8 max-w-5xl">
      <Intro />
      <Contact />
      <About />
      <CoreSkills />
      <Experience />
      {/* <Skills /> */}
      <Education />
      <Languages />
      {/* <Interests /> */}
      {/* <div className="print:mt-8">
        <Contact />
      </div> */}
      <div className="flex gap-2">
        <DownloadPDFButton />
        <PrintButton />
      </div>
      {/* ToDo: Extract to footer component */}
      <footer className="text-center text-xs mb-3 print:hidden flex flex-col gap-3 items-center">
        <a href="https://github.com/benoror/benoror-cv" target="_blank">
          Made with TypeScript, React, Next.js, Tailwind and shadcn/ui <GitHubIcon className="w-4 h-4 mx-1 mb-1 inline" />
        </a>
      </footer>
    </main>
  );
}
