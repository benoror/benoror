'use client'

import { useState } from 'react';

/* eslint-disable react/no-unescaped-entities */
export default function About() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <section className="About flex flex-col items-center gap-5 print:my-4">
      <h2 className="text-2xl font-bold print:hidden">About me</h2>
      <div className="flex flex-col items-center gap-4">
        <p className="text-md">
          I am a hands-on leader with a passion for crafting high-quality, maintainable, and scalable software using the best tools and practices. I thrive in remote, collaborative team environments and have successfully led multiple projects. I take full ownership of products, ensuring their success from start to finish, while actively participating and supporting my team.
        </p>
      </div>
    </section>
  );
}
