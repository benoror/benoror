"use client"

import { HOME, SKILLS, INTERESTS, LINKS } from "@workspace/data/personal"
import { motion } from "framer-motion"
import { useAppTheme } from "@/hooks/use-app-theme"
import { pickBlueValue, pickThemeValue } from "@/lib/theme-styles"

export default function About() {
  const { isBlueDark, themeKind } = useAppTheme()
  const panelClass = pickThemeValue(themeKind, {
    outrun: "rounded-3xl border border-cyan-400/25 bg-slate-950/45 backdrop-blur-xl shadow-[0_24px_80px_rgba(2,8,23,0.65)] p-6 md:p-8",
    dark: "rounded-3xl border border-sky-700/35 bg-slate-950/55 backdrop-blur-xl shadow-[0_24px_80px_rgba(2,8,23,0.55)] p-6 md:p-8",
    light: "rounded-3xl border border-sky-200/80 bg-white/80 backdrop-blur-xl shadow-[0_24px_80px_rgba(15,23,42,0.10)] p-6 md:p-8",
  })
  const headingClass = pickBlueValue(isBlueDark, "text-sky-100", "text-sky-900")
  const bodyClass = pickBlueValue(isBlueDark, "text-sky-200", "text-sky-700")
  const linkHoverClass = pickBlueValue(isBlueDark, "hover:text-sky-300", "hover:text-sky-600")

  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className={`max-w-4xl mx-auto space-y-8 ${panelClass}`}
        >
          <h2 className={`text-3xl md:text-4xl font-bold tracking-tighter text-center ${headingClass}`}>About Me</h2>

          <div className="space-y-4">
            <p className={`leading-relaxed text-center text-justify ${bodyClass}`}>
              {HOME.about_me}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-center">
            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${headingClass}`}>Skills</h3>
              <ul className={`space-y-2 ${bodyClass}`}>
                {SKILLS.map((skill, index) => (
                  <li key={index}>
                    <a
                      href={`${LINKS.resume_url}#${skill.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${linkHoverClass} hover:underline underline-offset-4 transition-colors`}
                    >
                      {skill.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className={`text-xl font-semibold ${headingClass}`}>Interests</h3>
              <ul className={`space-y-2 ${bodyClass}`}>
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
