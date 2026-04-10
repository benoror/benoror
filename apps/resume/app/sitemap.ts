import type { MetadataRoute } from "next"
import { LINKS } from "@workspace/data/personal"
import { getCoverLetterSlugs, getResumeSlugs } from "@workspace/data/resume_variants"

export default function sitemap(): MetadataRoute.Sitemap {
  const resumeUrl = LINKS.resume.url.replace(/\/$/, "")
  const now = new Date()
  const variantEntries = getResumeSlugs().flatMap((slug) => {
    const entries: MetadataRoute.Sitemap = [
      {
        url: `${resumeUrl}/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
      },
      {
        url: `${resumeUrl}/${slug}/resume.md`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
      },
    ]

    return entries
  })

  const coverLetterEntries = getCoverLetterSlugs().map((slug) => ({
    url: `${resumeUrl}/${slug}/cover-letter`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    {
      url: `${resumeUrl}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${resumeUrl}/cover-letter`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
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
    ...variantEntries,
    ...coverLetterEntries,
  ]
}
