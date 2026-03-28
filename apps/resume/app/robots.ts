import type { MetadataRoute } from "next"
import { LINKS } from "@workspace/data/personal"

export default function robots(): MetadataRoute.Robots {
  const resumeUrl = LINKS.resume.url.replace(/\/$/, "")

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/resume.md", "/Ben%20Orozco%20-%20Resume.pdf"],
    },
    sitemap: `${resumeUrl}/sitemap.xml`,
  }
}
