import type { MetadataRoute } from "next"
import { LINKS } from "@workspace/data/shared/profile"

export default function robots(): MetadataRoute.Robots {
  const websiteUrl = LINKS.website.url.replace(/\/$/, "")

  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/feed", "/feed.rss", "/feed.xml", "/portfolio", "/blog"],
    },
    sitemap: `${websiteUrl}/sitemap.xml`,
  }
}
