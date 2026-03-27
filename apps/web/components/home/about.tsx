"use client"

import { HOME, SKILLS, INTERESTS, LINKS } from "@workspace/data/personal"
import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useAppTheme } from "@/hooks/use-app-theme"
import { getClasses } from "./about.theme"

export default function About() {
  const { themeKind } = useAppTheme()
  const classes = getClasses(themeKind)

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`max-w-4xl mx-auto space-y-8 ${classes.panel}`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter text-center ${classes.heading}`}>About Me</h2>

          <div className="space-y-4">
            <p className={`leading-relaxed text-center text-justify ${classes.body}`}>
              {HOME.about_me}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${classes.heading}`}>Skills</h3>
              <ul className={`space-y-2 ${classes.body}`}>
                {SKILLS.map((skill, index) => (
                  <li key={index}>
                    <a
                      href={`${LINKS.resume_url}#${skill.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1 transition-colors hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 ${classes.linkHover} ${classes.linkFocus}`}
                    >
                      {skill.name}
                      <ExternalLink size={12} aria-hidden="true" className="opacity-70" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${classes.heading}`}>Interests</h3>
              <ul className={`space-y-2 ${classes.body}`}>
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
