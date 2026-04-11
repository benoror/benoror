import type { MetadataRoute } from "next"
import { LINKS } from "@workspace/data/shared/profile"

export default function sitemap(): MetadataRoute.Sitemap {
  const websiteUrl = LINKS.website.url.replace(/\/$/, "")
  const now = new Date()

  return [
    {
      url: `${websiteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${websiteUrl}/feed`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${websiteUrl}/feed.rss`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${websiteUrl}/feed.xml`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${websiteUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${websiteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ]
}
