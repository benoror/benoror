"use client"

import { HOME, SKILLS, INTERESTS, LINKS } from "@workspace/data/personal"
import { motion } from "framer-motion"

export default function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center text-sky-100">About Me</h2>

          <div className="space-y-4">
            <p className="text-sky-200 leading-relaxed text-center text-justify">
              {HOME.about_me}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-sky-100">Skills</h3>
              <ul className="space-y-2 text-sky-200">
                {SKILLS.map((skill, index) => (
                  <li key={index}>
                    <a
                      href={`${LINKS.resume_url}#${skill.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sky-400 hover:underline underline-offset-4 transition-colors"
                    >
                      {skill.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-sky-100">Interests</h3>
              <ul className="space-y-2 text-sky-200">
                {INTERESTS.map((interest, index) => (
                  <li key={index}>{interest}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
