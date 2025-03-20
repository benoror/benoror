import { ABOUT } from '@workspace/data/resume';

export default function About() {
  return (
    <section className="About flex flex-col items-center gap-5 text-justify print:my-4">
      {/* <h2 className="text-2xl font-bold print:hidden">About me</h2> */}
      <div className="flex flex-col items-center gap-4">
        <p className="text-md">{ABOUT.about_me}</p>
      </div>
    </section>
  );
}
