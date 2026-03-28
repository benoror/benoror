import type { MetadataRoute } from "next"
import { LINKS } from "@workspace/data/personal"

export default function sitemap(): MetadataRoute.Sitemap {
  const resumeUrl = LINKS.resume.url.replace(/\/$/, "")
  const now = new Date()

  return [
    {
      url: `${resumeUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${resumeUrl}/resume.md`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${resumeUrl}/Ben%20Orozco%20-%20Resume.pdf`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ]
}
