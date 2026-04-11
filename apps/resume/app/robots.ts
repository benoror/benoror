import type { MetadataRoute } from "next"
import { LINKS } from "@workspace/data/shared/profile"
import { getCoverLetterSlugs, getResumeSlugs } from "@workspace/data/resume/variants"

export default function robots(): MetadataRoute.Robots {
  const resumeUrl = LINKS.resume.url.replace(/\/$/, "")
  const allowedVariantPaths = getResumeSlugs().flatMap((slug) => [`/${slug}`, `/${slug}/resume.md`])
  const allowedCoverLetterPaths = getCoverLetterSlugs().map((slug) => `/${slug}/cover-letter`)

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/cover-letter", "/resume.md", "/Ben%20Orozco%20-%20Resume.pdf", ...allowedVariantPaths, ...allowedCoverLetterPaths],
    },
    sitemap: `${resumeUrl}/sitemap.xml`,
  }
}
