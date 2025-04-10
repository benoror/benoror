"use client"

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
          <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-center text-blue-100">About Me</h2>

          <div className="space-y-4">
            <p className="text-blue-200 leading-relaxed">
              I'm a Computer Science Engineer with a trajectory of building, working and growing Tech Startups, either
              bootstrapped, solo-maker and high-growth. I'm deeply passionate on making and launching software products,
              growing & leading engineering teams, and leveraging technology to tackle big real-world problems. I
              consider myself a technologist & pursuer of becoming a polymath in many areas I find interesting.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-100">Skills</h3>
              <ul className="space-y-2 text-blue-200">
                <li>Full-stack Development</li>
                <li>Systems Design</li>
                <li>Backend Architecture</li>
                <li>Frontend UI/UX</li>
                <li>DevOps Infrastructure</li>
                <li>Agile Methodologies</li>
                <li>Leadership</li>
                <li>Management</li>
                <li>Technical Strategy</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-blue-100">Interests</h3>
              <ul className="space-y-2 text-blue-200">
                <li>All things computers & technology</li>
                <li>Programming</li>
                <li>Software Engineering</li>
                <li>Books and Podcasts</li>
                <li>Startups</li>
                <li>Leadership</li>
                <li>Artificial Intelligence</li>
                <li>Crypto</li>
                <li>Science, Sci-Fi, History</li>
                <li>Economics & Politics</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
